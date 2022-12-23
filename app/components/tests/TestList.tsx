import { useActionData, useLoaderData, useSubmit } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Test, User } from '~/interface/Interface'
import { sortByOrder } from '~/interface/Interface'
import SortFilter from '../common-components/SortFilter'
import Button from '../common-components/Button'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import EmptyStateComponent from '../common-components/EmptyStateComponent'
import Table from '../common-components/TableComponent'
import ChipGroup from './ChipGroup'
import moment from 'moment'
import TestListActionMenu from '../TestListActionMenu'
import { Icon } from '@iconify/react'
import DeletePopUp from '../common-components/DeletePopUp'
import InviteCandidatePopup from './InviteCandidatePopup'
import { toast } from 'react-toastify'
const TestList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const submit = useSubmit()
  //loader and action data
  const testLoaderData = useLoaderData()
  const testActionData = useActionData()
  if (t(testLoaderData.status as string) != t('statusCheck.success')) {
    toast.warn(t('statusCheck.commonError'))
  }
  useEffect(() => {
    if (testActionData) {
      if (testActionData.resp?.statusCode === 200) {
        toast.success(t(testActionData.resp?.message))
      } else if (testActionData.errors?.statusCode === 400) {
        toast.error(t(testActionData.errors?.message), {
          toastId: testActionData.errors?.statusCode,
        })
      }
    }
  }, [testActionData, t])
  const tests = testLoaderData.tests
  //sort filter data
  const [sortDirection, onSortDirectionChange] = useState(
    sortByOrder.desc as string
  )

  const sortByDetails = [
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Created Date',
      value: 'createdAt',
    },
  ]
  const [sortBy, onSortChange] = useState(sortByDetails[1].value)

  useEffect(() => {
    let filter = {
      orderBy: {
        [sortBy]: sortDirection,
      },
    }
    submit({ data: JSON.stringify(filter) }, { method: 'get' })
    return () => {
      if (filter) {
        filter = {
          orderBy: {},
        }
      }
    }
  }, [sortDirection, sortBy, submit])
  const [testsCurrentPage, setTestsCurrentPage] = useState(
    testLoaderData.testsCurrentPage
  )
  const [testsPageSize, setTestsPageSize] = useState(5)
  const [candidatePopupOpen, setCandidatePopupOpen] = useState<boolean>(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    if (deleted === true) {
      setTimeout(() => {
        document.getElementById('1')?.focus()
        setDeleted(false)
      }, 500)
    }
  }, [deleted])
  // delete test function
  const deleteTest = (id: string) => {
    submit(
      {
        action: 'testDelete',
        id: id,
      },
      { method: 'post' }
    )
  }

  //render functions for table
  const SeriaLNoCell = (data: any, index: number) => {
    return <span>{index + 1}</span>
  }
  const TestDataCell = (data: Test) => {
    return (
      <span>
        <ChipGroup sections={data.sections} totalCount={data.sections.length} />
      </span>
    )
  }
  const CreatedByDataCell = (data: Test & { createdBy: User }) => {
    return (
      <span>
        {data?.createdBy?.firstName} {data?.createdBy?.lastName}
      </span>
    )
  }
  const JoinedOnCell = (data: Test) => {
    return <span>{moment(data?.createdAt).format('DD MMMM YY')}</span>
  }
  const TestInvite = (data: Test) => {
    return (
      <>
        <div className="flex">
          <Icon
            id="invite-popup-open"
            role={'button'}
            tabIndex={0}
            className="candidateInviteIcon mt-2 cursor-pointer text-2xl text-primary focus:outline-dotted focus:outline-2"
            icon={'ant-design:user-add-outlined'}
            onClick={() => {
              setCandidatePopupOpen(true)
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') setCandidatePopupOpen(true)
            }}
            aria-label={t('members.inviteMember')}
          />
          <TestListActionMenu
            menuIcon={'mdi:dots-vertical'}
            onItemClick={setShowDeletePopup}
            open={showDeletePopup}
            menuListIcon={'ic:outline-delete-outline'}
            menuListText={'Delete'}
            aria-label={t('testTableItem.menu')}
            id={data.id}
          />
        </div>
        <DeletePopUp
          setOpen={setShowDeletePopup}
          open={showDeletePopup}
          onDelete={() => deleteTest(data.id)}
          setDeleted={setDeleted}
          status={testLoaderData.status}
          deleteItem={data.name}
          deleteItemType={t('testsConstants.assessment')}
        />
        <InviteCandidatePopup
          openInvitePopup={candidatePopupOpen}
          setOpenInvitePopup={setCandidatePopupOpen}
          testName={data.name}
          testId={data.id}
        />
      </>
    )
  }
  const testsColumn = [
    { title: 'Sr.No', field: 'Sr_No', render: SeriaLNoCell, width: '10%' },
    { title: 'Assessment', field: 'name', width: '20%' },
    { title: 'Test', field: 'test', render: TestDataCell, width: '20%' },
    {
      title: 'Created On',
      field: 'createdAt',
      render: JoinedOnCell,
      width: '20%',
    },
    {
      title: 'Created By',
      field: 'createdAt',
      render: CreatedByDataCell,
      width: '20%',
    },
    { title: 'Action', field: 'action', render: TestInvite, width: '10%' },
  ]
  useEffect(() => {
    navigate(
      `?index=&data=%7B"orderBy"%3A%7B"createdAt"%3A"desc"%7D%7D&TestPage=${testsCurrentPage}&TestItems=${testsPageSize}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testsPageSize, testsCurrentPage])
  useEffect(() => {
    const heading = document.getElementById('assessments-page-title')
    heading?.focus()
  }, [])
  return (
    <div className="test-list-container flex h-full flex-col gap-6 p-1">
      {/* header */}
      {/* <BreadCrumb data={breadCrumbData} /> */}
      <header className="flex items-center justify-between">
        <h2
          id="assessments-page-title"
          tabIndex={0}
          role={t('testsConstants.assessments')}
          title={t('testsConstants.assessments')}
          className="text-3xl font-bold text-black"
        >
          {t('testsConstants.assessments')}
        </h2>
        <Button
          className="px-5"
          onClick={() =>
            navigate(
              `/${testLoaderData.currentWorkspaceId}${routes.addAssessment}`
            )
          }
          id="add-test"
          tabIndex={0}
          varient="primary-solid"
          title={t('testsConstants.addTestbutton')}
          aria-label={t('testsConstants.addTestbutton')}
          buttonText={`+ ${t('testsConstants.addTestbutton')}`}
        />
      </header>
      {tests.length > 0 ? (
        <>
          <div id="sort-filter-container">
            <SortFilter
              filterData={sortByDetails}
              sortDirection={sortDirection}
              onSortDirectionChange={onSortDirectionChange}
              sortBy={sortBy}
              onSortChange={onSortChange}
              totalItems={tests?.length}
              showSelected={false}
            />
          </div>
          <div className="flex flex-1 flex-col rounded-lg pb-6">
            <Table
              columns={testsColumn}
              data={tests}
              paginationEnabled={true}
              pageSize={testsPageSize}
              setPageSize={setTestsPageSize}
              currentPage={testsCurrentPage}
              onPageChange={setTestsCurrentPage}
              totalItems={testLoaderData.allTestsCount}
            />
          </div>
        </>
      ) : (
        <EmptyStateComponent />
      )}
    </div>
  )
}
export default TestList
