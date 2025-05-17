import { BookService } from './book.service';
import { Controller, Get, HttpException, InternalServerErrorException } from '@nestjs/common';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}
    @Get("/all-books")
    async getAllBooks(){
        try {
            const books = await this.bookService.getAllBooks();
            return {
                statusCode: 200, 
                success: true,
                message: "Showing All Book Data...",
                results: books,
            }
        } catch (error) {
            console.error("Error in getAllBooks:", error);
            throw new InternalServerErrorException("Something went wrong while fetching books")
        }
    }
}
