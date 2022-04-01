import { Test } from '@nestjs/testing';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { Trader } from '~book-trading/entity/trader';
import { TradeProposal } from '~book-trading/entity/trade-proposal';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { Address } from '~book-trading/value-object/address';
import { Book } from '~book-trading/value-object/book';
import { UnexpectedError } from '~shared/core/app.error';
import { MockType } from '~shared/test/mock-type';
import { FindTradeProposal } from './find-trade-proposal';

const tradeProposalDummy = TradeProposal.create(
  {
    traderId: 'trader',
    booksToTradeId: 'booksToTradeId',
    trader: Trader.create(
      {
        name: 'the name',
        address: Address.create({
          city: 'the city',
          state: 'the state',
        }),
      },
      'trader',
    ),
    books: [
      Book.create({
        title: 'the book',
        author: 'the author',
        condition: 'good',
      }),
    ],
    status: 'pending',
    createdAt: new Date(2022, 3, 10),
    updatedAt: new Date(2022, 3, 10),
  },
  'idd',
);

let useCase: FindTradeProposal;
let repo: MockType<BookTradingRepo>;

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      FindTradeProposal,
      BooksTradingMapper,
      {
        provide: BOOK_TRADING_REPO,
        useValue: {
          findTradeProposal: jest.fn().mockResolvedValue([tradeProposalDummy]),
        },
      },
    ],
  }).compile();

  useCase = module.get(FindTradeProposal);
  repo = module.get(BOOK_TRADING_REPO);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('FindTradeProposal', () => {
  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repo.findTradeProposal', async () => {
    await useCase.execute({});

    expect(repo.findTradeProposal).toHaveBeenCalled();
  });

  describe('happy path', () => {
    it('should return the dtos', async () => {
      const response = await useCase.execute({});

      expect(response.isRight()).toBe(true);
      expect(response.value).toBeTruthy();
    });
  });

  describe('when unexpected error happen', () => {
    it('should return UnexpectedError', async () => {
      repo.findTradeProposal?.mockRejectedValue(new Error('err msg'));

      const response = await useCase.execute({});

      expect(response.isLeft()).toEqual(true);
      expect(response.value.constructor).toEqual(UnexpectedError);
    });
  });
});
