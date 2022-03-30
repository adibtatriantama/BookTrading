import { Module } from '@nestjs/common';
import { FIND_BOOKS_AVAILABLE_TO_TRADE } from './constant';
import { BooksTradingMapper } from './mapper/book-trading.mapper';
import { FindBooksAvailableToTrade } from './use-case/find-books-available-to-trade/find-books-available-to-trade';
import { FindBooksAvailableToTradeController } from './use-case/find-books-available-to-trade/find-books-available-to-trade.controller';

@Module({
  controllers: [FindBooksAvailableToTradeController],
  providers: [
    {
      provide: FIND_BOOKS_AVAILABLE_TO_TRADE,
      useClass: FindBooksAvailableToTrade,
    },
    BooksTradingMapper,
  ],
})
export class BookTradingModule {}
