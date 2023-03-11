import {
  getCancelButton,
  getEditProfileButton,
  getFirstNameInput,
  getLastNameInput,
  getMyProfileButton,
  getMyProfileTitle,
  getSaveButton,
  getSideNavFooterDropdownButton,
  getSideNavUserAvatar,
  getSideNavUserName,
  getToaster,
  getUserProfileDetails,
} from "support/common-function"

const userDetails = [
  {
    label: "First Name",
    name: "Copods",
  },
  {
    label: "Last Name",
    name: "Careers",
  },
]

const userNewDetails = ["Arpita", "Gupta"]
const userAvatarText = "CC"

describe("Test For MyProfile", () => {
  beforeEach("sign-in", () => {
    cy.login()
    cy.customVisit("/members")
  })

  it("Test on Visiting the My Profile", () => {
    getSideNavFooterDropdownButton().click()
    getMyProfileButton().click()

    //Heading
    //To Check if the header is visible
    getMyProfileTitle().should("be.visible")

    //To Check if the header should have correct text
    getMyProfileTitle().should("have.text", "My Profile")

    //Edit Button
    //To Check if the Edit button is visible
    getEditProfileButton().should("be.visible")

    // To check if Edit button has correct text
    getEditProfileButton().should("have.text", "Edit")

    // To check if Edit member button has correct background color
    getEditProfileButton().should(
      "have.css",
      "background-color",
      "rgb(53, 57, 136)"
    )

    //My Profile Content When we visit the Page
    //visibility of the userProfileDetails
    getUserProfileDetails().should("be.visible")

    //label should have correct Text
    getUserProfileDetails().each((element, index) => {
      cy.wrap(element).within((el) => {
        if (
          el[0].querySelector("label")?.innerHTML === userDetails[index].label
        ) {
          cy.contains(userDetails[index].label)
        }
      })
    })

    //Details should be Correct
    getUserProfileDetails().each((element, index) => {
      cy.wrap(element).within((el) => {
        return el[0].querySelector("p")?.innerHTML === userDetails[index].name
      })
    })
  })

  it("Test Edit, Cancel and Save Button", () => {
    getSideNavFooterDropdownButton().click()
    getMyProfileButton().click()

    //On Clicking of Edit Save
    //visibility of Save button and Cancel button
    getEditProfileButton().click()
    getSaveButton().should("be.visible")
    getCancelButton().should("be.visible")

    // Check if Save and Cancel button has correct text
    getSaveButton().should("have.text", "Save")
    getCancelButton().should("have.text", "Cancel")

    // Check if Save and Cancel button have correct bcakground color and color
    getSaveButton().should("have.css", "background-color", "rgb(53, 57, 136)")
    getCancelButton().should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    )
    getSaveButton().should("have.css", "color", "rgb(249, 250, 251)")
    getCancelButton().should("have.css", "color", "rgb(53, 57, 136)")

    //Check there is input field and have correct value
    getUserProfileDetails().each((element, index) => {
      cy.wrap(element).within((el) => {
        return el[0].querySelector("input")?.value === userDetails[index].name
      })
    })

    //Check if Save button is disabled when firstName input field is empty
    getFirstNameInput().clear()
    getSaveButton().should("be.disabled")

    //Check if Save button is disabled when lastName input field is empty
    getFirstNameInput().type(userNewDetails[0])
    getLastNameInput().clear()
    getSaveButton().should("be.disabled")

    //Check if Cancel button is working Properly
    getCancelButton().click()
    getUserProfileDetails().each((element, index) => {
      cy.wrap(element).within((el) => {
        return el[0].querySelector("input")?.value === userDetails[index].name
      })
    })

    //Check if user Details are submitting properly
    getEditProfileButton().click()
    getFirstNameInput().clear().type(userDetails[0].name)
    getLastNameInput().clear().type(userDetails[1].name)
    getSaveButton().click()
    getToaster().should("have.text", "User Profile is Updated successfully")
    getSideNavUserName().should(
      "have.text",
      `${userDetails[0].name} ${userDetails[1].name}`
    )
    getSideNavUserAvatar().should("have.text", userAvatarText)

    //Resetting the userdetails
    getSideNavFooterDropdownButton().click()
    getMyProfileButton().click()
    getEditProfileButton().click()
    getFirstNameInput().clear().type(userDetails[0].name)
    getLastNameInput().clear().type(userDetails[1].name)
    getSaveButton().click()
  })
})
