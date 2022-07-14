describe('Test for Add Question', ()=>{
  it('Visiting Add Question Page',() =>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    cy.get('#addQuestion').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question') 
  })

  it('Visiting Sections after Reaching Add Question Page', () => {
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    //cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question') 
    cy.get('#Section').should('have.text','Section').click()
    cy.location('pathname',{timeout:6000}).should('include', '/sections')
  })

  it('Visiting the Same Question Section after Reaching Add Question Page', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    //cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question') 
    cy.get('#Question').should('have.text','Question').click()
    cy.get('a').should('have.class','activeSection')
    //cy.get('#sectionCard').find('h2').should('have.text','asd')
  })

  it('Verifying MCQ to have Check Box in options', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')
    cy.get('button#headlessui-listbox-button-6').click()
    var flag="";
    cy.get('ul').within(()=>{
      cy.get("li").within(()=>{
        cy.get('div').then((el)=>{
          [...el].map((el)=>{
            console.log(el);
            if(el.innerText === "Multiple Choice"){
              flag = "CheckBox"
              el.click()
            }
            else if(el.innerText === 'Single Choice'){
              flag = "RadioButton"
            } 
            else if(el.innerText === 'Text'){
              flag = "TextArea"
            }
            return null
          })
        })
      })
    })
    if(flag === "CheckBox"){
      cy.get('#checkBox');
    } else if(flag === 'RadioButton'){
      cy.get('#radioButton')
    } else if(flag === 'TextArea') {
      cy.get('#textarea')
    }
  })

  it('Verifying Single Choice to have Radio Button in options', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')
    cy.get('button#headlessui-listbox-button-6').click()
    var flag="";
    cy.get('ul').within(()=>{
      cy.get("li").within(()=>{
        cy.get('div').then((el)=>{
          [...el].map((el)=>{
            console.log(el);
            if(el.innerText === "Multiple Choice"){
              flag = "CheckBox"
            }
            else if(el.innerText === 'Single Choice'){
              flag = "RadioButton"
              el.click()
            } 
            else if(el.innerText === 'Text'){
              flag = "TextArea"
            }
            return null
          })
        })
      })
    })
    if(flag === "CheckBox"){
      cy.get('#checkBox');
    } else if(flag === 'RadioButton'){
      cy.get('#radioButton')
    } else if(flag === 'TextArea') {
      cy.get('#textarea')
    }
  })

  it('Verifying Text to have Textarea in options', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    //cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')
    //cy.get('#dropdown').get('ul li').should('have.attr','aria-selected',true)
    cy.get('button#headlessui-listbox-button-6').click()
    var flag="";
    cy.get('ul').within(()=>{
      cy.get("li").within(()=>{
        cy.get('div').then((el)=>{
          [...el].map((el)=>{
            console.log(el);
            if(el.innerText === "Multiple Choice"){
              flag = "CheckBox"
            }
            else if(el.innerText === 'Single Choice'){
              flag = "RadioButton"
            } 
            else if(el.innerText === 'Text'){
              flag = "TextArea"
              el.click()
            }
            return null
          })
        })
      })
    })
    if(flag === "CheckBox"){
      cy.get('#checkBox');
    } else if(flag === 'RadioButton'){
      cy.get('#radioButton')
    } else if(flag === 'TextArea') {
      cy.get('#textarea')
    }
  })

  let lengthBefore: number;

  it('Verifying if Add Option functionality Working on Options', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    //cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')

    // cy.get('button#headlessui-listbox-button-6').click()
    // cy.get('ul>li').eq(0).click().should('have.text','Multiple Choice')
    cy.get('.h-40 > .gap-6').within(()=>{
      cy.get("#quillEditor").its('length').then((len)=> {
        lengthBefore = len;
        console.log(lengthBefore)
      })
      cy.get('.iconify--fluent').click()
    //cy.get(".1").click()
    cy.get("#quillEditor").its('length').then((len)=> {
      console.log(len)
      expect(lengthBefore+1).to.equal(len)
    })
    })
  })

  it('Verifying if Delete functionality Working on Options', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    //cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')

    cy.get('button#headlessui-listbox-button-6').click()
    //cy.get('ul>li').eq(0).click().should('have.text','Multiple Choice')
    //cy.get('.iconify--fluent').click()
    cy.get('.h-40 > .gap-6').within(()=>{
      cy.get("#quillEditor").its('length').then((len)=> {
        lengthBefore = len;
        console.log(lengthBefore)
      })
      cy.get('.iconify--fluent').click()
    //cy.get(".1").click()
    cy.get("#quillEditor").its('length').then((len)=> {
      console.log(len)
      expect(lengthBefore+1).to.equal(len)
    })
    })
  })

  it('On Save and Add More visit the Add Question Page', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    //cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')

    cy.get("#saveAndAddMore").click()
    cy.location('pathname', {timeout:60000}).should('include','/add-question')
  })

  it('On Save and Continue visit the Sections Page', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
    //cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')

    cy.get("#saveAndContinue").click()
    cy.location('pathname', {timeout:60000}).should('include','/sections')
  })

  it("Verifying if Question is Empty or not", ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
   // cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')
    cy.get("#questionEditor > .rounded-lg > .ql-container > .ql-editor").type('{backspace}').should('have.value', "")
    cy.get('#saveAndAddMore').should('have.text','Save & Add More').click()
    cy.get('.Toastify__toast')
  })

  it('Verifying if any Option is empty or not', ()=>{
    cy.visit('/sign-in')
    cy.get('#email').clear()
      .type('careers@copods.co')
      .should('have.value', 'careers@copods.co')
    cy.get('#password').clear()
      .type('kQuiz@copods')
      .should('have.value', 'kQuiz@copods')
    cy.findByRole('button').click()

    cy.get('a').find('#Sections').should('have.text', 'Sections').click()
    cy.location('pathname',{timeout: 60000}).should('include','/sections')
    cy.get('.px-5').click()
    cy.get("#headlessui-dialog-panel-5", { timeout: 10000 }).should("be.visible")
    cy.get("input#sectionName").type(`Aptitude - ${new Date().getTime()}`)
    cy.get('input#sectionDescription').type(`Aptitude - ${new Date().getTime()} Description`)
    // cy.get("textarea").type("Aptitude")
    cy.get("button#submitButton").should("have.text", "Add").click()
    cy.get('#sectionCard').first().click()
   // cy.get('#sectionCard').find('h2').should('have.text','asd').click()
    cy.get('#addQuestion').should('have.text','+ Add Question').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/add-question')
    cy.get("#optionEditor > .rounded-lg > .ql-container > .ql-editor > p").type('{backspace}').should('have.value',"")
    cy.get('#saveAndAddMore').should('have.text','Save').click()
    cy.get('.Toastify__toast')
  })
})