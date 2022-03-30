import { Controller, Inject, Get, HttpException } from '@nestjs/common';
import { FIND_BOOKS_AVAILABLE_TO_TRADE } from '~book-trading/constant';
import { UnexpectedError } from '~shared/core/app.error';
import { FindBooksAvailableToTrade } from './find-books-available-to-trade';

@Controller('api/books-to-trade')
export class FindBooksAvailableToTradeController {
  constructor(
    @Inject(FIND_BOOKS_AVAILABLE_TO_TRADE)
    private readonly useCase: FindBooksAvailableToTrade,
  ) {}

  @Get()
  async list() {
    const response = await this.useCase.execute();

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
