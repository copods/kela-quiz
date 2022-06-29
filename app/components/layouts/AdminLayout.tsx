import SideNav from "../side-nav/SideNav";

export default function AdminLayout({ children }: { children: JSX.Element }) {
  return (
    <main className="flex min-h-screen max-h-screen">
      <div className="w-2/12 bg-white min-w-260 p-5 drop-shadow-md">
        <SideNav />
      </div>
      <div className="bg-slate-50 flex-1 p-12">
        {children}
      </div>
    </main>
  )
}