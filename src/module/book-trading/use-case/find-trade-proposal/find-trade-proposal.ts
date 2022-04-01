import { Inject, Injectable } from '@nestjs/common';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { TradeProposal } from '~book-trading/entity/trade-proposal';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import {
  BookTradingRepo,
  FindTradePropasalProps,
} from '~book-trading/repo/book-trading.repo';
import { UnexpectedError } from '~shared/core/app.error';
import { left, right } from '~shared/core/either';
import { UseCase } from '~shared/core/use-case';
import { FindTradeProposalResponse } from './find-trade-proposal.response';

export type FindTradeProposalRequest = FindTradePropasalProps;

@Injectable()
export class FindTradeProposal
  implements UseCase<FindTradeProposalRequest, FindTradeProposalResponse>
{
  constructor(
    @Inject(BOOK_TRADING_REPO) private readonly repo: BookTradingRepo,
    private readonly mapper: BooksTradingMapper,
  ) {}
  async execute(
    request: FindTradeProposalRequest,
  ): Promise<FindTradeProposalResponse> {
    let proposals: TradeProposal[];

    try {
      proposals = await this.repo.findTradeProposal(request);
    } catch (error) {
      return left(new UnexpectedError(error));
    }

    return right(
      proposals.map((book) => this.mapper.mapTradeProposalToDto(book)),
    );
  }
}
