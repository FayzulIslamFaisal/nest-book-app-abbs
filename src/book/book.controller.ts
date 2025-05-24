import { BookService } from './book.service';
import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}
    @Get("/all-books")
    async getAllBooks(@Query() query: PaginationQueryDto){
        try {
            const { page = 1, limit = 5, search = '' } = query;
            const books = await this.bookService.getAllBooks(page, limit, search);
            return {
                statusCode: 200, 
                success: true,
                message: "Showing All Book Data...",
                results: books,
            }            
        } catch (error) {
            console.error("Error in getAllBooks:", error);
            throw error;
        }
    }

    @Post("/create-book")
    async createBook(@Body() dto: CreateBookDto){
        try {
            const newBook = await this.bookService.createBook(dto);
            return {
                statusCode: 201, 
                success: true,
                message: "Create a new Book Successfully...",
                results: newBook,
            }
        } catch (error) {
            console.error("Error in create Book", error)
            throw error
        }
    }

    @Put("/update-book/:id")
    async updateBook(@Param("id") bookId: string,  @Body() dto: UpdateBookDto){
        try {
            const book = await this.bookService.updateBook(bookId, dto);
            return {
                statusCode: 200, 
                success: true,
                message: " Book Upadated Successfully...",
                results: book,
            }
        } catch (error) {
            console.error("Error in Updated Book", error)
            throw error
        }
    }

    @Get("/:id")
    async getBookById(@Param("id") bookId: string){
        try {
            const book = await this.bookService.getBookById(bookId);
            return {
                statusCode: 200, 
                success: true,
                message: " Book Fetch Successfully...",
                results: book,
            }
        } catch (error) {
            console.error("Error in get Book By Id ", error)
            throw error
        }
    }

    @Delete("/delete-book/:id")
    async deleteBook(@Param("id") bookId: string,  ){
        try {
            const book = await this.bookService.deleteBook(bookId);
            return {
                statusCode: 200, 
                success: true,
                message: " Book Delete Successfully...",
                results: book,
            }
        } catch (error) {
            console.error("Error in Delete Book", error)
            throw error
        }
    }
}
