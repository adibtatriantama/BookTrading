import { ObjectId } from 'bson';
import { Address } from '~book-trading/value-object/address';

export type TraderProps = {
  name: string;
  address?: Address;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Trader {
  private _id: string;
  private _props: TraderProps;

  private constructor(props: TraderProps, id: string) {
    this._id = id;
    this._props = props;
  }

  static create(props: TraderProps, id?: string): Trader {
    return new Trader(
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

  get name(): string {
    return this._props.name;
  }

  get address(): Address | undefined {
    return this._props.address;
  }

  get createdAt(): Date {
    if (this._props.createdAt) {
      return this._props.createdAt;
    }
    throw new Error('Trader.createdAt is not set');
  }

  get updatedAt(): Date {
    if (this._props.updatedAt) {
      return this._props.updatedAt;
    }
    throw new Error('Trader.updatedAt is not set');
  }
}
