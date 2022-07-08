describe('Test for Add Question', ()=>{
  it('Visiting Add Question Page',() =>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('#sectionCard').find('h2').should('have.text','Aptitude').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question') 
  })
})