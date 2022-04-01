import { Test } from '@nestjs/testing';
import { TradeProposalDto } from '~book-trading/dto/trade-proposal-dto';
import { UnexpectedError } from '~shared/core/app.error';
import { right, left } from '~shared/core/either';
import { MockType } from '~shared/test/mock-type';
import { FindTradeProposal } from './find-trade-proposal';
import { FindTradeProposalController } from './find-trade-proposal.controller';

const useCaseMockFactory: () => MockType<FindTradeProposal> = jest.fn(() => ({
  execute: jest.fn(),
}));

const dummyResponse: Partial<TradeProposalDto>[] = [{}];

let controller: FindTradeProposalController;
let useCaseMock: MockType<FindTradeProposal>;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    controllers: [FindTradeProposalController],
    providers: [
      {
        provide: FindTradeProposal,
        useFactory: useCaseMockFactory,
      },
    ],
  }).compile();

  controller = module.get(FindTradeProposalController);
  useCaseMock = module.get(FindTradeProposal);
});

describe('FindTradeProposal', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the use case', async () => {
    useCaseMock?.execute?.mockResolvedValue(right(dummyResponse));

    await controller.list({});

    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  describe('happy path', () => {
    it('should return dtos', async () => {
      useCaseMock?.execute?.mockResolvedValue(right(dummyResponse));

      const result = await controller.list({});

      expect(result).toBe(dummyResponse);
    });
  });

  describe('when use case resolve unexpected error', () => {
    it('should throw exception', () => {
      useCaseMock?.execute?.mockResolvedValue(left(new UnexpectedError('err')));

      expect(controller.list({})).rejects.toThrowError();
    });
  });
});
