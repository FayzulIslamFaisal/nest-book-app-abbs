import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService){}
    async getAllBooks(){
        const book = await this.prisma.book.findMany({
            select: {
                id:true,
                title:true,
                descriptin:true,
                category:true
            }
        });
        
        if (!book || book.length===0) {
            throw new NotFoundException("Book Data Not Found")
        }
        return book;
    }

    async createBook(dto: CreateBookDto) {
        const {descriptin,title,author} = dto;
        const existBook = await this.prisma.book.findFirst({
            where: {
            title,
            descriptin,
            },
        });

        if (existBook) {
            throw new BadRequestException("This book already exists");
        }

        const book = await this.prisma.book.create({
            data:{
                title,
                descriptin,
                author
            }
        });
        
        return book
    }
}
