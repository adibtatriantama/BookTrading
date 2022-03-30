import { AddressDto } from './address.dto';

export type TraderDto = {
  id: string;
  name: string;
  address?: AddressDto;
};
