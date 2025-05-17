/// <reference types="cypress" />

Cypress.Commands.add('login', (username, password) => { 
    cy.visit('http://localhost:3001/');
    cy.get('#screen-title').should('exist').should("have.text", "LOGIN DO USUÁRIO");

    cy.get('#username').should('be.visible');
    cy.get('#username').clear().type(username);
    cy.get('#password').clear().type(password);

    cy.get('#button-login').should('be.enabled').click();

     cy.get('#button-logout').should('exist');

 })

