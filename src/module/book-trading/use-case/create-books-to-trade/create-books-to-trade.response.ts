import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { Either } from '~shared/core/either';
import { CreateBooksToTradeError } from './create-books-to-trade.error';

export type CreateBooksToTradeResponse = Either<
  CreateBooksToTradeError,
  BooksToTradeDto
>;
