import { Inject } from '@nestjs/common';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { Trader } from '~book-trading/entity/trader';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { Address } from '~book-trading/value-object/address';
import { UnexpectedError } from '~shared/core/app.error';
import { left, right } from '~shared/core/either';
import { UseCase } from '~shared/core/use-case';
import { TraderIsNotExist } from './update-trader-address.error';
import { UpdateTraderAddressResponse } from './update-trader-address.response';

export type UpdateTraderAddressRequest = {
  traderId: string;
  city: string;
  state: string;
};

export class UpdateTraderAddress
  implements UseCase<UpdateTraderAddressRequest, UpdateTraderAddressResponse>
{
  constructor(
    @Inject(BOOK_TRADING_REPO) private readonly repo: BookTradingRepo,
    private readonly mapper: BooksTradingMapper,
  ) {}

  async execute(
    request: UpdateTraderAddressRequest,
  ): Promise<UpdateTraderAddressResponse> {
    const newAddress = Address.create(request);

    let existingTrader: Trader;
    try {
      existingTrader = await this.repo.findTraderById(request.traderId);
    } catch (error) {
      return left(new TraderIsNotExist());
    }

    existingTrader.setAddress(newAddress);

    let savedTrader: Trader;
    try {
      savedTrader = await this.repo.saveTrader(existingTrader);
    } catch (error) {
      return left(new UnexpectedError(error));
    }

    return right(this.mapper.mapTraderToDto(savedTrader));
  }
}
