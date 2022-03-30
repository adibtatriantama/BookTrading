import { BooksToTradeStatus } from '~book-trading/entity/books-to-trade';
import { IsoDateString } from '~shared/dto/iso-date-string';
import { BookDto } from './book.dto';
import { TraderDto } from './trader.dto';
import { TradingProposalDto } from './trading-proposal-dto';

export type BooksToTradeDto = {
  id: string;
  trader?: TraderDto;
  books: BookDto[];
  proposals: TradingProposalDto[];
  status: BooksToTradeStatus;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
};
