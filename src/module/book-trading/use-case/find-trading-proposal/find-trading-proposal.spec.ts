import { Test } from '@nestjs/testing';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { TraderDto } from '~book-trading/dto/trader.dto';
import { Trader } from '~book-trading/entity/trader';
import { TradingProposal } from '~book-trading/entity/trading-proposal';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { Address } from '~book-trading/value-object/address';
import { Book } from '~book-trading/value-object/book';
import { UnexpectedError } from '~shared/core/app.error';
import { MockType } from '~shared/test/mock-type';
import { FindTradingProposal } from './find-trading-proposal';

const tradingProposalDummy = TradingProposal.create(
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

let useCase: FindTradingProposal;
let repo: MockType<BookTradingRepo>;

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      FindTradingProposal,
      BooksTradingMapper,
      {
        provide: BOOK_TRADING_REPO,
        useValue: {
          findTradingProposal: jest
            .fn()
            .mockResolvedValue([tradingProposalDummy]),
        },
      },
    ],
  }).compile();

  useCase = module.get(FindTradingProposal);
  repo = module.get(BOOK_TRADING_REPO);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('FindTradingProposal', () => {
  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repo.findTradingProposal', async () => {
    await useCase.execute({});

    expect(repo.findTradingProposal).toHaveBeenCalled();
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
      repo.findTradingProposal?.mockRejectedValue(new Error('err msg'));

      const response = await useCase.execute({});

      expect(response.isLeft()).toEqual(true);
      expect(response.value.constructor).toEqual(UnexpectedError);
    });
  });
});
