import { Test } from '@nestjs/testing';
import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { UnexpectedError } from '~shared/core/app.error';
import { right, left } from '~shared/core/either';
import { MockType } from '~shared/test/mock-type';
import { FindBooksToTrade } from './find-books-to-trade';
import { FindBooksToTradeController } from './find-books-to-trade.controller';

const useCaseMockFactory: () => MockType<FindBooksToTrade> = jest.fn(() => ({
  execute: jest.fn(),
}));

const dummyResponse: Partial<BooksToTradeDto>[] = [{}];

let controller: FindBooksToTradeController;
let useCaseMock: MockType<FindBooksToTrade>;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    controllers: [FindBooksToTradeController],
    providers: [
      {
        provide: FindBooksToTrade,
        useFactory: useCaseMockFactory,
      },
    ],
  }).compile();

  controller = module.get(FindBooksToTradeController);
  useCaseMock = module.get(FindBooksToTrade);
});

describe('FindBooksToTradeController', () => {
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
