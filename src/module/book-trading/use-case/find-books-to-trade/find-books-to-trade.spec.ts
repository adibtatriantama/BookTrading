import { Test } from '@nestjs/testing';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { TraderDto } from '~book-trading/dto/trader.dto';
import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { Trader } from '~book-trading/entity/trader';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { Address } from '~book-trading/value-object/address';
import { Book } from '~book-trading/value-object/book';
import { UnexpectedError } from '~shared/core/app.error';
import { MockType } from '~shared/test/mock-type';
import { FindBooksToTrade } from './find-books-to-trade';

const bookToTradeDummy = BooksToTrade.create(
  {
    traderId: 'trader',
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
    status: 'open',
    createdAt: new Date(2022, 3, 10),
    updatedAt: new Date(2022, 3, 10),
  },
  'idd',
);

let useCase: FindBooksToTrade;
let repo: MockType<BookTradingRepo>;

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      FindBooksToTrade,
      BooksTradingMapper,
      {
        provide: BOOK_TRADING_REPO,
        useValue: {
          findBooksToTrade: jest.fn().mockResolvedValue([bookToTradeDummy]),
        },
      },
    ],
  }).compile();

  useCase = module.get(FindBooksToTrade);
  repo = module.get(BOOK_TRADING_REPO);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('FindBooksToTrade', () => {
  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repo.findBooksToTrade', async () => {
    await useCase.execute({});

    expect(repo.findBooksToTrade).toHaveBeenCalled();
  });

  describe('happy path', () => {
    const traderDto: TraderDto = {
      id: 'trader',
      name: 'the name',
      address: {
        city: 'the city',
        state: 'the state',
      },
    };

    const expectedDto: BooksToTradeDto = {
      id: 'idd',
      trader: traderDto,
      books: [{ title: 'the book', author: 'the author', condition: 'good' }],
      status: 'open',
      proposals: [],
      createdAt: '2022-04-09T17:00:00.000Z',
      updatedAt: '2022-04-09T17:00:00.000Z',
    };

    it('should return the dtos', async () => {
      const expectedDtos = [expectedDto];

      const response = await useCase.execute({});

      expect(response.isRight()).toBe(true);
      expect(response.value).toEqual(expectedDtos);
    });
  });

  describe('when unexpected error happen', () => {
    it('should return UnexpectedError', async () => {
      repo.findBooksToTrade?.mockRejectedValue(new Error('err msg'));

      const response = await useCase.execute({});

      expect(response.isLeft()).toEqual(true);
      expect(response.value.constructor).toEqual(UnexpectedError);
    });
  });
});
