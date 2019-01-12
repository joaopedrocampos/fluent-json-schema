// This file will be passed to the TypeScript CLI to verify our typings compile

import { FluentSchema, StringSchema, NumberSchema } from '../FluentSchema'
const mixed = FluentSchema().mixed<NumberSchema & StringSchema>([
  'string',
  'number',
])
mixed.minimum().maxLength()

const schema = FluentSchema()
  .object()
  .id('http://foo.com/user')
  .title('A User')
  .description('A User desc')
  .definition(
    'address',
    FluentSchema()
      .object()
      .id('#address')
      .prop('country')
      .allOf([FluentSchema().string()])
      .prop('city')
      .prop('zipcode')
  )
  .prop('username')
  .prop(
    'avatar',
    FluentSchema()
      .string()
      .contentEncoding('base64')
      .contentMediaType('image/png')
  )
  .required()
  .prop(
    'password',
    FluentSchema()
      .string()
      .default('123456')
      .minLength(6)
      .maxLength(12)
      .pattern('.*')
  )
  .required()
  .prop(
    'addresses',
    FluentSchema()
      .array()
      .items([FluentSchema().ref('#address')])
  )
  .required()
  .prop(
    'role',
    FluentSchema()
      .object()
      .id('http://foo.com/role')
      .prop('name')
      .enum(['ADMIN', 'USER'])
      .prop('permissions')
  )
  .required()
  .prop('age', FluentSchema().integer())

  .valueOf()

console.log({ schema })
