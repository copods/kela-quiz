import {
  getAddQuestionBtn,
  getAssesmentQlEditorWrapper,
  getCheckbox,
  getDeleteQuestion,
  getInput,
  getInputTextArea,
  getOptEditorInput,
  getQlEditor,
  getQuestionWithDropdown,
  getQuetion,
  getQlEditorWrapper,
  getSaveAndAddMore,
  getSectionCardByClass,
  getSectionName,
  getSections,
  getTest,
  geth1,
  getToastMessage,
  getDeleteOption,
  getSvg,
} from "support/common-function"
const section1 = `Aptitude - section1`
const useRef = "What is useRef() ?"
const saveAndAddMore = "Save & Add More"
const useRefAns = "It allows you to persist values between renders."
const useMemoAns =
  "The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running."
const addQuestion = "/add-question"

describe("Test for section-details", () => {
  beforeEach("sign-in", () => {
    cy.login()
    cy.customVisit("/members")
  })

  it("Tests to check heading, button of add question and to check breadcrumb is working and to check question delete icon", () => {
    getSections().click()
    cy.wait(1000)

    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("sectionName")[0].innerHTML === section1
        ) {
          getSectionName().should("have.text", section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    cy.wait(1000)
    getQuetion().contains("What is useRef() ?").trigger("mouseover")
    getDeleteQuestion().should("be.exist")
    getAddQuestionBtn().click()
    cy.location("pathname").should("include", addQuestion)
    geth1().should("have.text", section1 + " - Add Question")
    getTest().click()
  })

  let lengthBefore: number
  it("To check if functionality and elements of add question page are working", () => {
    getSections().click()
    cy.wait(1000)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("sectionName")[0].innerHTML === section1
        ) {
          getSectionName().should("have.text", section1)
        }
      })
    })
    getSectionName().contains(section1).click()

    getAddQuestionBtn().click()

    cy.location("pathname").should("include", addQuestion)
    geth1().should("be.visible")
    getQuestionWithDropdown().click()
    let flag = ""
    cy.get('ul[role="listbox"]').within(() => {
      cy.get("li").within(() => {
        cy.get("div").then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === "Multiple Choice") {
              flag = "CheckBox"
              el.click()
            } else if (el.innerText === "Single Choice") {
              flag = "RadioButton"
            } else if (el.innerText === "Text") {
              flag = "TextArea"
            }
            return null
          })
        })
      })
    })

    // Verifying MCQ to have Check Box in options
    if (flag === "CheckBox") {
      getCheckbox().should("have.class", "checkBox")
    }

    // Verifying Single Choice to have Radio Button in options
    getQuestionWithDropdown().click()
    cy.get("ul").within(() => {
      cy.get("li").within(() => {
        cy.get("div").then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === "Multiple Choice") {
              flag = "CheckBox"
            } else if (el.innerText === "Single Choice") {
              flag = "RadioButton"
              el.click()
            } else if (el.innerText === "Text") {
              flag = "TextArea"
            }
            return null
          })
        })
      })
    })
    if (flag === "RadioButton") {
      getInput().should("have.class", "radioButton")
    }

    // Verifying Text to have Textarea in options and should be in focused after interaction
    getQuestionWithDropdown().click()
    cy.get("ul").within(() => {
      cy.get("li").within(() => {
        cy.get("div").then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === "Multiple Choice") {
              flag = "CheckBox"
            } else if (el.innerText === "Single Choice") {
              flag = "RadioButton"
            } else if (el.innerText === "Text") {
              flag = "TextArea"
              el.click()
            }
            return null
          })
        })
      })
    })
    if (flag === "TextArea") {
      getInputTextArea().click().should("be.focused")
    }

    // On Save and Add More visit the Add Question Page
    getQlEditorWrapper().within(() => {
      getQlEditor().type(useRef)
    })
    getOptEditorInput().clear().type(useRefAns)
    getSaveAndAddMore().click()
    cy.location("pathname").should("include", "/add-question")
    cy.wait(500)

    // Verifying if Add Option functionality Working on Options
    getQuestionWithDropdown().click()
    cy.get("ul").within(() => {
      cy.get("li").within(() => {
        cy.get("div").then((el) => {
          ;[...el].forEach((el) => {
            if (el.innerText === "Multiple Choice") {
              el.click()
            }
          })
        })
      })
    })
    let secondFlag = 0
    cy.get(".h-40 > .gap-6 > .flex-col").within(() => {
      getAssesmentQlEditorWrapper().then((el) => {
        ;[...el].forEach((element) => {
          if (element.innerText === "") {
            secondFlag = 1
          }
        })
      })
    })
    if (secondFlag == 1) {
      getSaveAndAddMore().click()
      getToastMessage().should("have.text", "")
    }
    cy.get(".h-40 > .gap-6").within(() => {
      getAssesmentQlEditorWrapper()
        .its("length")
        .then((len) => {
          lengthBefore = len
        })

      // Verifying if Delete button should be visible
      getDeleteOption().should("be.visible")
      getSvg().first().click()
      getAssesmentQlEditorWrapper()
        .its("length")
        .then((len) => {
          expect(lengthBefore - 1).to.equal(len)
        })
    })
  })

  it("To check if save and continue reroutes to sections page", () => {
    getSections().should("have.text", "Tests").click()
    cy.wait(1000)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("sectionName")[0].innerHTML === section1
        ) {
          getSectionName().should("have.text", section1)
        }
      })
    })
    getSectionName().contains(section1).click()

    getAddQuestionBtn().click()
    cy.location("pathname").should("include", "/add-question")
    geth1().should("be.visible")
    getQuestionWithDropdown().click()
    cy.get("ul").within(() => {
      cy.get("li").within(() => {
        cy.get("div").then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === "Text") {
              el.click()
            }
            return null
          })
        })
      })
    })
    getQlEditorWrapper().within(() => {
      getQlEditor()
    })
    getOptEditorInput().clear().type(useMemoAns)
    getSaveAndAddMore().click()
  })

  it("To check if any option is empty or not", () => {
    getSections().should("have.text", "Tests").click()
    cy.wait(1000)
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("sectionName")[0].innerHTML === section1
        ) {
          getSectionName().should("have.text", section1)
        }
      })
    })
    getSectionName().contains(section1).click()

    getAddQuestionBtn().click()
    cy.location("pathname").should("include", addQuestion)
    geth1().should("be.visible")
    let flag = 0
    getQuestionWithDropdown().click()
    cy.get("ul").within(() => {
      cy.get("li").within(() => {
        cy.get("div").then((el) => {
          ;[...el].forEach((el) => {
            if (el.innerText === "Multiple Choice") {
              el.click()
            }
          })
        })
      })
    })
    cy.get(".h-40 > .gap-6 > .flex-col").within(() => {
      getAssesmentQlEditorWrapper().then((el) => {
        ;[...el].forEach((element) => {
          if (element.innerText === "") {
            flag = 1
          }
        })
      })
    })
    if (flag == 1) {
      getSaveAndAddMore().should("have.text", saveAndAddMore).click()
      getToastMessage().should("have.text", "")
    }
  })
})
