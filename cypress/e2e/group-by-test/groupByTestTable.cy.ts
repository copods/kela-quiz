import {
  getAscSort,
  getCandidateName,
  getCopyLinkId,
  getDescendSort,
  getDivInsideTheList,
  getDropdown,
  getDropdownButton,
  getDropdownOption,
  getElementInsideOfDropdown,
  getGroupByItemTest,
  getGroupByItems,
  getGroupByTestId,
  getGroupByTestItems,
  getNotSelected,
  getResendInviteCandidate,
  getSortFilterBody,
  getToastMessage,
  getTotalItemValue,
  getVeriticalIconId,
  geth1,
  sortFilterContainer,
} from "support/common-function"

const test1 = `Aptitude - assessment1`

describe("Test for GroupByTestTable, Result", () => {
  beforeEach("sign-in", () => {
    cy.login()
    cy.customVisit("/members")
  })

  it("To check result page element css properties and attributes", () => {
    getGroupByTestId().click()

    // checks,table contains assessment name and having correct css and attributes
    getGroupByItems().should("have.text", test1)
    getGroupByItemTest()
      .contains(test1)
      .should("be.visible")
      .should("have.css", "color", "rgb(53, 57, 136)")
      .should("have.attr", "tabindex", "0")

    // checking heading of results page
    geth1()
      .should("be.visible")
      .should("have.text", "Results")
      .should("have.class", "text-3xl font-bold text-gray-900")
      .should("have.attr", "tabindex", "0") //checking accessibility
      .should("have.attr", "aria-label", "Results")
      .click() //checking accessibility
      .should("have.focus") //checking accessibility

    // sort button
    getDescendSort()
      .should("have.attr", "tabindex", "0")
      .should("have.attr", "aria-label", "Sort Descending")

    //sort filter
    getSortFilterBody().should("be.visible")

    // dropdown
    getDropdown().should("be.visible")

    //checking total items value
    getTotalItemValue()
      .should("be.visible")
      .should("have.attr", "tabindex", "0")
      .click()
      .should("have.focus")

    // sort by name in ascending order
    getElementInsideOfDropdown()
      .invoke("text")
      .then((el) => {
        if (el === "Name") {
          getGroupByTestItems().each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                getCandidateName().then(($elements) => {
                  let strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.sort())
                })
              })
          })
        }
      })
    // sort by name in descending order

    getDescendSort().click()
    getElementInsideOfDropdown()
      .invoke("text")
      .then((el) => {
        if (el === "Name") {
          getGroupByTestItems().each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                getCandidateName().then(($elements) => {
                  let strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.sort().reverse())
                })
              })
          })
        }
      })
    getAscSort().click()

    // sort by created date in ascending order
    sortFilterContainer().within(() => {
      getDropdownButton().eq(0).click({ multiple: true })
      getDivInsideTheList()
      getDropdownOption()
      getNotSelected().click()
    })
    getElementInsideOfDropdown()
      .invoke("text")
      .then((el) => {
        if (el === "Created Date") {
          getGroupByTestItems().each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                getCandidateName().then(($elements) => {
                  let strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.sort())
                })
              })
          })
        }
      })

    // sort by created date in descending order
    getDescendSort().click()
    sortFilterContainer().within(() => {
      getDropdownButton().eq(0).click({ multiple: true })
      getDivInsideTheList()
      getDropdownOption()
      getNotSelected().click()
    })
    getElementInsideOfDropdown()
      .invoke("text")
      .then((el) => {
        if (el === "Created Date") {
          getGroupByTestItems().each(($el) => {
            cy.wrap($el)
              .children()
              .children()
              .within((el) => {
                getCandidateName().then(($elements) => {
                  let strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal(strings.reverse())
                })
              })
          })
        }
      })
  })

  it("To check elemnts inside perticular test", () => {
    cy.viewport(1500, 1000)
    getGroupByTestId().click()
    getGroupByItemTest().contains(test1).click()
    getVeriticalIconId().should("be.visible").click()
    getCopyLinkId().should("be.visible")
    getResendInviteCandidate().click()
    getToastMessage().should("have.text", "Candidate Invited Successfully")
  })
})
