import { ObjectId } from 'bson';
import { Book } from '~book-trading/value-object/book';
import { BooksToTrade } from './books-to-trade';
import { Trader } from './trader';

export type TradingProposalStatus = 'pending' | 'accepted' | 'rejected';

export type TradingProposalProps = {
  traderId: string;
  trader?: Trader;
  booksToTradeId: string;
  booksToTrade?: BooksToTrade;
  books: Book[];
  status: TradingProposalStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export class TradingProposal {
  private _id: string;
  private _props: TradingProposalProps;

  private constructor(props: TradingProposalProps, id: string) {
    this._id = id;
    this._props = props;
  }

  static create(props: TradingProposalProps, id?: string): TradingProposal {
    return new TradingProposal(
      {
        ...props,
        createdAt: props.createdAt ? props.createdAt : new Date(),
        updatedAt: props.updatedAt ? props.updatedAt : new Date(),
      },
      id ? id : new ObjectId().toString(),
    );
  }

  get id(): string {
    return this._id;
  }

  get traderId(): string {
    return this._props.traderId;
  }

  get trader(): Trader | undefined {
    return this._props.trader;
  }

  get booksToTradeId(): string {
    return this._props.booksToTradeId;
  }

  get booksToTrade(): BooksToTrade | undefined {
    return this._props.booksToTrade;
  }

  get books(): Book[] {
    return this._props.books;
  }

  get status(): TradingProposalStatus {
    return this._props.status;
  }

  get createdAt(): Date {
    if (this._props.createdAt) {
      return this._props.createdAt;
    }
    throw new Error('TradingProposal.createdAt is not set');
  }

  get updatedAt(): Date {
    if (this._props.updatedAt) {
      return this._props.updatedAt;
    }
    throw new Error('TradingProposal.updatedAt is not set');
  }
}
