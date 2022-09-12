import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { json } from '@remix-run/node'
import {
  routeFiles,
  sectionsConstants,
  statusCheck,
} from '~/constants/common.constants'
import {
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData,
  useSubmit,
} from '@remix-run/react'
import {
  checkSectionById,
  createSection,
  deleteSectionById,
  getAllSections,
} from '~/models/sections.server'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { getUserId, requireUserId } from '~/session.server'
import Sections from '~/components/sections/Sections'
import AdminLayout from '~/components/layouts/AdminLayout'
import AddSection from '~/components/sections/AddSection'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from '~/components/form/Button'
import { sortByOrder } from '~/interface/Interface'
import type { Section } from '~/interface/Interface'
import { routes } from '~/constants/route.constants'

export type ActionData = {
  errors?: {
    title?: string
    body?: string
    status?: number
    check?: Date
    name?: string
    description?: string
  }
  resp?: {
    status?: string
    check?: Date
    title?: string
    data?: Section
  }
}

export type LoaderData = {
  sections: Awaited<ReturnType<typeof getAllSections>>
  selectedSectionId?: string
  filters: string
  status: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url).searchParams.entries()
  const obj = Object.fromEntries(url).filter
  let sections: Array<Section> = []
  let status: string = ''
  await getAllSections(obj)
    .then((res) => {
      sections = res as Section[]
      status = statusCheck.success
    })
    .catch((err) => {
      status = err
    })
  const userId = await getUserId(request)
  if (!userId) return redirect(routes.signIn)
  const selectedSectionId = params.sectionId
    ? params.sectionId?.toString()
    : undefined
  const filters = new URL(request.url).search
  return json<LoaderData>({ sections, selectedSectionId, filters, status })
}

export const action: ActionFunction = async ({ request }) => {
  const createdById = await requireUserId(request)
  const formData = await request.formData()
  const action = formData.get('add-section')
    ? formData.get('add-section')
    : formData.get('deleteSection')
  if (action === 'add') {
    const name = formData.get('name')
    const description = formData.get('description')
    if (typeof name !== 'string' || name.length === 0) {
      return json<ActionData>(
        { errors: { title: statusCheck.nameIsReq, status: 400 } },
        { status: 400 }
      )
    }
    if (typeof description !== 'string' || description.length === 0) {
      return json<ActionData>(
        { errors: { title: statusCheck.descIsReq, status: 400 } },
        { status: 400 }
      )
    }

    let addHandle = null
    await createSection({ name, description, createdById })
      .then((res) => {
        addHandle = json<ActionData>(
          {
            resp: {
              status: statusCheck.sectionAddedSuccess,
              data: res as Section,
              check: new Date(),
            },
          },
          { status: 200 }
        )
      })

      .catch((err) => {
        let title = statusCheck.commonError
        if (err.code === 'P2002') {
          title = statusCheck.duplicate
        }
        addHandle = json<ActionData>(
          { errors: { title, status: 400, check: new Date() } },
          { status: 400 }
        )
      })

    return addHandle
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
        let title = statusCheck.testDependentWarning
        deleteHandle = json<ActionData>(
          { errors: { title, status: 400, check: new Date() } },
          { status: 400 }
        )
      }
    })

    if (isSectionDelete) {
      await deleteSectionById(formData.get('id') as string)
        .then((res) => {
          deleteHandle = json<ActionData>(
            { resp: { status: statusCheck.deletedSuccess } },

            { status: 200 }
          )
        })
        .catch((err) => {
          let title = statusCheck.commonError
          deleteHandle = json<ActionData>(
            { errors: { title, status: 400, check: new Date() } },
            { status: 400 }
          )
        })
    }
    return deleteHandle
  }
}

export default function SectionPage() {
  const data = useLoaderData() as unknown as LoaderData

  const fetcher = useFetcher()
  const sectionActionData = useActionData() as ActionData

  let navigate = useNavigate()
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
  const [order, setOrder] = useState(sortByOrder.ascending as string)
  const [sortBy, setSortBy] = useState(sortByDetails[1].value)
  const [selectedSection, setSelectedSection] = useState(
    data.selectedSectionId || data.sections[0]?.id || 'NA'
  )

  if (data.status != statusCheck.success) {
    toast.error(statusCheck.commonError)
  }

  useEffect(() => {
    if (selectedSection === 'NA') {
      navigate(routes.sections, {
        replace: true,
      })
    } else {
      navigate(`${routes.sections}/${selectedSection}${data?.filters}`, {
        replace: true,
      })
    }
  }, [navigate, selectedSection])

  useEffect(() => {
    if (data.sections.length) {
      const formData = new FormData()
      let filter = {
        orderBy: {
          [sortBy]: order,
        },
      }
      fetcher.submit({ filter: JSON.stringify(filter) }, { method: 'get' })
      formData.append('filter', JSON.stringify(filter))
      submit(formData, {
        method: 'get',
        action: `${routes.sections}/${selectedSection}`,
      })
    }
  }, [order, sortBy])

  useEffect(() => {
    if (sectionActionData) {
      if (sectionActionData.resp?.status === statusCheck.sectionAddedSuccess) {
        setShowAddSectionModal(false)
        toast.success(sectionActionData.resp?.status)
        setSelectedSection(sectionActionData?.resp?.data?.id as string)
      } else if (
        sectionActionData.resp?.status === statusCheck.deletedSuccess
      ) {
        toast.success(sectionActionData.resp?.status, {
          toastId: sectionActionData.resp?.status,
        })
        setSelectedSection(
          data.selectedSectionId || data.sections[0]?.id || 'NA'
        )
      } else if (sectionActionData.errors?.status === 400) {
        toast.error(sectionActionData.errors?.title, {
          toastId: sectionActionData.errors?.title,
        })
      }
    }
  }, [sectionActionData, data.selectedSectionId])

  return (
    <AdminLayout>
      <div className="flex h-full flex-col gap-6 overflow-hidden p-1">
        {/* header */}
        <header className="flex items-start justify-between">
          <h2
            className="text-3xl font-bold text-black"
            tabIndex={0}
            role={routeFiles.sections}
            title={routeFiles.sections}
            aria-label={routeFiles.sections}
          >
            {routeFiles.sections}
          </h2>
          <Button
            id="add-section"
            data-cy="submit"
            className="h-9 px-5"
            varient="primary-solid"
            onClick={() => setShowAddSectionModal(!showAddSectionModal)}
            title={sectionsConstants.addSection}
            buttonText={`+ ${sectionsConstants.addSection}`}
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
                  if (e.key === 'Enter')
                    setSectionDetailFull(!sectionDetailFull)
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
            {sectionsConstants.noRecordFound}
          </div>
        )}
        <AddSection
          open={showAddSectionModal}
          setOpen={setShowAddSectionModal}
          showErrorMessage={sectionActionData?.errors?.status === 400}
        />
      </div>
    </AdminLayout>
  )
}
