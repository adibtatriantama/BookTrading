import { UnexpectedError } from '~shared/core/app.error';
import { UseCaseError } from '~shared/core/use-case.error';

export type CreateBooksToTradeError = BooksIsEmptyError | UnexpectedError;

export class BooksIsEmptyError extends UseCaseError {
  constructor() {
    super(`Books shouldn't be empty`);
  }
}
