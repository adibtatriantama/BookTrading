import { TradingProposalStatus } from '~book-trading/entity/trading-proposal';
import { IsoDateString } from '~shared/dto/iso-date-string';
import { BookDto } from './book.dto';
import { TraderDto } from './trader.dto';

export type TradingProposalDto = {
  id: string;
  trader?: TraderDto;
  booksToTradeId: string;
  books: BookDto[];
  status: TradingProposalStatus;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
};
