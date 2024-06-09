describe('Login', () => {
  it('Logando com sucesso', () => {
    cy.visit('/login');

    cy.get('[data-cy="name"]').type('joao@test.com');
    cy.get('[data-cy="email"]').type('senha123');

    cy.intercept({
      method: 'POST',
      url: '/usuario/*'
    }).as('postLogin');

    cy.get('[data-cy="submit"]').click();


    cy.wait('@postLogin').then((xhr) => {
      expect(xhr.response?.statusCode).to.eq(200);
      console.log(xhr.response);
      expect(xhr.response?.body).to.be.an('object');
    });
  });
});