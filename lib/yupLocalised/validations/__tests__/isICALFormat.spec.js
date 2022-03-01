import yup from '../..';

describe('isICALFormat()', () => {
  const testSchema = yup.string().isICALFormat();

  describe('when value is a string and match ICAL format regex', () => {
    it('resolves validation', async () => {
      const result = await testSchema.validate('calendar.ical');

      expect(result).toBe('calendar.ical');
    });
  });

  describe('when value is not a string', () => {
    it('rejects validation', async () => {
      try {
        await testSchema.validate(undefined);
      } catch (error) {
        expect(error.message).toEqual({ id: 'yup.string.isICALFormat' });
      }
    });
  });

  describe('when value is not match ICAL format regex', () => {
    it('rejects validation', async () => {
      try {
        await testSchema.validate('calendar');
      } catch (error) {
        expect(error.message).toEqual({ id: 'yup.string.isICALFormat' });
      }
    });
  });
});
