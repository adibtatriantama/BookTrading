export type BookCondition = 'good' | 'bad' | 'new';

export type BookProps = {
  title: string;
  description?: string;
  author: string;
  condition: BookCondition;
};

export class Book {
  private _props: BookProps;

  private constructor(props: BookProps) {
    this._props = props;
  }

  static create(props: BookProps): Book {
    return new Book(props);
  }

  get title(): string {
    return this._props.title;
  }

  get description(): string {
    return this._props.description || '';
  }

  get author(): string {
    return this._props.author;
  }

  get condition(): BookCondition {
    return this._props.condition;
  }

  get props(): BookProps {
    return this._props;
  }
}
