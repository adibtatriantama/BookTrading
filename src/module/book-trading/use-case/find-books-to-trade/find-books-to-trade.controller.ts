import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { UnexpectedError } from '~shared/core/app.error';
import {
  FindBooksToTrade,
  FindBooksToTradeRequest,
} from './find-books-to-trade';

@Controller('api/books-to-trade')
export class FindBooksToTradeController {
  constructor(private readonly useCase: FindBooksToTrade) {}

  @Get()
  async list(
    @Query() query: FindBooksToTradeRequest,
  ): Promise<BooksToTradeDto[]> {
    const response = await this.useCase.execute(query);

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case UnexpectedError:
          throw new HttpException('Internal Server Error', 500);
        default:
          throw new HttpException('Internal Server Error', 500);
      }
    } else {
      return response.value;
    }
  }
}
