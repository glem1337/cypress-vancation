import mockHttpClient, { mockMultiHttpClient } from '../mockHttpClient';

describe('mockHttpClient', () => {
  describe('returns mock', () => {
    const method = 'get';
    const response = {
      data: { id: '1' },
    };

    it('resolve', () => {
      const mock = mockHttpClient({ method, response });
      expect(mock).toEqual(expect.objectContaining({
        [method]: expect.any(Function),
      }));
      expect(mock[method]()).resolves.toBe(response);
    });

    it('reject', () => {
      const mock = mockHttpClient({ method, response, reject: true });
      expect(mock).toEqual(expect.objectContaining({
        [method]: expect.any(Function),
      }));
      expect(mock[method]()).rejects.toBe(response);
    });
  });
});

describe('mockMultiHttpClient', () => {
  describe('returns mock for multiple calls', () => {
    const method = 'get';
    const response = {
      data: { id: '1' },
    };

    describe('same methods', () => {
      const method2 = 'get';
      const response2 = {
        data: { id: '2' },
      };

      it('resolve', () => {
        const mock = mockMultiHttpClient([
          { method, response },
          { method: method2, response: response2 },
        ]);
        expect(mock).toEqual(expect.objectContaining({
          [method]: expect.any(Function),
        }));
        expect(mock[method]()).resolves.toBe(response);
        expect(mock[method]()).resolves.toBe(response2);
      });

      it('fails returning undefined when recieved more calls than mocks', () => {
        const mock = mockMultiHttpClient([
          { method, response },
          { method: method2, response: response2 },
        ]);
        expect(mock).toEqual(expect.objectContaining({
          [method]: expect.any(Function),
        }));
        expect(mock[method]()).resolves.toBe(response);
        expect(mock[method]()).resolves.toBe(response2);
        expect(mock[method]()).toBe(undefined);
      });

      it('reject', () => {
        const mock = mockMultiHttpClient([
          { method, response, reject: true },
          { method: method2, response: response2, reject: true },
        ]);
        expect(mock).toEqual(expect.objectContaining({
          [method]: expect.any(Function),
        }));
        expect(mock[method]()).rejects.toBe(response);
        expect(mock[method]()).rejects.toBe(response2);
      });
    });

    describe('different methods', () => {
      const method2 = 'post';
      const response2 = {
        data: { id: '2' },
      };

      it('resolve', () => {
        const mock = mockMultiHttpClient([
          { method, response },
          { method: method2, response: response2 },
        ]);
        expect(mock).toEqual(expect.objectContaining({
          [method]: expect.any(Function),
          [method2]: expect.any(Function),
        }));
        expect(mock[method]()).resolves.toBe(response);
        expect(mock[method2]()).resolves.toBe(response2);
      });

      it('reject', () => {
        const mock = mockMultiHttpClient([
          { method, response, reject: true },
          { method: method2, response: response2, reject: true },
        ]);
        expect(mock).toEqual(expect.objectContaining({
          [method]: expect.any(Function),
          [method2]: expect.any(Function),
        }));
        expect(mock[method]()).rejects.toBe(response);
        expect(mock[method2]()).rejects.toBe(response2);
      });
    });
  });
});
