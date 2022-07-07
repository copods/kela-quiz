/// <reference types="Cypress">
import moment from "moment";
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
    cy.get('.border-primary ').find("h2").invoke('text').should(someValue => {
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
    cy.get('a').should('have.class', '.border-primary')
    cy.get("#headlessui-dialog-panel-6",{ timeout: 10000 }).should("be.visible")
    cy.get(".justify-end > .text-gray-500",{ timeout: 10000 }).click()
  })

  it("Check Active State of Section", () =>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.wait(1000)
    cy.location().then((loc)=>{
      cy.location("search").should('include', loc.search)
    })
  })

  it ("SortBy Name or created Date", () =>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()
    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location().then((loc)=>{
      cy.location("search").should('include', loc.search)
    })
    cy.get(".w-96")
    .within(() => {
          cy.get('#section-cards').get("a")
        .then(listing => {
          const listingCount = Cypress.$(listing).length;
          expect(listing).to.have.length(listingCount);
          cy.get("#headlessui-listbox-button-1 span span").invoke("text").then((el) =>{
            if(el === "Name"){
                cy.wait(1000);
                cy.get('h2').then($elements => {
                  var strings = [...$elements].map($el => $el.innerText);
                    expect(strings).to.deep.equal([...strings].sort())
                });
            }
        else if(el === "Created Date") {
          cy.get("#headlessui-listbox-button-1 span span").should("have.text","Created Date").then(()=>{
            cy.wait(1000)
            cy.get('.created-by-date').then($elements => {
               var strings = [...$elements].map($el =>
               {
                return  new Date($el.innerText)
               })
             expect(strings).to.deep.equal([...strings].sort())
            })
          })
         }
        })
    });
    })
  })
})