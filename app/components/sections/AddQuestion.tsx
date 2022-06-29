import { Dialog, Transition } from '@headlessui/react'
import { Icon } from "@iconify/react"
import { Form } from '@remix-run/react'
import { useState, Fragment } from 'react'

import { ClientOnly } from 'remix-utils'
import QuillEditor from '../QuillEditor.client'

const AddQuestion = ({ addQuestionModal, setAddQuestionModalValue }: { addQuestionModal: boolean, setAddQuestionModalValue: (e: boolean) => void }) => {

  const [question, setQuestion] = useState('')

  return (
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
                  {/* <TinyMceEditor /> */}
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
  )
}

export default AddQuestion