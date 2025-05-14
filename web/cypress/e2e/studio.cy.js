describe('Studio', () => {
  it.skip('Exemplo do Cypress Studio', () => {
    cy.visit('https://example.cypress.io')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('h1').should('be.visible');
    cy.get('h1').should('have.text', 'Kitchen Sink');
    /* ==== End Cypress Studio ==== */
  })
})