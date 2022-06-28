/// <reference types="Cypress">

import { includes } from "cypress/types/lodash"

 describe('Test for Logout, SideNav' , ()=>{   
  it('Sample Login' , ()=> {
    cy.visit("/sign-in")
    cy.on('uncaught:exception', (err, runnable) => { return false; })
    cy.get('#email').type('anurag@copods.co').should('have.value' , 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value' , 'anuragpatel')
    cy.find("button").click();
  })


  it('Test to Direct to Dashboard after Login' , ()=>{
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value' , 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value' , 'anuragpatel')
    cy.findByRole("button").click()

    cy.visit('/admin/dashboard')
    cy.url().should('include','/admin/dashboard')
  })

  it('Test for Routing and Active Tab for Results' , () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value' , 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value' , 'anuragpatel')
    cy.findByRole("button").click();

    cy.visit('/admin/results')
    cy.get('a').find('#Results').should('have.text','Results').click().url().should('includes' , '/admin/results')
  })

  it('Test for Routing and Active Tab for Tests' , () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value' , 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value' , 'anuragpatel')
    cy.findByRole("button").click();

    cy.visit('/admin/tests')
    cy.get('a').find('#Tests').should('have.text','Tests').click().url().should('includes' , '/admin/tests')
  })

  it('Test for Routing and Active Tab for Members' , () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value' , 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value' , 'anuragpatel')
    cy.findByRole("button").click();

    cy.visit('/admin/members')
    cy.get('a').find('#Members').should('have.text','Members').click().url().should('includes' , '/admin/members')
  })

  it('Test for Active Tab Color' , () => {
    cy.visit("/sign-in")
    cy.get('#email').type('anurag@copods.co').should('have.value' , 'anurag@copods.co')
    cy.get('#password').type('anuragpatel').should('have.value' , 'anuragpatel')
    cy.findByRole("button").click();

    cy.visit('/admin/results')
    cy.get('a').should('have.class' , 'bg-blue-50')
  })

  it('is redirected to the login page on log out', () => {
    cy.get('form').click().url().should('includes', '/sign-in')
  })

})