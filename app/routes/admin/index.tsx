import { Outlet } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
  } from "@remix-run/node";
import { getUserId } from "~/session.server";
import { json } from "stream/consumers";

// throw redirect(`/admin/dashboard`);
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request);
    if (userId) return redirect("/admin/dashboard");
    return null
  };

export default function NotesPage() {

  return (
    <div className="flex items-center justify-center h-screen text-xl">
          Hello Admin
    </div>
  );
}
