import CandidateSideNav from '../side-nav/CandidateSideNav'

export default function CandidateLayout({
  children,
}: {
  children: JSX.Element
}) {
  return (
    <main className="flex max-h-screen min-h-screen">
      <div className="w-2/12 min-w-301   ">
        <CandidateSideNav />
      </div>
      <div className="flex-1 bg-slate-50 p-12">{children}</div>
    </main>
  )
}
