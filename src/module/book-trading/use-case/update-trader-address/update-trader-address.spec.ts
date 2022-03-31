import { Test } from '@nestjs/testing';
import { BOOK_TRADING_REPO } from '~book-trading/constant';
import { Trader } from '~book-trading/entity/trader';
import { BooksTradingMapper } from '~book-trading/mapper/book-trading.mapper';
import { BookTradingRepo } from '~book-trading/repo/book-trading.repo';
import { UnexpectedError } from '~shared/core/app.error';
import { MockType } from '~shared/test/mock-type';
import {
  UpdateTraderAddress,
  UpdateTraderAddressRequest,
} from './update-trader-address';
import { TraderIsNotExist } from './update-trader-address.error';

let useCase: UpdateTraderAddress;
let repo: MockType<BookTradingRepo>;

beforeEach(async () => {
  const module = await Test.createTestingModule({
    providers: [
      UpdateTraderAddress,
      BooksTradingMapper,
      {
        provide: BOOK_TRADING_REPO,
        useValue: {
          findTraderById: jest.fn().mockResolvedValue(
            Trader.create({
              name: 'trader',
            }),
          ),
          saveTrader: jest.fn().mockImplementation(async (entity) => entity),
        },
      },
    ],
  }).compile();

  useCase = module.get(UpdateTraderAddress);
  repo = module.get(BOOK_TRADING_REPO);
});

describe('UpdateTraderAddress', () => {
  const request: UpdateTraderAddressRequest = {
    traderId: 'trader',
    city: 'city',
    state: 'state',
  };
  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call repo.saveTrader', async () => {
    await useCase.execute({ traderId: 'trader', city: 'city', state: 'state' });

    expect(repo.saveTrader).toHaveBeenCalled();
  });

  describe('happy path', () => {
    it('should return trader dto', async () => {
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
      expect(response.value.constructor).toBe(TraderIsNotExist);
    });
  });

  describe('when unexpected error happen', () => {
    it('should return UnexpectedError', async () => {
      repo.saveTrader?.mockRejectedValue(new Error());

      const response = await useCase.execute(request);

      expect(response.isLeft()).toBe(true);
      expect(response.value.constructor).toBe(UnexpectedError);
    });
  });
});
