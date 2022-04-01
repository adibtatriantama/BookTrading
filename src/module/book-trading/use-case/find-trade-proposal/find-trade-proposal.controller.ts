import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { TradeProposalDto } from '~book-trading/dto/trade-proposal-dto';
import { UnexpectedError } from '~shared/core/app.error';
import {
  FindTradeProposal,
  FindTradeProposalRequest,
} from './find-trade-proposal';

@Controller('api/trade-proposal')
export class FindTradeProposalController {
  constructor(private readonly useCase: FindTradeProposal) {}

  @Get()
  async list(
    @Query() query: FindTradeProposalRequest,
  ): Promise<TradeProposalDto[]> {
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
