import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
  dataDelete,
  dataClearRelationship,
  dataRemoveRelationship,
  dataDeleteEntity,
  metaRemoveEndpoint,
} from '../actions';

it('dataApiRequest', () => {
  const endpoint = '/test';
  const expectedAction = { type: 'DATA_API_REQUEST', endpoint };

  expect(dataApiRequest({ endpoint })).toEqual(expectedAction);
});

it('dataApiSuccess', () => {
  const endpoint = '/test';
  const response = { id: '1' };
  const expectedAction = { type: 'DATA_API_SUCCESS', endpoint, response };

  expect(dataApiSuccess({ endpoint, response })).toEqual(expectedAction);
});

it('dataApiFailure', () => {
  const endpoint = '/test';
  const expectedAction = { type: 'DATA_API_FAILURE', endpoint };

  expect(dataApiFailure({ endpoint })).toEqual(expectedAction);
});

it('dataDelete', () => {
  const kind = 'stores';
  const ids = ['1', '2'];
  const expectedAction = { type: 'DATA_DELETE', kind, ids };

  expect(dataDelete({ kind, ids })).toEqual(expectedAction);
});

it('dataDeleteEntity', () => {
  const kind = 'stores';
  const expectedAction = { type: 'DATA_DELETE_ENTITY', kind };

  expect(dataDeleteEntity({ kind })).toEqual(expectedAction);
});

it('dataClearRelationship', () => {
  const kind = 'stores';
  const ids = ['1', '2'];
  const relationship = 'products';
  const isPlural = false;

  const expectedAction = {
    type: 'DATA_CLEAR_RELATIONSHIP', kind, ids, relationship, isPlural,
  };

  expect(dataClearRelationship({
    kind, ids, relationship, isPlural,
  })).toEqual(expectedAction);
});

it('dataRemoveRelationship', () => {
  const kind = 'stores';
  const ownerId = '1';
  const relationship = 'products';
  const ids = ['1', '2'];

  const expectedAction = {
    type: 'DATA_REMOVE_RELATIONSHIP', kind, ownerId, ids, relationship,
  };

  expect(dataRemoveRelationship({
    kind, ids, relationship, ownerId,
  })).toEqual(expectedAction);
});

it('metaRemoveEndpoint', () => {
  const expectedAction = {
    type: 'META_REMOVE_ENDPOINT',
    endpoint: 'test',
  };

  expect(metaRemoveEndpoint({ endpoint: 'test' })).toEqual(expectedAction);
});
