import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that triggers the LocalStrategy.
 * Used for login endpoints to validate username/password.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
