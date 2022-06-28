import { Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import SideNav from "~/components/side-nav/SideNav";

import { requireUserId } from "~/session.server";


export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return null
};


export default function NotesPage() {
  return (
    <main className="flex min-h-screen">
        <div className="w-2/12 bg-white min-w-260 p-5 drop-shadow-md">
            <SideNav />
        </div>
        <div className="bg-slate-50 flex-1 p-6">
            <Outlet />
        </div>
    </main>
  )
}
