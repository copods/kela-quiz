describe('Test for Candidate assessment', () => {
  it('Check candidate is in correct exam link', () => {
    cy.login()
    cy.customVisit('/members')
    cy.get('#group-by-tests').click()
    cy.get('a').find('#tests').click()
    cy.get('#invite-popup-open').click()
    cy.get('.inviteInput').type('kaybi@copods.co')
    cy.get('[data-cy="submit"]').click()
    cy.get('#group-by-tests').click()
    cy.get('.groupByItemTest').eq(1).click()
    cy.get('#vertical-icon', { timeout: 8000 }).click()
    cy.get('[data-cy="copy-link"]').should('be.visible').click()
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin,
        },
      })
    )
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        text
      })
    })
    cy.visit(
      'http://localhost:3000/assessment/clcq2iume10398mh4rogwed86/register'
    )
  })

  it('checks, register heading should be visible', () => {
    cy.visit(
      'http://localhost:3000/assessment/clcq2iume10398mh4rogwed86/register'
    )
    cy.get('h1').should('be.visible')
  })

  it('checks, First and Last Name field of the page and button should be disable', () => {
    cy.visit(
      'http://localhost:3000/assessment/clcq2iume10398mh4rogwed86/register'
    )
    cy.get('#firstName')
      .should('be.visible', { timeout: 60000 })
      .should('have.attr', 'placeholder', 'Enter first name')

    cy.get('#lastName')
      .should('be.visible', { timeout: 60000 })
      .should('have.attr', 'placeholder', 'Enter last name')

    cy.get("[data-cy='submit-button']").should('be.disabled')
  })

  it('checks, button color when it is disabled', () => {
    cy.visit(
      'http://localhost:3000/assessment/clcq2q2ld29728mh40ylev7q6/register'
    )
    cy.get("[data-cy='submit-button']").should(
      'have.css',
      'background-color',
      'rgb(162, 164, 214)'
    )
  })

  it('checks, submitting the registeration form', () => {
    cy.visit(
      'http://localhost:3000/assessment/clcq2q2ld29728mh40ylev7q6/register'
    )
    cy.get('#firstName').type('aa')
    cy.get('#lastName').type('Jain')
    cy.get("[data-cy='submit-button']")
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(53, 57, 136)')
      .click()
    cy.visit(
      'http://localhost:3000/assessment/clcq2gg1202958mh4lglhfga8/verification'
    )
  })
})
