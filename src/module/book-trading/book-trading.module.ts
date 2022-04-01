import { Module } from '@nestjs/common';
import { BooksTradingMapper } from './mapper/book-trading.mapper';
import { FindBooksToTrade } from './use-case/find-books-to-trade/find-books-to-trade';
import { FindBooksToTradeController } from './use-case/find-books-to-trade/find-books-to-trade.controller';

@Module({
  controllers: [FindBooksToTradeController],
  providers: [FindBooksToTrade, BooksTradingMapper],
})
export class BookTradingModule {}
