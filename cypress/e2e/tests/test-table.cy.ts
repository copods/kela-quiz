import { testsConstants } from '~/constants/common.constants'

const test1 = `Aptitude - test1`
const deleteTest1 = `Aptitude - test2 `
const candidateAlreadyInvited =
  'Candidate has already been invited for this Assessment'
const candidatesInvited = 'Candidates Invited'
const someCandidatesInvited =
  '1 out of 2 Candidates Invited. Others were already invited'
const allCandidatesInvited = 'All candidates invited.'
const toast = '.Toastify__toast-body'

describe('Visiting Assessment', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  // creating data to test Assessment list page
  it('Visiting Add Assessment Page', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#add-test', { timeout: 6000 })
      .should('have.text', `+ ${testsConstants.addAssessmentbutton}`)
      .click()
    cy.location('pathname').should('include', '/assessments/add-assessment')
  })
  it('sort by name in ascending order ', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('.dropdownButton span span', { timeout: 6000 })
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('.test-name-navigation', { timeout: 8000 }).then(
            ($elements) => {
              let strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.sort())
            }
          )
        }
      })
  })
  it('sort by name in descending order ', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#sort-filter-body').get('#descend').click()
    cy.get('.dropdownButton span span', { timeout: 6000 })
      .invoke('text')
      .then((el) => {
        if (el === 'Name') {
          cy.get('.test-name-navigation', { timeout: 8000 }).then(
            ($elements) => {
              let strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.reverse())
            }
          )
        }
      })
  })
  it('sort by created date in ascending order ', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#sort-filter-container').within(() => {
      cy.get('.dropdownButton')
        .click({ multiple: true })
        .get('li div')
        .get('.dropdown-option')
        .get('.not-selected')
        .click()
    })
    cy.get('.dropdownButton span span', { timeout: 6000 })
      .invoke('text')
      .then((el) => {
        if (el === 'Created Date') {
          cy.get('.test-name-navigation', { timeout: 8000 }).then(
            ($elements) => {
              let strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.sort())
            }
          )
        }
      })
  })
  it('sort by created date in descending order', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#sort-filter-body').get('#descend').click()
    cy.get('#sort-filter-container').within(() => {
      cy.get('.dropdownButton')
        .click({ multiple: true })
        .get('li div')
        .get('.dropdown-option')
        .get('.not-selected')
        .click()
    })

    cy.get('.dropdownButton span span', { timeout: 6000 })
      .invoke('text')
      .then((el) => {
        if (el === 'Created Date') {
          cy.get('.test-name-navigation', { timeout: 8000 }).then(
            ($elements) => {
              let strings = [...$elements].map(($el) => $el.innerText)
              expect(strings).to.deep.equal(strings.reverse())
            }
          )
        }
      })
  })
  it('By Clicking test name it should navigate to assessment details page', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list')
      .each(($el) => {
        cy.wrap($el).within((el) => {
          if (
            el[0].getElementsByClassName('test-name-navigation')[0]
              .innerHTML === test1
          ) {
            cy.get('.test-name-navigation').should('have.text', test1).click()
          }
        })
      })
      .location('pathname', { timeout: 60000 })
      .should('include', '/assessments')
  })
  it('On click of count in sections, menu with all sections should open', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#chip-group-id', { timeout: 10000 }).then((el) => {
      cy.get('.chip-group').then(($elements) => {
        let strings = [...$elements]
        strings.forEach(($el) => {
          if ($el.innerText.includes('\n')) {
            cy.get('#section-count-button').click()
          }
        })
      })
    })
  })
  it('invite single candidate', () => {
    cy.visit('/assessments')
    cy.get('#invite-popup-open').click()
    cy.get('.inviteInput').type('ion@ion.co')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', candidatesInvited)
  })
  it('invite already invited candidate', () => {
    cy.visit('/assessments')
    cy.get('#invite-popup-open').click()
    cy.get('.inviteInput').type('ion@ion.co')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', candidateAlreadyInvited)
  })
  it('invite multiple candidates with some already invited', () => {
    cy.visit('/assessments')
    cy.get('#invite-popup-open').click()
    cy.get('#invite-more').click()
    cy.get('.inviteInput').eq(0).type('ion@ion.co')
    cy.get('.inviteInput').eq(1).type('sam123@gmail.com')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', someCandidatesInvited)
  })
  it('invite multiple candidates, all unique', () => {
    cy.visit('/assessments')
    cy.get('#invite-popup-open').click()
    cy.get('#invite-more').click()
    cy.get('.inviteInput').eq(0).type('sally123@gmail.com')
    cy.get('.inviteInput').eq(1).type('jane123@gmail.com')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', allCandidatesInvited)
  })
  it('On click of delete, assessment should be deleted', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('.test-table-list', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          deleteTest1
        ) {
          cy.get('.test-name-navigation').should('have.text', deleteTest1)
        }
      })
    })
    cy.get('#vertical-icon', { timeout: 6000 }).click()
    cy.get('.deleteTest').click()
    cy.get('#confirm-delete').click()
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          deleteTest1
        ) {
          cy.contains(deleteTest1).should('not.exist')
        }
      })
    })
  })
})
