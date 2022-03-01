const { backendUrl } = Cypress.env();
const apiPrefix = '/api/v1';

// eslint-disable-next-line import/prefer-default-export
export const apiUrl = `${backendUrl}${apiPrefix}`;
