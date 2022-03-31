import { Inject, Injectable } from '@nestjs/common';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { Book, BookProps } from '~book-trading/value-object/book';
import { UnexpectedError } from '~shared/core/app.error';
import { left, right } from '~shared/core/either';
import { UseCase } from '~shared/core/use-case';
import { BooksIsEmptyError } from './create-books-to-trade.error';
import { CreateBooksToTradeResponse } from './create-books-to-trade.response';

export type CreateBooksToTradeRequest = {
  traderId: string;
  books: BookProps[];
};

@Injectable()
export class CreateBooksToTrade
  implements UseCase<CreateBooksToTradeRequest, CreateBooksToTradeResponse>
{
  constructor(
    @Inject(BOOK_TRADING_REPO) private readonly repo: BookTradingRepo,
    private readonly mapper: BooksTradingMapper,
  ) {}
  async execute(
    request: CreateBooksToTradeRequest,
  ): Promise<CreateBooksToTradeResponse> {
    try {
      let books: Book[] = [];

      if (request.books.length === 0) {
        return left(new BooksIsEmptyError());
      }

      books = request.books.map((book) => Book.create(book));

      const entity = BooksToTrade.create({
        traderId: request.traderId,
        books,
      });

      const savedEntity = await this.repo.createBooksToTrade(entity);

      return right(this.mapper.mapBooksToTradeToDto(savedEntity));
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
