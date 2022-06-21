import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { Icon } from '@iconify/react';



export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return null
};


export default function NotesPage() {
  return (
    <main className="flex h-screen">
        <div className="w-2/12 bg-white min-w-260 p-6 drop-shadow-md">
            Sidenav
        </div>
        <div className="bg-slate-50 flex-1 p-6">
            <Outlet />
        </div>
    </main>
  );
}
