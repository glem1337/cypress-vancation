describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Header', () => {
    it('check grouped menu on scroll', () => {
      cy.get('.main-account-header__grouped-menu').should('not.exist');
      cy.scrollTo(0, 500);
      cy.get('.main-account-header__grouped-menu').should('exist');
    });

    context('As guest user', () => {
      it('should open add new camper page', () => {
        cy.get('.main-btn--gradient').contains('List Your Camper').click();

        cy.location('pathname').should(
          'eq',
          '/add-new-camper/personal-information',
        );
      });

      it('should exist login and sign up links', () => {
        cy.get('.main-account-header__item-txt')
          .contains('Log In')
          .should('exist');

        cy.get('.main-account-header__item-txt')
          .contains('Sign Up')
          .should('exist');
      });
    });
  });

  context('Slider', () => {
    it.only('should change images', () => {
      cy.scrollTo(0, 1700);
      cy.get('[src="/images/listing/Modern-Van.svg"]').should('be.visible');
      cy.get('[src="/images/home/Popular_rv_shape.svg"]').should('be.hidden');

      cy.get('.home-popular-slider .icon-right').click();

      cy.get('[src="/images/listing/Modern-Van.svg"]').should('be.hidden');
      cy.get('[src="/images/home/Popular_rv_shape.svg"]').should('be.visible');
    });
  });
});
