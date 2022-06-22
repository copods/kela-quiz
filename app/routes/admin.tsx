import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import SideNav from "~/components/SideNav/SideNav";

import { requireUserId } from "~/session.server";


export const loader: LoaderFunction = async ({ request }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userId = await requireUserId(request);
  return null
};


export default function NotesPage() {

  return (
    <main className="flex h-screen">
        <div className="w-2/12 bg-white min-w-260 p-6 drop-shadow-md">
            <SideNav />
        </div>
        <div className="bg-slate-50 flex-1 p-6">
            <Outlet />
        </div>
    </main>
  );
}
