import { BookService } from './book.service';
import { Body, Controller, Get, HttpException, InternalServerErrorException, Post } from '@nestjs/common';
import { CreateBookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}
    @Get("/all-books")
    async getAllBooks(){
        try {
            const books = await this.bookService.getAllBooks();
            console.log("books--->", books);
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
}
