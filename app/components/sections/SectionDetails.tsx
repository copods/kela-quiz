import { Dialog, Transition } from '@headlessui/react'
import { Icon } from "@iconify/react"
import { Form } from '@remix-run/react'
import { useState, Fragment } from 'react'

import type { LinksFunction } from '@remix-run/node'
import { ClientOnly } from 'remix-utils'
import QuillEditor from '../QuillEditor.client'
import quillCss from 'quill/dist/quill.snow.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: quillCss },
]

const QuestionDetails = ({ sectionDetails }: any) => {

  const [addQuestionModal, setAddQuestionModalValue] = useState(false)
  const [currentAccordian, setOpenAccordian] = useState(-1)
  const [search, setSearch] = useState('')

  const [question, setQuestion] = useState('')


  return (
    <div className="w-full px-9 py-6 h-full bg-white border border-gray-200 rounded-2xl flex flex-col gap-6 overflow-auto" >
      <h2 className="text-2xl font-semibold text-gray-700">{sectionDetails.name}</h2>
      <hr className="-mt-2 border-0 h-px bg-gray-300 w-full" />
      <div className="flex justify-between items-center">
        <input type="text" name="search" className="w-48 h-9 rounded-lg border border-gray-200 text-sm px-3" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <button className="px-5 h-9 text-[#F0FDF4] bg-primary rounded-lg text-xs" onClick={() => setAddQuestionModalValue(!addQuestionModal)} >+ Add Question</button>
      </div>

      {/* QUESTION LIST  */}

      {sectionDetails.questions
        .filter((question: any) => {
          return question.question.toLowerCase().includes(search.toLowerCase())
        })
        .map((question: any, i: number) => {
          return (
            <div key={question.id} className="border border-gray-300 rounded-2xl bg-gray-50 px-6 py-7" >
              <div className='flex items-center justify-between text-gray-600 text-base '>
                {question.question}
                {
                  currentAccordian === i
                    ?
                    <Icon icon={'akar-icons:circle-chevron-up'} className="text-gray-400 text-xl cursor-pointer" onClick={() => setOpenAccordian(-1)} />
                    :
                    <Icon icon={'akar-icons:circle-chevron-down'} className="text-gray-400 text-xl cursor-pointer" onClick={() => setOpenAccordian(i)} />
                }
              </div>
              <div className={'text-gray-600 text-base transition-all overflow-hidden ' + (currentAccordian === i ? 'max-h-96' : 'max-h-0')}>
                {question.question}<br />
                {question.question}<br />
                {question.question}<br />

              </div>
            </div>
          )
        })}

      {
        sectionDetails.questions.length === 0 && <div className='flex justify-center p-7'>No Record Found</div>
      }

      {/* ADD QUESTIONS  */}
      <Transition.Root show={addQuestionModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setAddQuestionModalValue}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <Form method="post" className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-2xl text-left p-6 overflow-hidden shadow-xl transform transition-all sm:my-8 w-9/12 min-w-[600px]">
                  <div className="flex justify-between items-center pt-1">
                    <h2 className="text-2xl font-bold text-gray-700">Add Question</h2>
                    <Icon className="text-2xl text-gray-600 cursor-pointer" icon={'carbon:close'} onClick={() => setAddQuestionModalValue(false)} />
                  </div>
                  <hr className="mt-4 mb-6 border-0 h-px bg-gray-300 w-full" />
                  <div className="pb-6">

                    <ClientOnly fallback={<div ></div>}>
                      {() => <QuillEditor setData={(e) => { setQuestion(e) }} />}
                    </ClientOnly>
                    <div className='h-12'></div>
                    <div dangerouslySetInnerHTML={{ __html: question }}></div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      className="px-4 h-9 rounded-md text-sm text-gray-500"
                      onClick={() => setAddQuestionModalValue(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 h-9 rounded-md text-sm text-[#F0FDF4] bg-primary"
                      onClick={() => setAddQuestionModalValue(false)}
                    >
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </Form>
          </div>
        </Dialog>
      </Transition.Root>
    </div >
  )
}

export default QuestionDetails