import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        try {
            const user = await this.authService.signUp(signUpDto);
            return {
                statusCode: 201,
                success: true,
                message: 'User created successfully',
                results: user,
            };
        } catch (error) {
            console.error('Error during sign up:', error);
            throw error;
        }
    }

    @Get('/login')
    async login(@Body() logInDto: LogInDto) {
        try {
            const user = await this.authService.logIn(logInDto);
            return {
                statusCode: 200,
                success: true,
                message: 'User logged in successfully',
                results: user,
            };
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

}

 

