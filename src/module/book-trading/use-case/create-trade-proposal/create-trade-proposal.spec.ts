import { Test } from '@nestjs/testing';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { Trader } from '~book-trading/entity/trader';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { Book } from '~book-trading/value-object/book';
import { UnexpectedError } from '~shared/core/app.error';
import { MockType } from '~shared/test/mock-type';
import {
  CreateTradeProposal,
  CreateTradeProposalRequest,
} from './create-trade-proposal';
import {
  BooksIsEmptyError,
  BooksToTradeIsNoLongerAcceptingProposalError,
  BooksToTradeIsNotExistError,
  TraderIsNotExistError,
} from './create-trade-proposal.error';

let useCase: CreateTradeProposal;
let repo: MockType<BookTradingRepo>;

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      CreateTradeProposal,
      BooksTradingMapper,
      {
        provide: BOOK_TRADING_REPO,
        useValue: {
          findTraderById: jest.fn().mockResolvedValue(
            Trader.create({
              name: 'trader',
            }),
          ),
          findBooksToTradeById: jest.fn().mockResolvedValue(
            BooksToTrade.create({
              traderId: 'trader',
              books: [
                Book.create({
                  title: 'the book',
                  author: 'the author',
                  condition: 'good',
                }),
              ],
            }),
          ),
          saveTradeProposal: jest
            .fn()
            .mockImplementation(async (entity) => entity),
        },
      },
    ],
  }).compile();

  useCase = module.get(CreateTradeProposal);
  repo = module.get(BOOK_TRADING_REPO);
});

describe('CreateTradeProposal', () => {
  const request: CreateTradeProposalRequest = {
    traderId: 'trader',
    booksToTradeId: 'booksToTradeId',
    books: [{ title: 'the book', author: 'the author', condition: 'good' }],
  };

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('Happy Path', () => {
    it('should call repo.saveTradeProposal', async () => {
      await useCase.execute(request);

      expect(repo.saveTradeProposal).toHaveBeenCalled();
    });

    it('should return dto', async () => {
      const response = await useCase.execute(request);

      expect(response.isRight()).toBe(true);
      expect(response.value).toBeTruthy();
    });
  });

  describe('when Trader is not exist', () => {
    it('should return TraderIsNotExistError', async () => {
      repo.findTraderById?.mockRejectedValue(new Error());

      const response = await useCase.execute(request);

      expect(response.isLeft()).toBe(true);
      expect(response.value.constructor).toEqual(TraderIsNotExistError);
    });
  });

  describe('when BooksToTrade is not exist', () => {
    it('should return BooksToTradeIsNotExistError', async () => {
      repo.findBooksToTradeById?.mockRejectedValue(new Error());

      const response = await useCase.execute(request);

      expect(response.isLeft()).toBe(true);
      expect(response.value.constructor).toEqual(BooksToTradeIsNotExistError);
    });
  });

  describe('when BooksToTrade is no longer accepting proposal', () => {
    it('should return BooksToTradeIsNoLongerAcceptingProposalError', async () => {
      repo.findBooksToTradeById?.mockResolvedValue(
        BooksToTrade.create({
          traderId: 'trader',
          status: 'closed',
          books: [
            Book.create({
              title: 'the book',
              author: 'the author',
              condition: 'good',
            }),
          ],
        }),
      );

      const response = await useCase.execute(request);

      expect(response.isLeft()).toBe(true);
      expect(response.value.constructor).toEqual(
        BooksToTradeIsNoLongerAcceptingProposalError,
      );
    });
  });

  describe('when books is empty', () => {
    it('should return BooksIsEmptyError', async () => {
      const response = await useCase.execute({
        traderId: 'trader',
        booksToTradeId: 'booksToTradeId',
        books: [],
      });

      expect(response.isLeft()).toEqual(true);
      expect(response.value.constructor).toEqual(BooksIsEmptyError);
    });
  });

  describe('when unexpected error happen', () => {
    it('should return UnexpectedError', async () => {
      repo.saveTradeProposal?.mockRejectedValue(new Error('err msg'));

      const response = await useCase.execute(request);

      expect(response.isLeft()).toEqual(true);
      expect(response.value.constructor).toEqual(UnexpectedError);
    });
  });
});
