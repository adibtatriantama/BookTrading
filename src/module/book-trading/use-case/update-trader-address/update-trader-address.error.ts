import { UnexpectedError } from '~shared/core/app.error';
import { UseCaseError } from '~shared/core/use-case.error';

export type UpdateTraderAddressError = TraderIsNotExist | UnexpectedError;

export class TraderIsNotExist extends UseCaseError {
  constructor() {
    super('Trader is not exist');
  }
}
