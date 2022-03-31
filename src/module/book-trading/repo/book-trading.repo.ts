import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { Trader } from '~book-trading/entity/trader';
import { TradingProposal } from '~book-trading/entity/trading-proposal';

export interface BookTradingRepo {
  findBooksToTradeById(booksToTradeId: string): Promise<BooksToTrade>;
  findBooksAvailableToTrade(): Promise<BooksToTrade[]>;
  createBooksToTrade(entity: BooksToTrade): Promise<BooksToTrade>;

  findTraderById(traderId: string): Promise<Trader>;
  saveTrader(trader: Trader): Promise<Trader>;

  saveTradingProposal(
    tradingProposal: TradingProposal,
  ): Promise<TradingProposal>;
}
