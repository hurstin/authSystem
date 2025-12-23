import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Validates the JWT payload.
   * Passport automatically verifies the signature and expiration before calling this.
   * @param payload The decoded JWT payload.
   * @returns The user object attached to the request (req.user).
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
