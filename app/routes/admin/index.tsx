import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getUserId } from "~/session.server";

// throw redirect(`/admin/dashboard`);
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/admin/dashboard");
  return null;
};

export default function AdminHome() {
  return (
    <div className="flex h-screen items-center justify-center text-xl">
      Hello Admin
    </div>
  );
}
