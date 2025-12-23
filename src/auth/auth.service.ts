import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user by checking if the username exists and the password matches.
   * Compares the provided password with the hashed password in the database.
   * @param username The username provided.
   * @param pass The password provided.
   * @returns The user object without the password if validation succeeds, null otherwise.
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Logs in a user by generating a JWT token.
   * @param user The user object (typically returned from validateUser).
   * @returns An object containing the access token.
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registers a new user.
   * @param createUserDto The user creation data.
   * @returns The created user (without password typically, handled by transformation or specific response DTO).
   */
  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }
}
