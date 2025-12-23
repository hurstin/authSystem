import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: {
        user: Omit<User, 'password'>;
    }): {
        access_token: string;
    };
    signup(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        isActive: boolean;
    }>;
    getProfile(req: {
        user: Omit<User, 'password'>;
    }): Omit<User, "password">;
}
