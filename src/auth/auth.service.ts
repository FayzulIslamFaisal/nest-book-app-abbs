import { LogInDto } from './dto/login.dto';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}

    // async validateUser(email: string, password: string) {
    //     const user = await this.prismaService.user.findUnique({
    //         where: { email },
    //     });

    //     if (user && user.password === password) {
    //         return user;
    //     }
    //     return null;
    // }

    async signUp(signUpDto: SignUpDto) {
        const { email, password, name } = signUpDto;
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            throw new NotFoundException('Error hashing password');
        }

        const user = await this.prismaService.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        const token = this.jwtService.sign(
            { sub: user.id, email: user.email }
        );
        const { password: _, ...userWithoutPassword } = user;
        return { ...userWithoutPassword, token };
    }

    async logIn(logInDto: LogInDto) {
        const { email, password } = logInDto;
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid User credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid User credentials');
        }

        const token = this.jwtService.sign(
            { sub: user.id, email: user.email }
        );
        const { password: _, ...userWithoutPassword } = user;
        return { ...userWithoutPassword, token };
    }
}
