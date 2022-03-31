import { UnexpectedError } from '~shared/core/app.error';
import { UseCaseError } from '~shared/core/use-case.error';

export type CreateTradingProposalError =
  | TraderIsNotExistError
  | BooksToTradeIsNotExistError
  | BooksToTradeIsNoLongerAcceptingProposalError
  | BooksIsEmptyError
  | UnexpectedError;

export class TraderIsNotExistError extends UseCaseError {
  constructor() {
    super('Trader is not exist');
  }
}

export class BooksToTradeIsNotExistError extends UseCaseError {
  constructor() {
    super('BooksToTrade is not exist');
  }
}

export class BooksToTradeIsNoLongerAcceptingProposalError extends UseCaseError {
  constructor() {
    super('BooksToTrade is no longer accepting proposal');
  }
}

export class BooksIsEmptyError extends UseCaseError {
  constructor() {
    super(`Books shouldn't be empty`);
  }
}
