import { UseCaseError } from './use-case.error';

export class UnexpectedError extends UseCaseError {
  constructor(err: any) {
    super(`An unexpected error occurred.`);
  }
}
