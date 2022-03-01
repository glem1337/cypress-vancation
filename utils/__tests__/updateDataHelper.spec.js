import updateDataHelper from '../updateDataHelper';

describe('updateDataHelper', () => {
  it('returns objects with updated attributes', () => {
    const customRelationships = {
      creditCards: {
        data: [
          { id: '1', type: 'creditCards' },
          { id: '2', type: 'creditCards' },
        ],
      },
    };
    const stateData = {
      users: {
        1: {
          attributes: {
            name: 'John',
          },
        },
        2: {
          attributes: {
            name: 'Gill',
            surname: 'Harris',
          },
          relationships: customRelationships,
        },
      },
    };
    const type = 'users';
    const ids = [1, 2];
    const name = 'Anthony';
    const surname = 'Gates';
    const data = {
      attributes: {
        name,
        surname,
      },
      relationships: {
        profile: {
          data: {
            id: '1',
            type: 'profiles',
          },
        },
      },
    };
    const expectedResult = {
      users: {
        1: data,
        2: { ...data, relationships: { ...data.relationships, ...customRelationships } },
      },
    };

    expect(updateDataHelper(stateData, type, ids, data)).toEqual(expectedResult);
  });
});
