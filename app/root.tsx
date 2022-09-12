import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import tailwindStylesheetUrl from './styles/tailwind.css'
import globalStyles from './styles/global.css'
import quillEditorStyles from 'quill/dist/quill.snow.css'
import { getUser } from './session.server'
import toastrStyles from 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
    { rel: 'stylesheet', href: globalStyles },
    { rel: 'stylesheet', href: quillEditorStyles },
    { rel: 'stylesheet', href: toastrStyles },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'K-Quiz',
  viewport: 'width=device-width,initial-scale=1',
})

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  })
}

export default function App() {
  const { i18n } = useTranslation()

  return (
    <html lang={i18n.language} className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  )
}
