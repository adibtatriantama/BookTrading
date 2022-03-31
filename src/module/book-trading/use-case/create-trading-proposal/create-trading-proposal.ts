import { Inject } from '@nestjs/common';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { TradingProposal } from '~book-trading/entity/trading-proposal';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { Book, BookProps } from '~book-trading/value-object/book';
import { UnexpectedError } from '~shared/core/app.error';
import { left, right } from '~shared/core/either';
import { UseCase } from '~shared/core/use-case';
import {
  BooksIsEmptyError,
  BooksToTradeIsNoLongerAcceptingProposalError,
  BooksToTradeIsNotExistError,
  TraderIsNotExistError,
} from './create-trading-proposal.error';
import { CreateTradingProposalResponse } from './create-trading-proposal.response';

export type CreateTradingProposalRequest = {
  traderId: string;
  booksToTradeId: string;
  books: BookProps[];
};

export class CreateTradingProposal
  implements
    UseCase<CreateTradingProposalRequest, CreateTradingProposalResponse>
{
  constructor(
    @Inject(BOOK_TRADING_REPO) private readonly repo: BookTradingRepo,
    private readonly mapper: BooksTradingMapper,
  ) {}

  async execute(
    request: CreateTradingProposalRequest,
  ): Promise<CreateTradingProposalResponse> {
    if (request.books.length === 0) {
      return left(new BooksIsEmptyError());
    }

    try {
      await this.repo.findTraderById(request.traderId);
    } catch (error) {
      return left(new TraderIsNotExistError());
    }

    let booksToTrade: BooksToTrade;
    try {
      booksToTrade = await this.repo.findBooksToTradeById(
        request.booksToTradeId,
      );
    } catch (error) {
      return left(new BooksToTradeIsNotExistError());
    }

    if (booksToTrade.status !== 'open') {
      return left(new BooksToTradeIsNoLongerAcceptingProposalError());
    }

    const entity = TradingProposal.create({
      traderId: request.traderId,
      booksToTradeId: request.booksToTradeId,
      books: request.books.map((book) => Book.create(book)),
    });

    let savedEntity: TradingProposal;
    try {
      savedEntity = await this.repo.saveTradingProposal(entity);
    } catch (error) {
      return left(new UnexpectedError(error));
    }

    return right(this.mapper.mapProposalToDto(savedEntity));
  }
}
