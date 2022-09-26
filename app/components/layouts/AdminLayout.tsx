import SideNav from '../side-nav/SideNav'
export default function AdminLayout({ children }: { children: JSX.Element }) {
  return (
    <main className="flex max-h-screen min-h-screen">
      <div className="w-2/12 min-w-260 bg-white drop-shadow-md">
        <SideNav />
      </div>
      <div
        className="flex-1 overflow-auto bg-slate-50 p-5"
        id="add-question-section"
      >
        {children}
      </div>
    </main>
  )
}
