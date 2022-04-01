import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { TradingProposalDto } from '~book-trading/dto/trading-proposal-dto';
import { UnexpectedError } from '~shared/core/app.error';
import {
  FindTradingProposal,
  FindTradingProposalRequest,
} from './find-trading-proposal';

@Controller('api/trading-proposal')
export class FindTradingProposalController {
  constructor(private readonly useCase: FindTradingProposal) {}

  @Get()
  async list(
    @Query() query: FindTradingProposalRequest,
  ): Promise<TradingProposalDto[]> {
    const response = await this.useCase.execute(query);

    if (response.isLeft()) {
      switch (response.value.constructor) {
        case UnexpectedError:
          throw new HttpException('Internal Server Error', 500);
        default:
          throw new HttpException('Internal Server Error', 500);
      }
    } else {
      return response.value;
    }
  }
}
