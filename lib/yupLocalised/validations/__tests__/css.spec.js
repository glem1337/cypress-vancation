import yup from '../..';

describe('isHexColor()', () => {
  const testSchema = yup.string().isHexColor();

  describe('when value is a string and match hex color regex', () => {
    it('resolves validation', async () => {
      const result = await testSchema.validate('#ffffff');

      expect(result).toBe('#ffffff');
    });
  });

  describe('when value is not a string', () => {
    it('rejects validation', async () => {
      try {
        await testSchema.validate(undefined);
      } catch (error) {
        expect(error.message).toEqual({ id: 'yup.string.isHexColor' });
      }
    });
  });

  describe('when value is not match hex color regex', () => {
    it('rejects validation', async () => {
      try {
        await testSchema.validate('ffffff');
      } catch (error) {
        expect(error.message).toEqual({ id: 'yup.string.isHexColor' });
      }
    });
  });
});
