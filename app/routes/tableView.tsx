

// type LoaderData = {
//   users: Awaited<ReturnType<typeof getAllUsers>>;
// };
// export const loader: LoaderFunction = async () => {
//   const users = await getAllUsers();
//   return json<LoaderData>({ users });
// };

// export const loader:LoaderFunction = async () => {
//   return json<LoaderData>({
//     users: await getAllUsers(),
//   });
// };

// export const loader: LoaderFunction = async ({ request }) => {
//   const users = await getAllUsers();
//   return json<LoaderData>({ users });
// };

export default function TableView() {
 

  return (
    <div>
      {/* <ul>
        {data?.users.map((user) => (
          <li key={user.id}>
            <h1 >{user.firstName}</h1>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
