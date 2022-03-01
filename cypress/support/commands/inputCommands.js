Cypress.Commands.add('checkInputErrorText', (selector, text) => {
  cy.get(selector)
    .parents('.ant-form-item-control')
    .find('.main-input__message')
    .should('contain.text', text);
});
