import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { Either } from '~shared/core/either';
import { FindBooksToTradeError } from './find-books-to-trade.error';

export type FindBooksToTradeResponse = Either<
  FindBooksToTradeError,
  BooksToTradeDto[]
>;
