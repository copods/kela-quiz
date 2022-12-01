import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const BreadCrumb = ({
  data,
}: {
  data: Array<{ tabName: string; route: string }>
}) => {
  const { t } = useTranslation()
  return (
    <div className="flex">
      {data.map((breadCrumb, i) => {
        return (
          <div
            key={breadCrumb.route}
            className={`flex px-1 text-sm font-medium ${
              breadCrumb.route ? 'text-primary' : 'text-gray-400'
            }`}
            title={t(breadCrumb.tabName)}
          >
            <Link
              tabIndex={0}
              to={breadCrumb.route}
              className="cursor-pointer"
              id={t(breadCrumb.tabName)}
              title={t(breadCrumb.tabName)}
              aria-label={t(breadCrumb.tabName)}
            >
              {t(breadCrumb.tabName)}
            </Link>
            {i != data.length - 1 && (
              <Icon
                icon="ic:round-keyboard-arrow-right"
                className="text-xl text-gray-500 "
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default BreadCrumb
