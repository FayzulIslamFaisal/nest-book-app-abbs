import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal:true,
  }), PrismaModule, BookModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
