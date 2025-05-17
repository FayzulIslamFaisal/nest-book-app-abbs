import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
