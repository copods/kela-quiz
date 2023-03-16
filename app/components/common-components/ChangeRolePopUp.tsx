// import { useState } from "react"

// import { Form } from "@remix-run/react"
// import { t } from "i18next"

// import DropdownField from "../common-components/Dropdown"

// import Button from "./Button"
// import DialogWrapper from "./Dialog"
// import {
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogWrapperNew,
// } from "./Dialog"

export default function ChangeRolePopUp({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (e: boolean) => void
}) {
  // const [statusFilter, setStatusFilter] = useState("All")
  // // const filterByStatus = [
  //   {
  //     name: "All",
  //     value: "all",
  //   },
  //   {
  //     name: "Pending",
  //     value: "pending",
  //   },
  //   {
  //     name: "Completed",
  //     value: "complete",
  //   },
  // ]
  // return (
  //   <DialogWrapper open={open} setOpen={setOpen}>
  //   //   <>
  //   //     <DialogHeader heading="Change Role" />
  //   //     <DialogContent>
  //   //       <div id="change-role-dialog" className="bg-white">
  //   //         <div className="flex-col gap-5 sm:flex sm:items-start">
  //   //           <div className="text-sm font-normal text-gray-600">
  //   //             Select a role that you want to assign.
  //   //           </div>
  //   //           <div className="w-full">
  //   //             <DropdownField
  //   //               data={filterByStatus}
  //   //               displayKey="name"
  //   //               valueKey="value"
  //   //               value={statusFilter}
  //   //               setValue={setStatusFilter}
  //   //             />
  //   //           </div>
  //   //         </div>
  //   //       </div>
  //   //     </DialogContent>
  //   //     <DialogFooter>
  //   //       <>
  //   //         <div className="gap-2 sm:flex sm:flex-row-reverse">
  //   //           <Form method="post">
  //   //             <Button
  //   //               tabIndex={0}
  //   //               id="confirm-delete"
  //   //               variant="primary-solid"
  //   //               type="button"
  //   //               name="delete"
  //   //               className="px-5"
  //   //               title={t("commonConstants.proceed")}
  //   //               buttonText={t("commonConstants.proceed")}
  //   //               onClick={() => {
  //   //                 // handleDelete()
  //   //                 // if (setDeleted !== undefined) {
  //   //                 //   setDeleted(true)
  //   //                 // }
  //   //               }}
  //   //             />
  //   //           </Form>
  //   //           <Button
  //   //             tabIndex={0}
  //   //             type="button"
  //   //             id="cancel-delete-pop-up"
  //   //             variant="primary-outlined"
  //   //             className="px-5"
  //   //             title={t("commonConstants.cancel")}
  //   //             buttonText={t("commonConstants.cancel")}
  //   //             onClick={() => {
  //   //               if (setOpen !== undefined) setOpen(false)
  //   //             }}
  //   //           />
  //   //         </div>
  //   //       </>
  //   //     </DialogFooter>
  //   //   </>
  //   // </DialogWrapperNew>
  // )
}
