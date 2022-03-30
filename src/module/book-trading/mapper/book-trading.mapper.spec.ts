import { Test } from '@nestjs/testing';
import { BooksToTradeDto } from '~book-trading/dto/books-to-trade.dto';
import { BooksToTrade } from '~book-trading/entity/books-to-trade';
import { Trader } from '~book-trading/entity/trader';
import { TradingProposal } from '~book-trading/entity/trading-proposal';
import { Address } from '~book-trading/value-object/address';
import { Book } from '~book-trading/value-object/book';
import { BooksTradingMapper } from './book-trading.mapper';

let mapper: BooksTradingMapper;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    providers: [BooksTradingMapper],
  }).compile();

  mapper = module.get(BooksTradingMapper);
});

describe('BooksToTradeMapper', () => {
  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  describe('mapBooksToTradeToDto', () => {
    let entity: BooksToTrade;
    let dto: BooksToTradeDto;

    beforeAll(() => {
      entity = BooksToTrade.create(
        {
          traderId: 'trader',
          trader: Trader.create(
            {
              name: 'name',
              address: Address.create({
                city: 'city',
                state: 'state',
              }),
            },
            'trader',
          ),
          proposals: [
            TradingProposal.create(
              {
                books: [
                  Book.create({
                    title: 'title2',
                    author: 'author2',
                    condition: 'new',
                  }),
                ],
                traderId: 'trader2',
                trader: Trader.create(
                  {
                    name: 'name2',
                    address: Address.create({
                      city: 'city2',
                      state: 'state2',
                    }),
                  },
                  'trader2',
                ),
                booksToTradeId: 'id',
                status: 'pending',
                createdAt: new Date(2022, 3, 11),
                updatedAt: new Date(2022, 3, 11),
              },
              'proposal',
            ),
          ],
          books: [
            Book.create({
              title: 'title',
              author: 'author',
              condition: 'good',
            }),
          ],
          status: 'open',
          createdAt: new Date(2022, 3, 10),
          updatedAt: new Date(2022, 3, 10),
        },
        'id',
      );

      dto = {
        id: 'id',
        trader: {
          id: 'trader',
          name: 'name',
          address: { city: 'city', state: 'state' },
        },
        books: [
          {
            title: 'title',
            author: 'author',
            condition: 'good',
          },
        ],
        proposals: [
          {
            id: 'proposal',
            booksToTradeId: 'id',
            trader: {
              id: 'trader2',
              name: 'name2',
              address: { city: 'city2', state: 'state2' },
            },
            status: 'pending',
            books: [
              {
                title: 'title2',
                author: 'author2',
                condition: 'new',
              },
            ],
            createdAt: '2022-04-10T17:00:00.000Z',
            updatedAt: '2022-04-10T17:00:00.000Z',
          },
        ],
        status: 'open',
        createdAt: '2022-04-09T17:00:00.000Z',
        updatedAt: '2022-04-09T17:00:00.000Z',
      };
    });

    it('should map correctly', () => {
      expect(mapper.mapBooksToTradeToDto(entity)).toEqual(dto);
    });
  });
});
