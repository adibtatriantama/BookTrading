import { TradeProposalDto } from '~book-trading/dto/trade-proposal-dto';
import { Either } from '~shared/core/either';
import { CreateTradeProposalError } from './create-trade-proposal.error';

export type CreateTradeProposalResponse = Either<
  CreateTradeProposalError,
  TradeProposalDto
>;
