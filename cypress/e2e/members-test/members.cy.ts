/// <reference types="Cypress"/>
// describe('Members test', () => {
//   it('sign in and redirect to members page', () => {
//     cy.visit('/sign-in')
//     cy.get('#email')
//       .clear()
//       .type('careers@copods.co')
//       .should('have.value', 'careers@copods.co')
//     cy.get('#password')
//       .clear()
//       .type('kQuiz@copods')
//       .should('have.value', 'kQuiz@copods')
//     cy.findByRole('button').click()
//     cy.get('a').find('#Members').should('have.text', 'Members').click()
//     cy.location('pathname', { timeout: 60000 }).should('include', '/members')
//   })
//   it('adding user', () => {
//     cy.get('#addMember').click()
//     cy.get('#firstName').type('shisui')
//     cy.get('#lastName').type('uchiha')
//     cy.get('#email')
//       .type('shisui.uchiha@copods.co')
//       .should('have.value', 'shisui.uchiha@copods.co')
//       cy.get('#addUser').should('have.text', 'Add').click()
//   })
  

// })
