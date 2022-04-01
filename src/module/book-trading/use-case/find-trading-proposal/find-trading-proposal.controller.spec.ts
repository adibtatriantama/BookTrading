import { Test } from '@nestjs/testing';
import { TradingProposalDto } from '~book-trading/dto/trading-proposal-dto';
import { UnexpectedError } from '~shared/core/app.error';
import { right, left } from '~shared/core/either';
import { MockType } from '~shared/test/mock-type';
import { FindTradingProposal } from './find-trading-proposal';
import { FindTradingProposalController } from './find-trading-proposal.controller';

const useCaseMockFactory: () => MockType<FindTradingProposal> = jest.fn(() => ({
  execute: jest.fn(),
}));

const dummyResponse: Partial<TradingProposalDto>[] = [{}];

let controller: FindTradingProposalController;
let useCaseMock: MockType<FindTradingProposal>;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    controllers: [FindTradingProposalController],
    providers: [
      {
        provide: FindTradingProposal,
        useFactory: useCaseMockFactory,
      },
    ],
  }).compile();

  controller = module.get(FindTradingProposalController);
  useCaseMock = module.get(FindTradingProposal);
});

describe('FindTradingProposal', () => {
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
