import InvalidLink from '../../../public/assets/invalidLink.svg'
import Logo from '~/components/Logo'

const InvalidLinkComponent = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-50">
      <div className="flex h-20 w-full flex-row items-center gap-3 bg-white px-5 shadow">
        <Logo height="40" />
        <span className="text-3xl font-bold text-gray-900">Quiz</span>
      </div>
      <div className="mt-[-80px] flex h-full w-full flex-col items-center justify-center gap-4">
        <img src={InvalidLink} alt="invalidLink" />
        <p className="text-5xl font-bold text-gray-900">Wrong Link</p>
      </div>
    </div>
  )
}

export default InvalidLinkComponent
