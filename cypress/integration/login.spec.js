import { apiUrl } from '../support/constants';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/log_in');
    cy.get('input[name=email]').as('emailInput');
    cy.get('input[name=password]').as('passwordInput');
  });

  context('errors validation', () => {
    context('email field', () => {
      it('should has wrong format validation message', () => {
        cy.get('@emailInput').type('wrong').blur();

        cy.checkInputErrorText('@emailInput', 'Email has a wrong format');
      });

      it('should has required validation message', () => {
        cy.get('@emailInput').focus().blur();

        cy.checkInputErrorText('@emailInput', 'Email is required');
      });
    });

    context('password field', () => {
      it('should has required validation message', () => {
        cy.get('input[name=password]').as('passwordInput').focus().blur();

        cy.checkInputErrorText('@passwordInput', 'Password is required');
      });
    });
  });

  context('validation on submit', () => {
    it('when fields are empty', () => {
      cy.get('.auth-main__btn-wrap').children().click();

      cy.checkInputErrorText('@emailInput', 'Email is required');
      cy.checkInputErrorText('@passwordInput', 'Password is required');
    });

    it('when fields are not empty', () => {
      cy.intercept('POST', `${apiUrl}/accounts/session`, {
        statusCode: 401,
        fixture: 'login/invalidEmailOrPassword.json',
      });

      cy.get('@emailInput').type('wrong@test.com');
      cy.get('@passwordInput').type('123456');

      cy.get('.auth-main__btn-wrap').children().click();

      cy.get('.ant-alert-message').should(
        'contain.text',
        'Invalid email or password',
      );
    });
  });

  it('should login via form', () => {
    cy.intercept('POST', `${apiUrl}/accounts/session`, {
      statusCode: 201,
      fixture: 'login/successLoginResponse.json',
    });

    cy.intercept('POST', `${apiUrl}/accounts/session/refresh`, {
      statusCode: 201,
      fixture: 'login/successLoginResponse.json',
    });

    cy.get('@emailInput').type('email@test.com');
    cy.get('@passwordInput').type('123456');

    cy.get('.auth-main__btn-wrap').children().click();

    cy.get('.ant-alert-message').should('not.exist');

    cy.intercept('GET', `${apiUrl}/*`).as('homePageRequests');

    cy.wait('@homePageRequests');

    cy.location('pathname').should('eq', '/');
  });
});
