export default function CandidateLayout({
  children,
}: {
  children: JSX.Element
}) {
  return (
    <main className="flex max-h-screen min-h-screen">
      <div className="w-2/12 min-w-260 bg-gray-500  p-5 drop-shadow-md">
        Side Navigation..
      </div>
      <div className="flex-1 bg-slate-50 p-12">{children}</div>
    </main>
  )
}
