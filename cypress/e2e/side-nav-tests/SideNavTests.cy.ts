describe('Test for Logout, SideNav', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })

  it('click all links with loop', () => {
    const pages = ['members', 'tests', 'sections', 'group-by-tests', 'Settings']

    cy.login()

    cy.customVisit('/members')

    pages.forEach((page) => {
      cy.get(`#${page}`).click()

      cy.customVisit('/members')
    })
  })
  it('should render drop down to switch workspace', () => {
    cy.get('#dropdown').should('be.visible')
  })

  it('should render dropdown for workspace without any workspace', () => {
    const dropdown = cy.get('#dropdown')
    dropdown
      .click()
      .find('ul')
      .find('li')
      .should((item) => {
        expect(item.length).to.be.greaterThan(1)
      })
  })
})
