export type AddressProps = {
  city: string;
  state: string;
};

export class Address {
  private _props: AddressProps;

  private constructor(props: AddressProps) {
    this._props = props;
  }

  static create(props: AddressProps): Address {
    return new Address(props);
  }

  get city(): string {
    return this._props.city;
  }

  get state(): string {
    return this._props.state;
  }

  get props(): AddressProps {
    return this._props;
  }
}
