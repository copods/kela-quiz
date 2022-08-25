// import { cypress, routeFiles } from '~/constants/common.constants'

// /// <reference types="Cypress">
// describe('Test for Section', () => {
//   beforeEach('sign-in', () => {
//     cy.visit('/sign-in')
//     cy.get('input[name="email"]')
//       .focus()
//       .clear()
//       .type('careers@copods.co')
//       .should('have.value', cypress.email)
//     cy.get('input[name="password"]')
//       .focus()
//       .clear()
//       .type('kQuiz@copods')
//       .should('have.value', cypress.password)
//     cy.get('[data-cy="submit"]').click()
//     cy.get('a')
//       .find('#Sections')
//       .should('have.text', routeFiles.sections)
//       .click()
//     cy.location('pathname').should('include', '/sections')
//   })
//   afterEach(() => {
//     cy.get('#logoutButton').click()
//   })
//   it('Create Section', () => {
//     cy.get('#add-section').click()
//     const sectionName = `Aptitude - ${new Date().getTime()}`
//     cy.get('form > div')
//       .should('be.visible')
//       .within((el) => {
//         cy.get('input').type(sectionName)
//         cy.get('textarea').type('Aptitude')
//         cy.get('[data-cy="submit"]').click()
//       })
//   })

//   xit('cancel Add section', () => {
//     cy.get('#add-section').click()
//     cy.get('form > div')
//       .should('be.visible')
//       .within(() => {
//         cy.get("button[type='button']").click()
//       })
//   })
//   let deletedItem: string
//   xit('on click of delete, section should be deleted', () => {
//     cy.get('#section-cards')
//       .invoke('text')
//       .then((el) => {
//         cy.get('#sctionName').then(($elements) => {
//           var strings = [...$elements].map(($el) => {
//             deletedItem = $el.innerText
//             return $el.innerText
//           })
//           expect(deletedItem).to.deep.equal(strings.toString())
//         })
//       })
//       .parent()
//       .within(() => {
//         cy.get('.verticle-menu').click()
//       })
//     cy.get('.group').click()
//     cy.get('.confirm-delete').click()
//     cy.get('#section-cards').each((item) => {
//       cy.contains(deletedItem).should('not.exist')
//     })
//     return false
//   })
//   xit('Check Active State of Section', () => {
//     cy.location().then((loc) => {
//       cy.location('search').should('include', loc.search)
//     })
//   })

//   it('SortBy Name or created Date', () => {
//     cy.location().then((loc) => {
//       cy.location('search').should('include', loc.search)
//     })
//     cy.get('.w-96').within(() => {
//       cy.get('#section-cards')
//         .get('a')
//         .then((listing) => {
//           const listingCount = Cypress.$(listing).length
//           expect(listing).to.have.length(listingCount)
//           cy.get('#headlessui-listbox-button-1 span span')
//             .invoke('text')
//             .then((el) => {
//               if (el === 'Name') {
//                 cy.get('h2').then(($elements) => {
//                   var strings = [...$elements].map(($el) => $el.innerText)
//                   expect(strings).to.deep.equal([...strings].sort())
//                 })
//               } else if (el === 'Created Date') {
//                 cy.get('.created-by-date').then(($elements) => {
//                   var strings = [...$elements].map(($el) => {
//                     return new Date($el.innerText).toLocaleDateString
//                   })
//                   expect(strings).to.deep.equal([...strings].sort())
//                 })
//               }
//             })
//         })
//     })
//   })
// })
