import { Test } from '@nestjs/testing';
import { FIND_BOOKS_AVAILABLE_TO_TRADE } from '~book-trading/constant';
import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { UnexpectedError } from '~shared/core/app.error';
import { right, left } from '~shared/core/either';
import { MockType } from '~shared/test/mock-type';
import { FindBooksAvailableToTrade } from './find-books-available-to-trade';
import { FindBooksAvailableToTradeController } from './find-books-available-to-trade.controller';

const useCaseMockFactory: () => MockType<FindBooksAvailableToTrade> = jest.fn(
  () => ({
    execute: jest.fn(),
  }),
);

const dummyResponse: Partial<BooksToTradeDto>[] = [{}];

let controller: FindBooksAvailableToTradeController;
let useCaseMock: MockType<FindBooksAvailableToTrade>;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    controllers: [FindBooksAvailableToTradeController],
    providers: [
      {
        provide: FIND_BOOKS_AVAILABLE_TO_TRADE,
        useFactory: useCaseMockFactory,
      },
    ],
  }).compile();

  controller = module.get(FindBooksAvailableToTradeController);
  useCaseMock = module.get(FIND_BOOKS_AVAILABLE_TO_TRADE);
});

describe('SearchImageController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the use case', async () => {
    useCaseMock?.execute?.mockResolvedValue(right(dummyResponse));

    await controller.list();

    expect(useCaseMock.execute).toHaveBeenCalled();
  });

  describe('happy path', () => {
    it('should return dtos', async () => {
      useCaseMock?.execute?.mockResolvedValue(right(dummyResponse));

      const result = await controller.list();

      expect(result).toBe(dummyResponse);
    });
  });

  describe('when use case resolve unexpected error', () => {
    it('should throw exception', () => {
      useCaseMock?.execute?.mockResolvedValue(left(new UnexpectedError('err')));

      expect(controller.list()).rejects.toThrowError();
    });
  });
});
