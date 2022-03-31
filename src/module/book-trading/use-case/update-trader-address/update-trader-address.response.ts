import { TraderDto } from '~book-trading/dto/trader.dto';
import { Either } from '~shared/core/either';
import { UpdateTraderAddressError } from './update-trader-address.error';

export type UpdateTraderAddressResponse = Either<
  UpdateTraderAddressError,
  TraderDto
>;
