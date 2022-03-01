import yup from '../..';

describe('rangeNumberStr()', () => {
  const start = 1;
  const finish = 20;

  describe('when has max and min', () => {
    let testSchema;

    beforeEach(() => {
      testSchema = yup.string().rangeNumberStr(start, finish);
    });

    it('when value is number', async () => {
      const result = await testSchema.validate('20');

      expect(result).toBe('20');
    });

    it('when value is not number', async () => {
      try {
        await testSchema.validate('is not number');
      } catch (error) {
        expect(error.message).toEqual({ id: 'validations.mustBeNumberRange', values: { finish, start } });
      }
    });

    it('when value empty', async () => {
      try {
        await testSchema.validate(undefined);
      } catch (error) {
        expect(error.message).toEqual({ id: 'validations.mustBeNumberRange', values: { finish, start } });
      }
    });
  });

  describe('when has min and has`t max', () => {
    let testSchema;

    beforeEach(() => {
      testSchema = yup.string().rangeNumberStr(start);
    });

    it('when value is number', async () => {
      const result = await testSchema.validate('20');

      expect(result).toBe('20');
    });

    it('when value is not number', async () => {
      try {
        await testSchema.validate('is not number');
      } catch (error) {
        expect(error.message).toEqual({ id: 'validations.mustBeNumberMin', values: { start } });
      }
    });

    it('when value empty', async () => {
      try {
        await testSchema.validate(undefined);
      } catch (error) {
        expect(error.message).toEqual({ id: 'validations.mustBeNumberMin', values: { start } });
      }
    });
  });

  describe('when has max and has`t min', () => {
    let testSchema;

    beforeEach(() => {
      testSchema = yup.string().rangeNumberStr(null, finish);
    });

    it('when value is number', async () => {
      const result = await testSchema.validate('20');

      expect(result).toBe('20');
    });

    it('when value is not number', async () => {
      try {
        await testSchema.validate('is not number');
      } catch (error) {
        expect(error.message).toEqual({ id: 'validations.mustBeNumberMax', values: { finish } });
      }
    });

    it('when value empty', async () => {
      try {
        await testSchema.validate(undefined);
      } catch (error) {
        expect(error.message).toEqual({ id: 'validations.mustBeNumberMax', values: { finish } });
      }
    });
  });

  describe('when has`t max and min', () => {
    let testSchema;

    beforeEach(() => {
      testSchema = yup.string().rangeNumberStr();
    });

    it('when value is number', async () => {
      const result = await testSchema.validate('20');

      expect(result).toBe('20');
    });

    it('when value is not number', async () => {
      try {
        await testSchema.validate('is not number');
      } catch (error) {
        expect(error.message).toEqual({ id: 'validations.mustBeNumber' });
      }
    });

    it('when value empty', async () => {
      try {
        await testSchema.validate(undefined);
      } catch (error) {
        expect(error.message).toEqual({ id: 'validations.mustBeNumber' });
      }
    });
  });
});
