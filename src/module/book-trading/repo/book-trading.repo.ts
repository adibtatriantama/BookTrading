import { BooksToTrade } from '~book-trading/entity/books-to-trade';

export interface BookTradingRepo {
  findBooksAvailableToTrade(): Promise<BooksToTrade[]>;
}
