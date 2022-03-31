import { Test } from '@nestjs/testing';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { Book } from '~book-trading/value-object/book';
import { UnexpectedError } from '~shared/core/app.error';
import { MockType } from '~shared/test/mock-type';
import {
  CreateBooksToTrade,
  CreateBooksToTradeRequest,
} from './create-books-to-trade';
import { BooksIsEmptyError } from './create-books-to-trade.error';

let useCase: CreateBooksToTrade;
let repo: MockType<BookTradingRepo>;

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      CreateBooksToTrade,
      BooksTradingMapper,
      {
        provide: BOOK_TRADING_REPO,
        useValue: {
          createBooksToTrade: jest
            .fn()
            .mockImplementation(async (entity) => entity),
        },
      },
    ],
  }).compile();

  useCase = module.get(CreateBooksToTrade);
  repo = module.get(BOOK_TRADING_REPO);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('FindBooksAvailableToTrade', () => {
  const request: CreateBooksToTradeRequest = {
    traderId: 'trader',
    books: [
      Book.create({
        title: 'the book',
        author: 'the author',
        condition: 'good',
      }),
    ],
  };

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repo.findBooksAvailableToTrade', async () => {
    await useCase.execute(request);

    expect(repo.createBooksToTrade).toHaveBeenCalled();
  });

  describe('happy path', () => {
    it('should return the dtos', async () => {
      const response = await useCase.execute(request);

      expect(response.isRight()).toBe(true);
      expect(response.value).toBeTruthy();
    });
  });

  describe('when books is empty', () => {
    it('should return BooksIsEmptyError', async () => {
      const response = await useCase.execute({ traderId: 'trader', books: [] });

      expect(response.isLeft()).toEqual(true);
      expect(response.value.constructor).toEqual(BooksIsEmptyError);
    });
  });

  describe('when unexpected error happen', () => {
    it('should return UnexpectedError', async () => {
      repo.createBooksToTrade?.mockRejectedValue(new Error('err msg'));

      const response = await useCase.execute(request);

      expect(response.isLeft()).toEqual(true);
      expect(response.value.constructor).toEqual(UnexpectedError);
    });
  });
});
