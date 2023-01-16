import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import {
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react'
import {
  createSection,
  deleteSectionById,
  editSectionById,
  getFirstSectionIdOfPreviousPage,
  getAllTestsCounts,
} from '~/models/sections.server'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { getUserId, requireUserId } from '~/session.server'
import Sections from '~/components/sections/Sections'
import type { sectionActionErrorsType } from '~/interface/Interface'
import AddEditSection from '~/components/sections/AddEditSection'
import { toast } from 'react-toastify'
import Button from '~/components/common-components/Button'
import { sortByOrder } from '~/interface/Interface'
import type { Section } from '~/interface/Interface'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import { getUserWorkspaces } from '~/models/workspace.server'
import EmptyStateComponent from '~/components/common-components/EmptyStateComponent'
import { getAllSectionsData } from '~/components/sections/tests.helper'

export type ActionData = {
  errors?: {
    title?: string
    body?: string
    status?: number
    check?: Date
    name?: string
    description?: string
  }
  createSectionFieldError?: sectionActionErrorsType
  resp?: {
    status?: string
    check?: Date
    title?: string
    data?: Section
    id?: string
  }
}

export type LoaderData = {
  sections: Section[]
  selectedSectionId?: string
  filters: string
  status: string
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
  testCurrentPage: number
  testItemsPerPage: number
  getAllTestsCount: number
  lastSectionId: Awaited<ReturnType<typeof getFirstSectionIdOfPreviousPage>>
}
const handleAddSection = async (
  name: string,
  description: string,
  createdById: string,
  workspaceId: string
) => {
  if (typeof name !== 'string' || name.length === 0) {
    return json<ActionData>(
      { errors: { title: 'statusCheck.nameIsReq', status: 400 } },
      { status: 400 }
    )
  }
  if (typeof description !== 'string' || description.length === 0) {
    return json<ActionData>(
      { errors: { title: 'statusCheck.descIsReq', status: 400 } },
      { status: 400 }
    )
  }

  let addHandle = null
  await createSection({ name, description, createdById, workspaceId })
    .then((res) => {
      addHandle = json<ActionData>(
        {
          resp: {
            status: 'statusCheck.testAddedSuccess',
            data: res as unknown as Section,
            check: new Date(),
          },
        },
        { status: 200 }
      )
    })

    .catch((err) => {
      let title = 'statusCheck.commonError'
      if (err.code === 'P2002') {
        title = 'statusCheck.duplicate'
      }
      addHandle = json<ActionData>(
        { errors: { title, status: 400, check: new Date() } },
        { status: 400 }
      )
    })

  return addHandle
}
const handleEditSection = async (
  name: string,
  description: string,
  id: string
) => {
  if (typeof name !== 'string' || name.length === 0) {
    return json<ActionData>(
      { errors: { title: 'statusCheck.nameIsReq', status: 400 } },
      { status: 400 }
    )
  }
  if (typeof description !== 'string' || description.length === 0) {
    return json<ActionData>(
      { errors: { title: 'statusCheck.descIsReq', status: 400 } },
      { status: 400 }
    )
  }

  let editHandle = null
  await editSectionById(id, name, description)
    .then((res) => {
      editHandle = json<ActionData>(
        {
          resp: {
            status: 'statusCheck.testUpdatedSuccess',
            data: res as unknown as Section,
          },
        },
        { status: 200 }
      )
    })

    .catch((err) => {
      let title = 'statusCheck.commonError'
      if (err.code === 'P2002') {
        title = 'statusCheck.duplicate'
      }
      editHandle = json<ActionData>(
        { errors: { title, status: 400, check: new Date() } },
        { status: 400 }
      )
    })

  return editHandle
}
export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    // taking search params from URL
    const query = new URL(request.url).searchParams
    // taking number of items per page and current page number from query
    const testItemsPerPage = Math.max(Number(query.get('testItems') || 5), 5) //To set the lower bound, so that minimum count will always be 1 for current page and 5 for items per page.
    const testCurrentPage = Math.max(Number(query.get('testPage') || 1), 1)
    // taking sortBy and order
    const sortBy = query.get('sortBy')
    const sortOrder = query.get('sort')
    const userId = await getUserId(request)
    const currentWorkspaceId = params.workspaceId as string
    const workspaces = await getUserWorkspaces(userId as string)

    let sections: Array<Section> = []
    let status: string = ''
    let callBack = (sectionUpdate: Section[], statusUpdate: string) => {
      sections = sectionUpdate
      status = statusUpdate
    }
    // import function from helper which return number of sections based on
    // sort : sortBy ('name' / 'Created Date')
    // PaginationData : current page number (testCurrentPage) and number of items per page(testItemsPerPage)
    await getAllSectionsData(
      sortBy,
      sortOrder,
      currentWorkspaceId as string,
      testCurrentPage,
      testItemsPerPage,
      callBack
    )
    const selectedSectionId = params.sectionId
      ? params.sectionId?.toString()
      : undefined
    const getAllTestsCount = await getAllTestsCounts(currentWorkspaceId)
    // taking sectionId of PREVIOUS page (useCase: if there's only single test on perticular
    // page and user delete this , navigate to previous page and select the first card)
    const lastSectionId = await getFirstSectionIdOfPreviousPage(
      currentWorkspaceId as string,
      testCurrentPage,
      testItemsPerPage
    )
    if (!userId) return redirect(routes.signIn)
    const filters = `?sortBy=${sortBy}&sort=${sortOrder}&testPage=${testCurrentPage}&testItems=${testItemsPerPage}`
    return json<LoaderData>({
      sections,
      selectedSectionId,
      filters,
      status,
      workspaces,
      currentWorkspaceId,
      testCurrentPage,
      testItemsPerPage,
      getAllTestsCount,
      lastSectionId,
    })
  } catch (err) {
    console.log(err)
  }
}
const validateTitle = (title: string) => {
  if (typeof title !== 'string' || title.length <= 0) {
    return 'statusCheck.nameIsReq'
  }
}

const validateDescription = (description: string) => {
  if (typeof description !== 'string' || description.length <= 0) {
    return 'statusCheck.descIsReq'
  }
}
export const action: ActionFunction = async ({ request, params }) => {
  const createdById = await requireUserId(request)
  const workspaceId = params.workspaceId as string
  const formData = await request.formData()
  const action =
    formData.get('addSection') ||
    formData.get('editSection') ||
    formData.get('deleteSection')

  if (action === 'sectionAdd') {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const createSectionFieldError = {
      title: validateTitle(name),
      description: validateDescription(description),
    }

    if (Object.values(createSectionFieldError).some(Boolean)) {
      return json({ createSectionFieldError }, { status: 400 })
    }
    const response = await handleAddSection(
      name,
      description,
      createdById,
      workspaceId
    )
    return response
  }
  if (action === 'sectionEdit') {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const id = formData.get('id') as string
    const createSectionFieldError = {
      title: validateTitle(name),
      description: validateDescription(description),
    }
    if (Object.values(createSectionFieldError).some(Boolean)) {
      return json({ createSectionFieldError }, { status: 400 })
    }
    const response = await handleEditSection(name, description, id)
    return response
  }

  if (action === 'sectionDelete') {
    const deleteSectionId = formData.get('id') as string
    const deleteHandle = await deleteSectionById(deleteSectionId)
      .then((res) => {
        return json<ActionData>(
          {
            resp: {
              status: 'statusCheck.deletedSuccess',
              id: deleteSectionId,
            },
          },

          { status: 200 }
        )
      })
      .catch((err) => {
        return json<ActionData>(
          {
            errors: {
              title: 'statusCheck.commonError',
              status: 400,
              check: new Date(),
            },
          },
          { status: 400 }
        )
      })

    return deleteHandle
  }
  return 'ok'
}

export default function SectionPage() {
  const data = useLoaderData() as unknown as LoaderData
  const { t } = useTranslation()
  const sectionActionData = useActionData() as ActionData
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

  const [sectionDetailFull, setSectionDetailFull] = useState(false)
  const [showAddSectionModal, setShowAddSectionModal] = useState(false)
  const [order, setOrder] = useState(sortByOrder.desc as string)
  const [sortBy, setSortBy] = useState(sortByDetails[1].value)
  const [sectionActionErrors, setSectionActionErrors] = useState({
    title: '',
    description: '',
  })
  const [selectedSection, setSelectedSection] = useState(
    data.selectedSectionId || data.sections[0]?.id || 'NA'
  )
  const [testsPageSize, setTestPageSize] = useState(5)
  const [testsCurrentPage, setTestsCurrentPage] = useState(data.testCurrentPage)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    setTestsCurrentPage(data.testCurrentPage)
  }, [data.testCurrentPage])
  if (t(data.status) != t('statusCheck.success')) {
    toast.error(t('statusCheck.commonError'))
  }

  useEffect(() => {
    if (sectionActionData) {
      if (
        t(sectionActionData.resp?.status as string) ===
        t('statusCheck.testAddedSuccess')
      ) {
        setSectionActionErrors({ title: '', description: '' })
        setShowAddSectionModal(false)
        setSelectedSection((previous: string) => {
          if (previous != sectionActionData?.resp?.data?.id)
            toast.success(t(sectionActionData.resp?.status as string))
          return sectionActionData?.resp?.data?.id as string
        })
      } else if (
        t(sectionActionData.resp?.status as string) ===
        t('statusCheck.testUpdatedSuccess')
      ) {
        toast.success(t(sectionActionData.resp?.status as string), {
          toastId: t(sectionActionData.resp?.status as string),
        })
        navigate(`${location.pathname}${location.search}`)
      } else if (
        t(sectionActionData.resp?.status as string) ===
        t('statusCheck.deletedSuccess')
      ) {
        toast.success(t(sectionActionData.resp?.status as string), {
          toastId: t(sectionActionData.resp?.status as string),
        })
      } else if (sectionActionData.createSectionFieldError) {
        setSectionActionErrors({
          title: sectionActionData?.createSectionFieldError.title || '',
          description:
            sectionActionData.createSectionFieldError.description || '',
        })
      }
    }
  }, [sectionActionData, data.selectedSectionId, data.sections, t, navigate])
  useEffect(() => {
    //checking if tests are zero then redirect to /tests
    if (data.getAllTestsCount === 0) {
      navigate(`/${data.currentWorkspaceId}${routes.tests}`)
    } else if (
      //checking if there is an no data for that page then redirect to the previous page
      data.getAllTestsCount <=
        testsCurrentPage * testsPageSize - testsPageSize &&
      testsCurrentPage > 1
    ) {
      navigate(
        `/${data.currentWorkspaceId}${routes.tests}/${
          data.lastSectionId?.id
        }?sortBy=${sortBy}&sort=${order}&testPage=${
          testsCurrentPage - 1
        }&testItems=${testsPageSize}`
      )
    } else if (
      // checking if new test added && total count of tests are not zero or data is present for present page
      // navigate to given path
      (data.getAllTestsCount > 0 &&
        t(sectionActionData?.resp?.status as string) ===
          t('statusCheck.testAddedSuccess')) ||
      data.sections.length >= 0
    ) {
      navigate(
        `/${data.currentWorkspaceId}${routes.tests}/${data.sections[0]?.id}?sortBy=${sortBy}&sort=${order}&testPage=${testsCurrentPage}&testItems=${testsPageSize}`
      )
    }
  }, [
    testsCurrentPage,
    testsPageSize,
    sortBy,
    order,
    data.lastSectionId?.id,
    t,
    data.getAllTestsCount,
    data.sections[0].id,
  ])

  useEffect(() => {
    const heading = document.getElementById('tests-heading')
    heading?.focus()
  }, [])
  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden p-1">
      {/* header */}
      <header className="flex items-start justify-between">
        <h2
          className="text-3xl font-bold text-black"
          id="tests-heading"
          tabIndex={0}
          role={t('routeFiles.tests')}
          title={t('routeFiles.tests')}
          aria-label={t('routeFiles.tests')}
        >
          {t('routeFiles.tests')}
        </h2>
        <Button
          id="add-section"
          data-cy="submit"
          className="h-9 px-5"
          variant="primary-solid"
          onClick={() => setShowAddSectionModal(!showAddSectionModal)}
          title={t('sectionsConstants.addTests')}
          buttonText={`+ ${t('sectionsConstants.addTests')}`}
        />
      </header>
      {data.sections.length > 0 ? (
        <div
          className={`flex flex-1 overflow-hidden ${
            sectionDetailFull ? '' : 'gap-5'
          }`}
        >
          {/* section list */}
          <div className={`${sectionDetailFull ? 'hidden' : ''}`}>
            <Sections
              sections={data.sections as Section[]}
              selectedSection={selectedSection}
              filters={data.filters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              order={order}
              setOrder={setOrder}
              setSelectedSection={setSelectedSection}
              sortByDetails={sortByDetails}
              currentWorkspaceId={data.currentWorkspaceId as string}
              sectionActionErrors={sectionActionErrors}
              setSectionActionErrors={setSectionActionErrors}
              testCurrentPage={data.testCurrentPage}
              testCurrentItems={data.testCurrentPage}
              totalCount={data.getAllTestsCount}
              testsPageSize={testsPageSize}
              testsCurrentPage={testsCurrentPage}
              setTestPageSize={setTestPageSize}
              setTestsCurrentPage={setTestsCurrentPage}
            />
          </div>
          {/* section details */}
          <div className={`z-10 flex flex-1 items-center `}>
            <span
              className="z-20 -mr-5"
              tabIndex={0}
              role={'button'}
              onClick={() => setSectionDetailFull(!sectionDetailFull)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') setSectionDetailFull(!sectionDetailFull)
              }}
            >
              {sectionDetailFull ? (
                <Icon
                  icon={'akar-icons:circle-chevron-right-fill'}
                  className="cursor-pointer text-4xl text-primary"
                />
              ) : (
                <Icon
                  icon={'akar-icons:circle-chevron-left-fill'}
                  className="cursor-pointer text-4xl text-primary"
                />
              )}
            </span>
            <Outlet />
          </div>
        </div>
      ) : (
        <EmptyStateComponent />
      )}
      <AddEditSection
        open={showAddSectionModal}
        sectionActionErrors={sectionActionErrors}
        setSectionActionErrors={setSectionActionErrors}
        setOpen={setShowAddSectionModal}
        showErrorMessage={sectionActionData?.errors?.status === 400}
      />
    </div>
  )
}
