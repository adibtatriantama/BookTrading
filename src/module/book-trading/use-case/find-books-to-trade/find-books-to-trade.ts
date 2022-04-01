import { Inject, Injectable } from '@nestjs/common';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import {
  BookTradingRepo,
  FindBooksToTradeProps,
} from '~book-trading/repo/book-trading.repo';
import { UnexpectedError } from '~shared/core/app.error';
import { left, right } from '~shared/core/either';
import { UseCase } from '~shared/core/use-case';
import { FindBooksToTradeResponse } from './find-books-to-trade.response';

export type FindBooksToTradeRequest = FindBooksToTradeProps;

@Injectable()
export class FindBooksToTrade
  implements UseCase<FindBooksToTradeRequest, FindBooksToTradeResponse>
{
  constructor(
    @Inject(BOOK_TRADING_REPO) private readonly repo: BookTradingRepo,
    private readonly mapper: BooksTradingMapper,
  ) {}
  async execute(
    request: FindBooksToTradeRequest,
  ): Promise<FindBooksToTradeResponse> {
    let books: BooksToTrade[];

    try {
      books = await this.repo.findBooksToTrade(request);
    } catch (error) {
      return left(new UnexpectedError(error));
    }

    return right(books.map((book) => this.mapper.mapBooksToTradeToDto(book)));
  }
}
