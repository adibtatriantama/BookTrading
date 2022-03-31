import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { Trader } from '~book-trading/entity/trader';

export interface BookTradingRepo {
  findBooksAvailableToTrade(): Promise<BooksToTrade[]>;
  createBooksToTrade(entity: BooksToTrade): Promise<BooksToTrade>;

  findTraderById(traderId: string): Promise<Trader>;
  saveTrader(trader: Trader): Promise<Trader>;
}
