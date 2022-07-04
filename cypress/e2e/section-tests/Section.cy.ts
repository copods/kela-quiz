/// <reference types="Cypress">
describe('Test for Section', () => {
  it('Check Section', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections') 
  })

  it("Add Section modal open and Add section", () =>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get("#add-section").click()
    cy.get("#headlessui-dialog-panel-6",{ timeout: 10000 }).should("be.visible")
    cy.get(":nth-child(3) > .h-11").type(`Aptitude - ${new Date().getTime()}`)
    cy.get(":nth-child(4) > .h-11").type("Aptitude")
    cy.get(".justify-end > .bg-primary",{ timeout: 10000 }).click()
    cy.get('.shadow-md').find("h2").invoke('text').should(someValue => {
      console.log(someValue);
      const $el = Cypress.$('.px-9 > .text-2xl')
      if($el.text() === someValue){
        console.log("url matched");
      }else {
        console.log("url not matched");
      }
  })
 })

  it("Add Section modal open and cancel section", () =>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/sections')
    cy.get("#add-section").click()
    cy.get("#headlessui-dialog-panel-6",{ timeout: 10000 }).should("be.visible")
    cy.get(".justify-end > .text-gray-500",{ timeout: 10000 }).click()
  })
})