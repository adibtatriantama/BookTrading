import { Inject, Injectable } from '@nestjs/common';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { TradingProposal } from '~book-trading/entity/trading-proposal';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import {
  BookTradingRepo,
  FindTradingPropasalProps,
} from '~book-trading/repo/book-trading.repo';
import { UnexpectedError } from '~shared/core/app.error';
import { left, right } from '~shared/core/either';
import { UseCase } from '~shared/core/use-case';
import { FindTradingProposalResponse } from './find-trading-proposal.response';

export type FindTradingProposalRequest = FindTradingPropasalProps;

@Injectable()
export class FindTradingProposal
  implements UseCase<FindTradingProposalRequest, FindTradingProposalResponse>
{
  constructor(
    @Inject(BOOK_TRADING_REPO) private readonly repo: BookTradingRepo,
    private readonly mapper: BooksTradingMapper,
  ) {}
  async execute(
    request: FindTradingProposalRequest,
  ): Promise<FindTradingProposalResponse> {
    let proposals: TradingProposal[];

    try {
      proposals = await this.repo.findTradingProposal(request);
    } catch (error) {
      return left(new UnexpectedError(error));
    }

    return right(proposals.map((book) => this.mapper.mapProposalToDto(book)));
  }
}
