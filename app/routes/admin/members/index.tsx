import Member from "~/components/members/members";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import  { getAllUsers } from "~/models/user.server";

type LoaderData = {
  users: Awaited<ReturnType<typeof getAllUsers>>;
}
export const loader: LoaderFunction = async () => {
  const users = await getAllUsers();
  return json<LoaderData>({ users });
};
export default function NotesPage() {
  const data = useLoaderData() as LoaderData;
  return (
    <div>
      <Member />
      
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>
            <h1 >{user.firstName}</h1>
          </li>
        ))}
      </ul>



    </div>
  );
}
