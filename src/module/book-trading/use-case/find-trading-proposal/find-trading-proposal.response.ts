import { TradingProposalDto } from '~book-trading/dto/trading-proposal-dto';
import { Either } from '~shared/core/either';
import { FindTradingProposalError } from './find-trading-proposal.error';

export type FindTradingProposalResponse = Either<
  FindTradingProposalError,
  TradingProposalDto[]
>;
