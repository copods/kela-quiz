import logo from '~/../public/assets/logo.svg'

function CandidateSideNav({ candidate, candidateTest }: any) {
  return (
    <div className="flex h-full flex-col justify-between overflow-auto p-5">
      <div>
        <div className="mb-14 px-1">
          <div className="flex items-center gap-4">
            <img src={logo} alt="logo" width={'40px'} />
            <span className="text-3xl font-bold leading-9 text-gray-900">
              Assessment
            </span>
          </div>
        </div>
      </div>
      <div>Candidate Sidenav</div>
      <div className="justify-end">
        <div>
          <hr className="mb-3 mt-3 border border-solid border-gray-300"></hr>
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-medium leading-7 text-white">
                  {candidate.firstName.slice(0, 1)}
                  {candidate.lastName.slice(0, 1)}
                </span>
              </div>

              <div className="flex-col gap-2">
                <p className="w-full truncate text-xs font-semibold leading-4 text-gray-900">
                  {candidate.firstName} {candidate.lastName}
                </p>
                <p className="w-full truncate text-xs font-normal leading-4 text-gray-500">
                  {candidate.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateSideNav
