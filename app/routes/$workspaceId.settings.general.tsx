import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"

import GeneralSettings from "~/components/settings/GeneralSettings"
import { routes } from "~/constants/route.constants"
import { getUserId } from "~/session.server"

export type ActionData = {
    errors?: {
        status?: number
        valid?: string
        passNotMatched?: string
        maximumPasswordLimit?: string
        passShouldNotBeSame?: string
        error?: string
    }
    resp?: {
        title: string
        status: number
    }
}

type LoaderData = {
    userId: Awaited<ReturnType<typeof getUserId>>
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request)
    if (!userId) return redirect(routes.signIn)

    return json<LoaderData>({ userId })
}

export const action: ActionFunction = async ({ request }) => { }
const GeneralSetting = () => {
    return (
        <div>
            <GeneralSettings />
        </div>
    )
}
export default GeneralSetting
