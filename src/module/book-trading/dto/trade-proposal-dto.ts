import { TradeProposalStatus } from '~book-trading/entity/trade-proposal';
import { IsoDateString } from '~shared/dto/iso-date-string';
import { BookDto } from './book.dto';
import { TraderDto } from './trader.dto';

export type TradeProposalDto = {
  id: string;
  trader?: TraderDto;
  booksToTradeId: string;
  books: BookDto[];
  status: TradeProposalStatus;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
};
