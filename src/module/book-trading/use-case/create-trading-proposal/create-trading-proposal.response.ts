import { TradingProposalDto } from '~book-trading/dto/trading-proposal-dto';
import { Either } from '~shared/core/either';
import { CreateTradingProposalError } from './create-trading-proposal.error';

export type CreateTradingProposalResponse = Either<
  CreateTradingProposalError,
  TradingProposalDto
>;
