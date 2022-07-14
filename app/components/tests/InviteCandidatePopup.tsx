import { Form } from "@remix-run/react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from "@iconify/react"

const InviteCandidatePopup = ({ open, setOpen, testName, testId }: { open: boolean, setOpen: (e: boolean) => void, testName: string, testId: string }) => {

  const [emails, setEmails] = useState([""])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
              <Dialog.Panel className="relative bg-white rounded-lg text-left p-6 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="flex justify-between items-center pt-1">
                  <h2 className="text-2xl font-bold text-gray-700">Invite Candidate</h2>
                  <Icon className="text-2xl text-gray-600 cursor-pointer" icon={'carbon:close'} onClick={() => setOpen(false)} />
                </div>
                <hr className="mt-4 mb-6 border-0 h-px bg-gray-300 w-full" />
                <p className="text-base text-gray-700 font-normal pb-4">Enter candidate’s email below to invite them for <span className="font-semibold">`{testName}`</span> Test.</p>

                <div className="flex flex-row justify-between pb-2">
                  <span className="text-sm text-gray-500 font-medium">Candidate Email</span>
                  <span className="text-sm text-primary font-normal cursor-pointer" onClick={() => setEmails([...emails, ''])}>Invite More +</span>
                </div>

                {
                  emails.map((email, i) => {
                    return <div className="pb-2" key={i}>
                      <input type="text" name={`email`} className="w-full h-11 rounded-lg border border-gray-200 text-base px-3" placeholder="johndoe@example.com" />
                    </div>
                  })
                }


                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    className="px-4 h-9 rounded-md text-sm text-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    name="inviteCandidates"
                    value={testId}
                    id="submitButton"
                    className="px-4 h-9 rounded-md text-sm text-[#F0FDF4] bg-primary"
                    onClick={() => setOpen(false)}
                  >
                    Invite
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

export default InviteCandidatePopup