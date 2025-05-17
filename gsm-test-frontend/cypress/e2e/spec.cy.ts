describe('test spec', () => {

  it('Register screen test', () => {
    cy.visit('http://localhost:3001/#/register');
    cy.get('#screen-title').should('exist').should("have.text", "REGISTAR USUÁRIO");

    cy.get('#username').should('be.visible');

    cy.get('#name').clear().type('Usuario Teste de Integração');
    cy.get('#username').clear().type('user.teste3@gmail.com');
    cy.get('#password').clear().type('ab123456');
    cy.get('#confirmPassword').clear().type('ab123456');

    cy.get('#button-confirm').should('be.enabled').click();

     cy.get('#button-login').should('exist');
  })

  it('Login screen test', () => {
    cy.login('user.teste@gmail.com', 'ab123456');
  })

  it('Tasks screen test create', () => {

    cy.login('user.teste@gmail.com', 'ab123456');

    cy.get('#screen-title').should('exist').should("have.text", "LISTA DE TASKS");
    cy.get('#button-add-task').should('exist').click();

    cy.get('#title').clear().type('TASK TESTE DE INTEGRAÇÃO');
    cy.get('#description').clear().type('ISSO É UM TESTE DE INTEGRAÇÃO');

    cy.get('#button-confirm-add-task').should('be.enabled').click();   
    cy.get('#application-message').should('exist').should("contain.text", "sucesso");

  })  


  it('Tasks screen test update', () => {

    cy.login('user.teste@gmail.com', 'ab123456');

    cy.get('#screen-title').should('exist').should("have.text", "LISTA DE TASKS");
    cy.get('#button-edit-task').should('exist').first().click();    

    cy.get('#title').clear().type('TASK TESTE DE INTEGRAÇÃO UPDATE');
    cy.get('#status').should('exist').check();

    cy.get('#button-confirm-update-task').should('be.enabled').click();   
    cy.get('#application-message').should('exist').should("contain.text", "sucesso");

  })    

  it('Tasks screen test delete', () => {

    cy.login('user.teste@gmail.com', 'ab123456');

    cy.get('#screen-title').should('exist').should("have.text", "LISTA DE TASKS");
    cy.get('#button-delete-task').should('exist').first().click();    

    cy.get('#button-confirm-delete-task').should('be.enabled').click();   
    cy.get('#application-message').should('exist').should("contain.text", "sucesso");

  })      


  it('Tasks screen test filter by pedding status', () => {

    cy.login('user.teste@gmail.com', 'ab123456');

    cy.get('#screen-title').should('exist').should("have.text", "LISTA DE TASKS");
    cy.get('#select-status').should('exist').click();    

    cy.get('#select-status-P').should('exist').click();
    
    cy.get('#application-message').should('exist').should("contain.text", "");
  })    

  it('Tasks screen test filter by finigsh status', () => {

      cy.login('user.teste@gmail.com', 'ab123456');

      cy.get('#screen-title').should('exist').should("have.text", "LISTA DE TASKS");
      cy.get('#select-status').should('exist').click();    

      cy.get('#select-status-C').should('exist').click();    

      cy.get('#application-message').should('exist').should("contain.text", "");
  })   

})