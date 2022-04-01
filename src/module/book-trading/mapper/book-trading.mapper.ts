import { Injectable } from '@nestjs/common';
import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { TraderDto } from '~book-trading/dto/trader.dto';
import { TradeProposalDto } from '~book-trading/dto/trade-proposal-dto';
import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { Trader } from '~book-trading/entity/trader';
import { TradeProposal } from '~book-trading/entity/trade-proposal';

@Injectable()
export class BooksTradingMapper {
  mapBooksToTradeToDto(entity: BooksToTrade): BooksToTradeDto {
    return {
      id: entity.id,
      trader: entity.trader ? this.mapTraderToDto(entity.trader) : undefined,
      books: entity.books.map((book) => book.props),
      proposals: entity.proposals.map((proposal) =>
        this.mapTradeProposalToDto(proposal),
      ),
      status: entity.status,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  mapTradeProposalToDto(entity: TradeProposal): TradeProposalDto {
    return {
      id: entity.id,
      booksToTradeId: entity.booksToTradeId,
      trader: entity.trader ? this.mapTraderToDto(entity.trader) : undefined,
      status: entity.status,
      books: entity.books.map((book) => book.props),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  mapTraderToDto(entity: Trader): TraderDto {
    return {
      id: entity.id,
      name: entity.name,
      address: entity.address
        ? { city: entity.address.city, state: entity.address.state }
        : undefined,
    };
  }
}
