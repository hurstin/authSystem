import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that triggers the JwtStrategy.
 * Used to protect routes requiring a valid JWT token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
