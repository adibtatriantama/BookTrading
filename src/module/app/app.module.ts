import { Module } from '@nestjs/common';
import { AccountModule } from '~account/account.module';
import { BookTradingModule } from '~book-trading/book-trading.module';
import { SharedModule } from '~shared/shared.module';

@Module({
  imports: [SharedModule, AccountModule, BookTradingModule],
})
export class AppModule {}
