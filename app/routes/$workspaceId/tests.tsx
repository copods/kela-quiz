import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import {
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from '@remix-run/react'
import {
  checkSectionById,
  createSection,
  deleteSectionById,
  editSectionById,
  getAllSections,
} from '~/models/sections.server'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { getUserId, requireUserId } from '~/session.server'
import Sections from '~/components/sections/Sections'
import type { sectionActionErrorsType } from '~/interface/Interface'
import AddEditSection from '~/components/sections/AddEditSection'
import { toast } from 'react-toastify'
import Button from '~/components/form/Button'
import { sortByOrder } from '~/interface/Interface'
import type { Section } from '~/interface/Interface'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'
import { getUserWorkspaces } from '~/models/workspace.server'

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
  sections: Awaited<ReturnType<typeof getAllSections>>
  selectedSectionId?: string
  filters: string
  status: string
  workspaces: Awaited<ReturnType<typeof getUserWorkspaces>>
  currentWorkspaceId: string
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
            data: res as Section,
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
            data: res as Section,
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
  const userId = await getUserId(request)
  const currentWorkspaceId = params.workspaceId as string
  const workspaces = await getUserWorkspaces(userId as string)
  const url = new URL(request.url).searchParams.entries()
  const filterData = Object.fromEntries(url).filter
  const selectedSectionId = params.sectionId
    ? params.sectionId?.toString()
    : undefined

  let sections: Array<Section> = []
  let status: string = ''
  await getAllSections(filterData, currentWorkspaceId as string)
    .then((res) => {
      sections = res as Section[]
      status = 'statusCheck.success'
    })
    .catch((err) => {
      status = err
    })
  if (!userId) return redirect(routes.signIn)
  const filters = new URL(request.url).search
  return json<LoaderData>({
    sections,
    selectedSectionId,
    filters,
    status,
    workspaces,
    currentWorkspaceId,
  })
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

  let deleteHandle = null
  let isSectionDelete = false
  let isTestDeleted: Array<boolean> | undefined
  if (action === 'sectionDelete') {
    await checkSectionById(formData.get('id') as string).then((res) => {
      if (res?._count.sectionInTest !== 0) {
        isTestDeleted = res?.sectionInTest?.map((e) => {
          return e.test.deleted
        })
      }
      if (res?._count.sectionInTest === 0 || isTestDeleted?.includes(true)) {
        isSectionDelete = true
      } else {
        deleteHandle = json<ActionData>(
          {
            errors: {
              title: 'statusCheck.testDependentWarning',
              status: 400,
              check: new Date(),
            },
          },
          { status: 400 }
        )
      }
    })

    if (isSectionDelete) {
      const deleteSectionId = formData.get('id') as string
      await deleteSectionById(deleteSectionId)
        .then((res) => {
          deleteHandle = json<ActionData>(
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
          deleteHandle = json<ActionData>(
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
    }
    return deleteHandle
  }
  return 'ok'
}

export default function SectionPage() {
  const data = useLoaderData() as unknown as LoaderData

  const { t } = useTranslation()
  const sectionActionData = useActionData() as ActionData
  const submit = useSubmit()
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
  const location = useLocation()
  const navigate = useNavigate()

  if (t(data.status) != t('statusCheck.success')) {
    toast.error(t('statusCheck.commonError'))
  }

  useEffect(() => {
    if (data.sections.length) {
      const formData = new FormData()
      let filter = {
        orderBy: {
          [sortBy]: order,
        },
      }

      formData.append('filter', JSON.stringify(filter))
      submit(formData, {
        method: 'get',
        action: `/${data.currentWorkspaceId}${routes.tests}/${selectedSection}`,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, sortBy, data.sections?.length])
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

        setSelectedSection(
          (sectionActionData?.resp?.id === data.sections[0]?.id
            ? data.sections[1]?.id
            : data.sections[0]?.id) || 'NA'
        )
      } else if (sectionActionData.createSectionFieldError) {
        setSectionActionErrors({
          title: sectionActionData?.createSectionFieldError.title || '',
          description:
            sectionActionData.createSectionFieldError.description || '',
        })
      }
    }
  }, [
    sectionActionData,
    data.selectedSectionId,
    data.sections,
    t,
    location,
    navigate,
  ])

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
          varient="primary-solid"
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
        <div className="p-7 text-center">
          {t('sectionsConstants.noRecordFound')}
        </div>
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
