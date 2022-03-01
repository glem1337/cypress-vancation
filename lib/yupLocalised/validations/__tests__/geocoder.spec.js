import { omit } from 'ramda';

import yup from '../..';

describe('geocoder()', () => {
  const testSchema = yup.object().geocoder({ id: 'validations.test' });

  const defaultValue = {
    id: 'pr.123123',
    place: 'test_place',
    longitude: -10.10,
    latitude: 10.10,
  };

  it('value is right', async () => {
    const result = await testSchema.validate(defaultValue);

    expect(result).toEqual(defaultValue);
  });

  it('one item is missing', async () => {
    try {
       await testSchema.validate(omit(['id'], defaultValue));
    } catch (error) {
      expect(error.type).toEqual('geocoder');
    }
  });

  it('one item is not right type', async () => {
    try {
      await testSchema.validate({ ...defaultValue, place: 10 });
    } catch (error) {
      expect(error.type).toEqual('geocoder');
    }
  });
});
