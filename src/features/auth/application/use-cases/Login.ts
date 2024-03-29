import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import {v4} from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersRepo } from '../../../sa/sa-users/infrastructure/users.repo';
import { AuthDto } from '../../dto/auth.dto';
import { DevicesRepo } from '../../../devices/infrastructure/devices.repo';
import { Device } from '../../../devices/domain/entitites/device';
import { ConfigService } from '@nestjs/config';

export class LoginCommand {
  constructor(
    public dto: AuthDto,
    public ip: string,
    public deviceName: string,
  ) {}
}

@CommandHandler(LoginCommand)
export class LoginUseCase {
  constructor(
    private usersRepo: UsersRepo,
    private devicesRepo: DevicesRepo,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

    async execute(command: LoginCommand){
      const auth = await this.usersRepo.findByLoginOrEmail(command.dto.loginOrEmail)

      if (!auth || auth.banInfo.isBanned === true){
        throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED);
      }
      const candidateHash = await bcrypt.hash(command.dto.password, auth.passwordSalt.toString())
      if (auth.passwordHash.toString() === candidateHash) {
  
        const deviceId = v4()
        const device: Device = {
          ip: command.ip,
          title: command.deviceName, 
          deviceId: deviceId,
          issuedAt: new Date().getTime(),
          expiresAt: new Date().getTime() + Number(this.configService.get('REFRESH_PERIOD'))*1000,
          userId: auth.id!.toString(),
        }
        const payloadAccess = {userId: auth?.id?.toString() ? auth?.id?.toString() : '', userLogin: auth.login, deviceId: device.deviceId, issuedAt: device.issuedAt}
        const payloadRefresh = {userId: auth?.id?.toString() ? auth?.id?.toString() : '', userLogin: auth.login, deviceId: device.deviceId, issuedAt: device.issuedAt}
        const accessToken = this.jwtService.sign(payloadAccess, {expiresIn: `${Number(this.configService.get('ACCESS_PERIOD'))}s`})
        const refreshToken = this.jwtService.sign(payloadRefresh, {expiresIn: `${Number(this.configService.get('REFRESH_PERIOD'))}s`})
        await this.devicesRepo.createDevice(device)
        return {
          accessToken,
          refreshToken
        }
      } 
      else {
        throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED);
      }
    }
}