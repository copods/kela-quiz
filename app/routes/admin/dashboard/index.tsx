import { useOptionalUser } from "~/utils"

export default function Dashboard() {
  const user = useOptionalUser();
  return <div>Dashboard Works...!</div>
}
