import { testsConstants } from '~/constants/common.constants'

const test1 = `Aptitude - test1`
const deleteTest1 = `Aptitude - test2 `
const assessments = 'Assessments'
const tableTitles = {
  srNo: 'Sr.No',
  assessment: 'Assessment',
  test: 'Test',
  createdOn: 'Created on',
  createdBy: 'Created By',
  actions: 'Actions',
}

const candidateAlreadyInvited =
  'Candidate has already been invited for this Assessment'
const candidateInvited = 'Candidate Invited'
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
  it('Checks heading of assessment page for visibility and css', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title')
      .should('have.text', assessments)
      .should('have.css', 'font-size', '30px')
      .should('have.css', 'font-weight', '700')
      .should('have.css', 'color', 'rgb(0, 0, 0)')
  })

  it('Checks table titles of assessments', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-table-sr-no')
      .should('have.text', tableTitles.srNo)
      .should('have.css', 'color', 'rgb(107, 114, 128)')
    cy.get('#assessments-table-assessment')
      .should('have.text', tableTitles.assessment)
      .should('have.css', 'color', 'rgb(107, 114, 128)')
    cy.get('#assessments-table-test')
      .should('have.text', tableTitles.test)
      .should('have.css', 'color', 'rgb(107, 114, 128)')
    cy.get('#assessments-table-created-on')
      .should('have.text', tableTitles.createdOn)
      .should('have.css', 'color', 'rgb(107, 114, 128)')
    cy.get('#assessments-table-created-by')
      .should('have.text', tableTitles.createdBy)
      .should('have.css', 'color', 'rgb(107, 114, 128)')
    cy.get('#assessments-table-actions')
      .should('have.text', tableTitles.actions)
      .should('have.css', 'color', 'rgb(107, 114, 128)')
  })

  it('Checks add assessment button text and css', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test')
      .should('have.text', '+ Add Assessment')
      .should('have.css', 'background-color', 'rgb(53, 57, 136)')
      .should('have.css', 'color', 'rgb(249, 250, 251)')
      .should('have.css', 'font-size', '12px')
      .should('have.css', 'font-weight', '500')
      .should('have.css', 'cursor', 'pointer')
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
  it('On inviting single candidate, show toast message- Candidate Invited', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#invite-popup-open').click()
    cy.get('.inviteInput').type('ion@ion.co')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', candidateInvited)
  })
  it('On inviting already invited candidate, show toast message- Candidate has already been invited for this Assessment', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#invite-popup-open').click()
    cy.get('.inviteInput').type('ion@ion.co')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', candidateAlreadyInvited)
  })
  it('On inviting multiple candidates with some already invited, show toast message- 1 out of 2 Candidates Invited. Others were already invited', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#invite-popup-open').click()
    cy.get('#invite-more').click()
    cy.get('.inviteInput').eq(0).type('ion@ion.co')
    cy.get('.inviteInput').eq(1).type('sam123@gmail.com')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', someCandidatesInvited)
  })
  it('On inviting all unique candidates, show toast message- All candidates invited.', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
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
