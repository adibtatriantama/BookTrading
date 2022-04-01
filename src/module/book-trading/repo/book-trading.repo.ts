import {
  BooksToTrade,
  BooksToTradeStatus,
} from '~book-trading/entity/books-to-trade';
import { Trader } from '~book-trading/entity/trader';
import {
  TradeProposal,
  TradeProposalStatus,
} from '~book-trading/entity/trade-proposal';
import { PaginationProps } from '~shared/repo/pagination';

export type FindBooksToTradeProps = {
  traderId?: string;
  status?: BooksToTradeStatus;
} & PaginationProps;

export type FindTradePropasalProps = {
  traderId?: string;
  status?: TradeProposalStatus;
} & PaginationProps;

export interface BookTradingRepo {
  findBooksToTradeById(booksToTradeId: string): Promise<BooksToTrade>;
  findBooksToTrade(props?: FindBooksToTradeProps): Promise<BooksToTrade[]>;
  createBooksToTrade(entity: BooksToTrade): Promise<BooksToTrade>;

  findTraderById(traderId: string): Promise<Trader>;
  saveTrader(trader: Trader): Promise<Trader>;

  saveTradeProposal(tradeProposal: TradeProposal): Promise<TradeProposal>;
  findTradeProposal(props?: FindTradePropasalProps): Promise<TradeProposal[]>;
}
