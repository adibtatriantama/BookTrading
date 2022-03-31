import { ObjectId } from 'bson';
import { Book } from '~book-trading/value-object/book';
import { Trader } from './trader';
import { TradingProposal } from './trading-proposal';

export type BooksToTradeStatus = 'open' | 'closed' | 'cancelled';

export type BooksToTradeProps = {
  traderId: string;
  trader?: Trader;
  proposals?: TradingProposal[];
  books: Book[];
  status?: BooksToTradeStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export class BooksToTrade {
  private _id: string;
  private _props: BooksToTradeProps;

  private constructor(props: BooksToTradeProps, id: string) {
    this._id = id;
    this._props = props;
  }

  static create(props: BooksToTradeProps, id?: string): BooksToTrade {
    return new BooksToTrade(
      {
        ...props,
        status: props.status ? props.status : 'open',
        proposals: props.proposals ? props.proposals : [],
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

  get proposals(): TradingProposal[] {
    if (this._props.proposals) {
      return this._props.proposals;
    }
    throw new Error('BooksToTrade.proposals is not set');
  }

  get books(): Book[] {
    return this._props.books;
  }

  get status(): BooksToTradeStatus {
    if (this._props.status) {
      return this._props.status;
    }
    throw new Error('BooksToTrade.status is not set');
  }

  get createdAt(): Date {
    if (this._props.createdAt) {
      return this._props.createdAt;
    }
    throw new Error('BooksToTrade.createdAt is not set');
  }

  get updatedAt(): Date {
    if (this._props.updatedAt) {
      return this._props.updatedAt;
    }
    throw new Error('BooksToTrade.updatedAt is not set');
  }

  get props(): BooksToTradeProps {
    return this._props;
  }
}
