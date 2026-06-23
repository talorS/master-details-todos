import * as t from 'io-ts';

export const GeoCodec = t.type({
  lat: t.string,
  lng: t.string,
});

export const AddressCodec = t.type({
  street: t.string,
  suite: t.string,
  city: t.string,
  zipcode: t.string,
  geo: GeoCodec,
});

export const CompanyCodec = t.type({
  name: t.string,
  catchPhrase: t.string,
  bs: t.string,
});

export const UserResponse = t.type({
  id: t.number,
  name: t.string,
  username: t.string,
  email: t.string,
  address: AddressCodec,
  phone: t.string,
  website: t.string,
  company: CompanyCodec,
});

export const UsersResponse = t.array(UserResponse);

export type User = t.TypeOf<typeof UserResponse>;
export type UserAddress = t.TypeOf<typeof AddressCodec>;
export type UserGeo = t.TypeOf<typeof GeoCodec>;
export type UserCompany = t.TypeOf<typeof CompanyCodec>;
