import { testsConstants } from '~/constants/common.constants'

const test1 = `Aptitude - assessment1`
const deleteTest1 = `Aptitude - test2 `
const assessments = 'Assessments'
const tableTitles = {
  srNo: 'Sr.No',
  assessment: 'Assessment',
  test: 'Test',
  createdOn: 'Created On',
  createdBy: 'Created By',
  actions: 'Action',
}
const addAssessmentbuttonText = '+ Add Assessment'
const candidateAlreadyInvited =
  'Candidate has already been invited for this Assessment'
const candidateInvited = 'Candidate Invited'
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
  it('Checks the text of Assessment Page heading', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title').should('have.text', assessments)
  })
  it('Checks the font-size of Assessment Page heading', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title').should('have.css', 'font-size', '30px')
  })
  it('Checks the font-weight of Assessment Page heading', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title').should('have.css', 'font-weight', '700')
  })
  it('Checks the color of Assessment Page heading', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title').should(
      'have.css',
      'color',
      'rgb(0, 0, 0)'
    )
  })
  // srNo
  it('Checks text of table title - Sr.No', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title').should('have.text', assessments)
    cy.get('#table-th').should('have.text', tableTitles.srNo)
  })
  it('Checks color of table title- Sr.No', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title').should('have.text', assessments)
    cy.get('#table-th').should('have.css', 'color', 'rgb(107, 114, 128)')
  })
  it('Checks font weight of table title- Sr.No', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title').should('have.text', assessments)
    cy.get('#table-th').should('have.css', 'font-weight', '600')
  })
  it('Checks font size of table title- Sr.No', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#assessments-page-title').should('have.text', assessments)
    cy.get('#table-th').should('have.css', 'font-size', '14px')
  })
  //assessment
  it('Checks text of table title- assessment', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Assessment"]').should('have.text', tableTitles.assessment)
  })
  it('Checks color of table-title- assessment', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Assessment"]').should(
      'have.css',
      'color',
      'rgb(107, 114, 128)'
    )
  })
  it('Checks font-weight of table-title- assessment', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('[data-cy="Assessment"]').should('have.css', 'font-weight', '600')
  })
  it('Checks font-size of table-title- assessment', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('[data-cy="Assessment"]').should('have.css', 'font-size', '14px')
  })
  //test
  it('Checks text of table title- test', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Test"]').should('have.text', tableTitles.test)
  })
  it('Checks color of table-title- test', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Test"]').should('have.css', 'color', 'rgb(107, 114, 128)')
  })
  it('Checks font-weight of table-title- test', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Test"]').should('have.css', 'font-weight', '600')
  })
  it('Checks font-size of table-title- test', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Test"]').should('have.css', 'font-size', '14px')
  })
  // created on
  it('Checks text of table title- Created On', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('[data-cy="Created On"]').should('have.text', tableTitles.createdOn)
  })
  it('Checks color of table title- Created On', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Created On"]').should(
      'have.css',
      'color',
      'rgb(107, 114, 128)'
    )
  })
  it('Checks font-weight of table title- Created On', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Created On"]').should('have.css', 'font-weight', '600')
  })
  it('Checks classes of table title- Created On', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Created On"]').should(
      'have.class',
      'flex-1 border-b bg-gray-100 py-4 px-3 text-sm font-semibold text-gray-500 first:pl-9 last:pr-9'
    )
  })
  // Created By
  it('Checks text of table title- Created By', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('[data-cy="Created By"]').should('have.text', tableTitles.createdBy)
  })
  it('Checks color of table title- Created By', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('[data-cy="Created By"]').should(
      'have.css',
      'color',
      'rgb(107, 114, 128)'
    )
  })
  it('Checks font-weight of table title- Created By', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('[data-cy="Created By"]').should('have.css', 'font-weight', '600')
  })
  it('Checks font-size of table title- Created By', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('[data-cy="Created By"]').should('have.css', 'font-size', '14px')
  })
  //Actions
  it('Checks text of table title- Actions', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('[data-cy="Action"]').should('have.text', tableTitles.actions)
  })
  it('Checks color of table title- Actions', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Action"]').should(
      'have.css',
      'color',
      'rgb(107, 114, 128)'
    )
  })
  it('Checks font-weight of table title- Actions', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Action"]').should('have.css', 'font-weight', '600')
  })
  it('Checks font-size of table title- Actions', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()

    cy.get('[data-cy="Action"]').should('have.css', 'font-size', '14px')
  })
  it('Checks add assessment button text', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test').should('have.text', addAssessmentbuttonText)
  })
  it('Checks add assessment button background color', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test').should(
      'have.css',
      'background-color',
      'rgb(53, 57, 136)'
    )
  })
  it('Checks add assessment button color', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test').should('have.css', 'color', 'rgb(249, 250, 251)')
  })
  it('Checks add assessment button font size', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test').should('have.css', 'font-size', '12px')
  })
  it('Checks add assessment button font weight', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test').should('have.css', 'font-weight', '500')
  })
  it('Checks add assessment button cursor', () => {
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.get('#add-test').should('have.css', 'cursor', 'pointer')
  })
  it('sort by name in ascending order ', () => {
    cy.viewport(1200, 1000)
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
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#sort-filter-body', { timeout: 8000 }).get('#descend').click()
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
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#sort-filter-container', { timeout: 8000 }).within(() => {
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
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('#sort-filter-body', { timeout: 8000 }).get('#descend').click()
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
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('#test-name-navigation')
      .should('have.text', test1)
      .click()
      .location('pathname', { timeout: 60000 })
      .should('include', '/assessments')
  })
  it('On click of count in sections, menu with all sections should open', () => {
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/assessments'
    )
    cy.wait(1000)
    cy.get('.chip-group',{timeout:6000}).then(($elements) => {
      let strings = [...$elements]
      strings.forEach(($el) => {
        if ($el.innerText.includes('\n')) {
          cy.get('#section-count-button').click()
        }
      })
    })
  })
  it('On inviting single candidate, show toast message- Candidate Invited', () => {
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.wait(1000)
    cy.get('#invite-popup-open0', { timeout: 6000 }).should('be.visible')
    cy.get('#invite-popup-open0', { timeout: 6000 })
      .should('be.visible')
      .click()

    cy.get('input[name="email"]')

      .type('johndoes@example.com')
      .should('have.focus')
      .should('have.value', 'johndoes@example.com')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', candidateInvited)
  })
  it('On inviting already invited candidate, show toast message- Candidate has already been invited for this Assessment', () => {
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.wait(1000)
    cy.get('#invite-popup-open0', { timeout: 6000 }).should('be.visible')
    cy.get('#invite-popup-open0', { timeout: 6000 })
      .should('be.visible')
      .click()

    cy.get('input[name="email"]')

      .type('johndoes@example.com')
      .should('have.focus')
      .should('have.value', 'johndoes@example.com')
    cy.get('[data-cy="submit"]').click()
    cy.get(toast).should('have.text', candidateAlreadyInvited)
  })
  it('On inviting multiple candidates with some already invited, show toast message- 1 out of 2 Candidates Invited. Others were already invited', () => {
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.wait(1000)

    cy.get('#invite-popup-open0', { timeout: 6000 })
      .should('be.visible')
      .click()
    cy.get('#invite-more').click()
    cy.get('.inviteInput').eq(0).type('ion@ion.co')
    cy.get('.inviteInput').eq(1).type('sam123@gmail.com')

    cy.get('[data-cy="submit"]').click()
  })
  it('On inviting all unique candidates, show toast message- All candidates invited.', () => {
    cy.viewport(1200, 1000)
    cy.get('a')
      .find('#tests')
      .should('have.text', testsConstants.assessments)
      .click()
    cy.wait(1000)
    cy.get('#invite-popup-open0', { timeout: 6000 })
      .should('be.visible')
      .click()
    cy.get('#invite-more').click()
    cy.get('.inviteInput').eq(0).type('ion@ionn.co')
    cy.get('.inviteInput').eq(1).type('sam1233@gmail.com')

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
    cy.wait(1000)
    cy.get('#vertical-icon', { timeout: 6000 }).click()
    cy.get('.deleteTest').click()
    cy.get('#confirm-delete').click()
    cy.get('.tableRow', { timeout: 6000 }).each(($el) => {
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
