import { Form, useTransition } from '@remix-run/react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import {
  commonConstants,
  sectionsConstants,
} from '~/constants/common.constants'
import Button from '../form/Button'
import { trimValue } from '~/utils'
const AddSection = ({
  open,
  setOpen,
  showErrorMessage,
}: {
  open: boolean
  setOpen: (e: boolean) => void
  showErrorMessage: boolean
}) => {
  const transition = useTransition()
  const [sectionName, setSectionName] = useState('')
  const [description, setDescription] = useState('')
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setOpen}
        id="modal-dialogue"
      >
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <Form
            method="post"
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="addSectionDilog flex items-center justify-between pt-1">
                  <h2
                    className="text-2xl font-bold text-gray-700"
                    title={sectionsConstants.addSection}
                    role={sectionsConstants.addSection}
                    tabIndex={0}
                    aria-label={sectionsConstants.addSection}
                  >
                    {sectionsConstants.addSection}
                  </h2>
                  <Icon
                    tabIndex={0}
                    className="cursor-pointer text-2xl text-gray-600"
                    icon={'carbon:close'}
                    onClick={() => setOpen(false)}
                  />
                </div>
                <hr className="mt-4 mb-6 h-px w-full border-0 bg-gray-300" />
                <div className="pb-6">
                  <input
                    tabIndex={0}
                    type="text"
                    name="name"
                    className="h-11 w-full rounded-lg border border-gray-200 px-3 text-base"
                    placeholder={commonConstants.enterSectionName}
                    onChange={(e) => setSectionName(trimValue(e.target.value))}
                    value={sectionName}
                    maxLength={52}
                  />
                </div>
                <div className="pb-6">
                  <textarea
                    tabIndex={0}
                    name="description"
                    id="section-description"
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 px-3 py-4 text-base"
                    onChange={(e) => setDescription(trimValue(e.target.value))}
                    value={description}
                    placeholder={commonConstants.enterSectionDesc}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    tabIndex={0}
                    type="button"
                    className="h-9 px-4"
                    onClick={() => setOpen(false)}
                    varient="primary-outlined"
                    title={commonConstants.cancel}
                    buttonText={commonConstants.cancel}
                  />
                  <Button
                    tabIndex={0}
                    type="submit"
                    id="submit-button"
                    className="h-9 px-4"
                    name="add-section"
                    value="add"
                    onClick={() => setOpen(false)}
                    isDisabled={
                      transition.state === 'submitting' || showErrorMessage
                    }
                    varient="primary-solid"
                    datacy="submit"
                    title={
                      transition.state === 'submitting'
                        ? commonConstants.adding
                        : commonConstants.add
                    }
                    buttonText={
                      transition.state === 'submitting'
                        ? commonConstants.adding
                        : commonConstants.add
                    }
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Form>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default AddSection
