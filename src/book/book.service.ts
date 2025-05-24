import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService){}
    async getAllBooks(page: number, limit: number, search: string) {
        const skip = (page - 1) * limit;

        const [books, total] = await this.prisma.$transaction([
            this.prisma.book.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            skip,
            take: limit,
            select: {
                id: true,
                title: true,
                descriptin: true,
                category: true,
                },
            }),

            this.prisma.book.count({
            where: {
                title: {
                contains: search,
                mode: 'insensitive',
                },
            },
            }),
        ]);

        if (!books.length) {
            throw new NotFoundException('No books found');
        }

        return {
            results: books,
            pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            },
        };
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

    async updateBook(bookId: string, dto: UpdateBookDto) {
        const { title, descriptin, author } = dto;
        const existingBook = await this.prisma.book.findFirst({
            where: { id: bookId }
        });

        console.log("existingBook==>",existingBook);
        

        if (!existingBook) {
            throw new BadRequestException("Book ID not found.");
        }
        const updatedBook = await this.prisma.book.update({
            where: { id: bookId },
            data: {title, descriptin, author},
        });

        return updatedBook;
    }
    async getBookById(bookId: string) {
        const book = await this.prisma.book.findUnique({
            where: { id: bookId },
        });

        if (!book) {
            throw new BadRequestException("Book not found");
        }

        return book;
    }

    async deleteBook(bookId: string) {
        const existingBook = await this.prisma.book.findUnique({
            where: { id: bookId },
        });

        if (!existingBook) {
            throw new BadRequestException("Book not found");
        }

        const deletedBook = await this.prisma.book.delete({
            where: { id: bookId },
        });

        return deletedBook;
    }

}
