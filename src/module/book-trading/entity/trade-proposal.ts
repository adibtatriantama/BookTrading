import { ObjectId } from 'bson';
import { Book } from '~book-trading/value-object/book';
import { BooksToTrade } from './books-to-trade';
import { Trader } from './trader';

export type TradeProposalStatus = 'pending' | 'accepted' | 'rejected';

export type TradeProposalProps = {
  traderId: string;
  trader?: Trader;
  booksToTradeId: string;
  booksToTrade?: BooksToTrade;
  books: Book[];
  status?: TradeProposalStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export class TradeProposal {
  private _id: string;
  private _props: TradeProposalProps;

  private constructor(props: TradeProposalProps, id: string) {
    this._id = id;
    this._props = props;
  }

  static create(props: TradeProposalProps, id?: string): TradeProposal {
    return new TradeProposal(
      {
        ...props,
        status: props.status ? props.status : 'pending',
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

  get status(): TradeProposalStatus {
    if (this._props.status) {
      return this._props.status;
    }
    throw new Error('TradeProposal.status is not set');
  }

  get createdAt(): Date {
    if (this._props.createdAt) {
      return this._props.createdAt;
    }
    throw new Error('TradeProposal.createdAt is not set');
  }

  get updatedAt(): Date {
    if (this._props.updatedAt) {
      return this._props.updatedAt;
    }
    throw new Error('TradeProposal.updatedAt is not set');
  }
}
