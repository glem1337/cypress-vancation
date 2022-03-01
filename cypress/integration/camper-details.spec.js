import LOCATORS from 'constants/locators';

describe('Camper Details page', () => {
  beforeEach(() => {
    cy.visit('/rv-rental/carson-kozey/e0d92867-2345-45da-87dd-7d21eafda0d0');
  });

  it('should add class on scroll', () => {
    cy.get('.van-details-wrap--scrolled').should('not.exist');
    cy.scrollTo(0, 1000);
    cy.get('.van-details-wrap--scrolled').should('exist');
  });

  it.only('should show/hide camper info items', () => {
    cy.get('[data-targetId="camper-info-list"')
      .as('list')
      .children()
      .should('have.length', 8);

    cy.get(
      `[data-targetId="${LOCATORS.CAMPER_DETAILS.CAMPER_INFO.BUTTON}"`,
    ).click();

    cy.get('@list').children().should('have.length', 10);
  });
});
