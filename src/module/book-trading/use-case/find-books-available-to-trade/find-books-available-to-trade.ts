import { Inject, Injectable } from '@nestjs/common';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { UnexpectedError } from '~shared/core/app.error';
import { left, right } from '~shared/core/either';
import { UseCase } from '~shared/core/use-case';
import { FindBooksAvailableToTradeResponse } from './find-books-available-to-trade.response';

@Injectable()
export class FindBooksAvailableToTrade
  implements UseCase<void, FindBooksAvailableToTradeResponse>
{
  constructor(
    @Inject(BOOK_TRADING_REPO) private readonly repo: BookTradingRepo,
    private readonly mapper: BooksTradingMapper,
  ) {}
  async execute(): Promise<FindBooksAvailableToTradeResponse> {
    try {
      const books = await this.repo.findBooksAvailableToTrade();

      return right(books.map((book) => this.mapper.mapBooksToTradeToDto(book)));
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
