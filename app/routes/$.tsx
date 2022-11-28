import { useTranslation } from 'react-i18next'

import notFound from '../../public/assets/404.svg'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-24">
        <div className="mb-4">
          <img
            src={notFound}
            alt={t('404.notFound')}
            className="h-cooldownSVG w-cooldownSVG"
          />
        </div>
        <div className="text-center leading-8">
          <p className="text-2xl font-bold">That's an error.</p>
          <p className="text-2xl font-bold">
            The requested URL was not found on this server.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
