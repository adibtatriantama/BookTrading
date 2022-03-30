import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { Either } from '~shared/core/either';
import { FindBooksAvailableToTradeError } from './find-books-available-to-trade.error';

export type FindBooksAvailableToTradeResponse = Either<
  FindBooksAvailableToTradeError,
  BooksToTradeDto[]
>;
