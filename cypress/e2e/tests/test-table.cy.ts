import {
  getActionHeader,
  getAddTestBtn,
  getAssessmentHeader,
  getAssessmentsPageTitle,
  getChipGroup,
  getConfirmDelete,
  getCreatedByHeader,
  getCreatedOnHeader,
  getDeleteTest,
  getDropdownButton,
  getEmailInput,
  getInviteInput,
  getInviteMore,
  getInvitePopup,
  getSectionCountBtn,
  getSortFilterBody,
  getSubmitBtn,
  getTableTh,
  getTestHeader,
  getTestNameNavigation,
  getToastBody,
  getToastifyCloseBtn,
  getVeriticalIconId,
  sortFilterContainer,
} from "support/common-function"

const deleteTest1 = `Aptitude - test2 `
const assessments = "Assessments"
const tableTitles = {
  srNo: "Sr.No",
  assessment: "Assessment",
  test: "Test",
  createdOn: "Created On",
  createdBy: "Created By",
  actions: "Action",
}
const addAssessmentbuttonText = "+ Add Assessment"
const candidateInvited = "Candidate Invited"
const addAssessmentbutton = "Add Assessment"

describe("Visiting Assessment", () => {
  beforeEach("sign-in", () => {
    cy.login()
    cy.customVisit("/members")
  })

  it("Tests to check Attributes/Colors/Visibility/Texts", () => {
    // To visit Add assesment page
    cy.get("a").find("#tests").should("have.text", assessments).click()
    cy.location("pathname").should("include", "/assessments")
    getAddTestBtn().should("have.text", `+ ${addAssessmentbutton}`).click()
    cy.location("pathname").should("include", "/assessments/add-assessment")

    // To check text, stlyes, attributes of assesment page heading
    getAssessmentsPageTitle()
      .should("have.text", assessments)
      .should("have.css", "font-size", "30px")
      .should("have.css", "font-weight", "700")
      .should("have.css", "color", "rgb(0, 0, 0)")

    // To check table title - Sr.No
    getTableTh()
      .should("have.text", tableTitles.srNo)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "14px")

    // To check table title - assessment
    getAssessmentHeader()
      .should("have.text", tableTitles.assessment)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "14px")

    // To check table title - test
    getTestHeader()
      .should("have.text", tableTitles.test)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "14px")

    // To check table title - Created on
    getCreatedOnHeader()
      .should("have.text", tableTitles.createdOn)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "600")
      .should(
        "have.class",
        "flex-1 border-b bg-gray-100 py-4 px-3 text-sm font-semibold text-gray-500 first:pl-9 last:pr-9"
      )

    // To check table title - Created By
    getCreatedByHeader()
      .should("have.text", tableTitles.createdBy)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "14px")

    // To check table title - Actions
    getActionHeader()
      .should("have.text", tableTitles.actions)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "14px")

    // To check add assessment button styles
    getAddTestBtn()
      .should("have.text", addAssessmentbuttonText)
      .should("have.css", "background-color", "rgb(53, 57, 136)")
      .should("have.css", "color", "rgb(249, 250, 251)")
      .should("have.css", "font-size", "12px")
      .should("have.css", "font-weight", "500")
      .should("have.css", "cursor", "pointer")

    // To check sort by name in ascending
    cy.viewport(1200, 1000)
    cy.get(".dropdownButton span span", { timeout: 6000 })
      .invoke("text")
      .then((el) => {
        if (el === "Name") {
          getTestNameNavigation().then(($elements) => {
            let strings = [...$elements].map(($el) => $el.innerText)
            expect(strings).to.deep.equal(strings.sort())
          })
        }
      })

    // To check sort by name in descending
    getSortFilterBody().get("#descend").click()
    cy.get(".dropdownButton span span", { timeout: 6000 })
      .invoke("text")
      .then((el) => {
        if (el === "Name") {
          getTestNameNavigation().then(($elements) => {
            let strings = [...$elements].map(($el) => $el.innerText)
            expect(strings).to.deep.equal(strings.reverse())
          })
        }
      })

    // To check sort by date in ascending
    getSortFilterBody().get("#ascend").click()
    sortFilterContainer().within(() => {
      getDropdownButton()
        .click({ multiple: true })
        .get("li div")
        .get(".dropdown-option")
        .get(".not-selected")
        .click()
    })
    cy.get(".dropdownButton span span", { timeout: 6000 })
      .invoke("text")
      .then((el) => {
        if (el === "Created Date") {
          getTestNameNavigation().then(($elements) => {
            let strings = [...$elements].map(($el) => $el.innerText)
            expect(strings).to.deep.equal(strings.sort())
          })
        }
      })

    // To check sort by date in descending
    getSortFilterBody().get("#descend").click()
    sortFilterContainer().within(() => {
      getDropdownButton()
        .click({ multiple: true })
        .get("li div")
        .get(".dropdown-option")
        .get(".not-selected")
        .click()
    })
    cy.get(".dropdownButton span span", { timeout: 6000 })
      .invoke("text")
      .then((el) => {
        if (el === "Created Date") {
          getTestNameNavigation().then(($elements) => {
            let strings = [...$elements].map(($el) => $el.innerText)
            expect(strings).to.deep.equal(strings.reverse())
          })
        }
      })

    // To check chip group
    getChipGroup().then(($elements) => {
      let strings = [...$elements]
      strings.forEach(($el) => {
        if ($el.innerText.includes("\n")) {
          getSectionCountBtn().click()
        }
      })
    })

    // To check candidate invite toast
    getInvitePopup().click()
    getEmailInput()
      .type("johndoes@example.com")
      .should("have.focus")
      .should("have.value", "johndoes@example.com")
    getSubmitBtn().click()
    getToastBody().should("have.text", candidateInvited)
    getToastifyCloseBtn()

    // To check multiple candidate invite
    getInvitePopup().click()
    getInviteMore().click()
    getInviteInput().eq(0).type("ion@ion.co")
    getInviteInput().eq(1).type("sam123@gmail.com")
    getSubmitBtn().click()

    // To check delete assessment
    getVeriticalIconId().click()
    getDeleteTest().click()
    getConfirmDelete().click()
    cy.get(".tableRow", { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("test-name-navigation")[0].innerHTML ===
          deleteTest1
        ) {
          cy.contains(deleteTest1).should("not.exist")
        }
      })
    })
  })
})
