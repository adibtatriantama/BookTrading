import {
  BooksToTrade,
  BooksToTradeStatus,
} from '~book-trading/entity/books-to-trade';
import { Trader } from '~book-trading/entity/trader';
import {
  TradingProposal,
  TradingProposalStatus,
} from '~book-trading/entity/trading-proposal';
import { PaginationProps } from '~shared/repo/pagination';

export type FindBooksToTradeProps = {
  traderId?: string;
  status?: BooksToTradeStatus;
} & PaginationProps;

export type FindTradingPropasalProps = {
  traderId?: string;
  status?: TradingProposalStatus;
} & PaginationProps;

export interface BookTradingRepo {
  findBooksToTradeById(booksToTradeId: string): Promise<BooksToTrade>;
  findBooksToTrade(props?: FindBooksToTradeProps): Promise<BooksToTrade[]>;
  createBooksToTrade(entity: BooksToTrade): Promise<BooksToTrade>;

  findTraderById(traderId: string): Promise<Trader>;
  saveTrader(trader: Trader): Promise<Trader>;

  saveTradingProposal(
    tradingProposal: TradingProposal,
  ): Promise<TradingProposal>;
  findTradingProposal(
    props?: FindTradingPropasalProps,
  ): Promise<TradingProposal[]>;
}
