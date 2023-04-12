import {
  getDropdownOptions,
  getFeedback,
  getFeedbackCardsContainer,
  getFeedbackTableHeader,
  getFeedbackTitle,
  getFeedbackTypeDropdown,
  getFeedbackTypeDropdownText,
  getSortFilterDropdown,
  getSortFilterDropdownText,
  getTestsFilterDropdown,
  getTestsFilterDropdownText,
} from "support/common-function"

describe("Tests for Feedback", () => {
  const feedback = "Feedback"
  const feedbackCardContent = [
    { heading: "Total Feedback", count: "1" },
    { heading: "Positive Feedback", count: "1" },
    { heading: "Negative Feedback", count: "0" },
    { heading: "Neutral Feedback", count: "0" },
  ]
  const testDropdownOptions = [
    "All Tests",
    "Aptitude - assessment2",
    "Aptitude - assessment1",
    "Quantitative - assessment1",
  ]

  const feedbackTypeOptions = [
    "All Feedbacks",
    "Positive",
    "Negative",
    "Neutral",
  ]

  const sortfilterDropdownOptions = ["Newer", "Older"]

  it("Test to check feedback Functionality/styling", () => {
    cy.login()
    cy.customVisit("/members")

    // To check location and title
    getFeedback().should("have.text", feedback).click()
    cy.location("pathname").should("include", "/feedback")
    getFeedbackTitle().should("have.text", feedback)

    //To check card styling and content
    getFeedbackCardsContainer()
      .get(".col-span-1")
      .should("have.length", 4)
      .each((el, index) => {
        cy.wrap(el).within((element) => {
          element.hasClass(
            "col-span-1 flex gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-[0px_1px_10px_rgba(0,0,0,0.08)]"
          )
          element.has("img")
          element.has("div").hasClass("flex flex-col gap-2")
          element
            .has("div")
            .has("span")
            .each((i, card) => {
              cy.wrap(card).within((item) => {
                let string = item[0].innerText
                i === 0
                  ? expect(string).to.have.string(
                      feedbackCardContent[index].heading
                    )
                  : expect(string).to.have.string(
                      feedbackCardContent[index].count
                    )
              })
            })
        })
      })

    //To check the feedback table header styling/functionality
    getFeedbackTableHeader()
      .eq(0)
      .find("span")
      .eq(0)
      .should("have.text", feedback)
      .should("have.class", "text-xl")
    getFeedbackTableHeader()
      .eq(0)
      .find("span")
      .eq(1)
      .should("have.class", "h-4 w-[1px] border-r-[1px] border-gray-300")
    getFeedbackTableHeader()
      .eq(0)
      .find("span")
      .eq(2)
      .should("have.text", "Filters")
      .should("have.class", "text-xs text-gray-500")
    getTestsFilterDropdown().should(
      "have.class",
      "dropdownButton relative h-9 px-2 py-2.5 w-full cursor-pointer rounded-md border border-gray-200 bg-white text-left shadow-sm sm:text-sm"
    )

    //To check the test filter styling/functionality
    getTestsFilterDropdownText().should("have.text", testDropdownOptions[0])
    getTestsFilterDropdown().click()
    getDropdownOptions()
      .get("div div input")
      .should("have.attr", "placeholder", "Search...")
    getDropdownOptions()
      .get("div div li .dropdown-option")
      .each((el, index) => {
        const string = el[0].innerText
        expect(string).to.have.string(testDropdownOptions[index])
      })
    getDropdownOptions()
      .get("div div li .dropdown-option")
      .eq(0)
      .should("have.class", "")
    getTestsFilterDropdown().click()

    //To check the feedback Type filter styling/functionality
    getFeedbackTypeDropdownText().should("have.text", feedbackTypeOptions[0])
    getFeedbackTypeDropdown().click()
    getDropdownOptions()
      .get("div div li .dropdown-option")
      .each((el, index) => {
        const string = el[0].innerText
        expect(string).to.have.string(feedbackTypeOptions[index])
      })
    getFeedbackTypeDropdown().click()

    //To check the Sorting filter styling/functionality
    getSortFilterDropdownText().should(
      "have.text",
      sortfilterDropdownOptions[0]
    )
    getSortFilterDropdown().click()
    getDropdownOptions()
      .get("div div li .dropdown-option")
      .each((el, index) => {
        const string = el[0].innerText
        expect(string).to.have.string(sortfilterDropdownOptions[index])
      })
    getFeedbackTypeDropdown().click()
  })
})
