import { TradeProposalDto } from '~book-trading/dto/trade-proposal-dto';
import { Either } from '~shared/core/either';
import { FindTradeProposalError } from './find-trade-proposal.error';

export type FindTradeProposalResponse = Either<
  FindTradeProposalError,
  TradeProposalDto[]
>;
