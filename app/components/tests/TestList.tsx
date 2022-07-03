import type { Test } from "@prisma/client"
import { Link } from "react-router-dom"

const TestList = ({ tests }: { tests: Array<Test> }) => {
  return (
    <div className="flex flex-col gap-6 h-full overflow-hidden">
      {/* header */}
      <header className="flex justify-between items-center">
        <h2 title="Tests" className="text-3xl font-bold text-black">Tests</h2>
        <Link to={'/tests/add-test'}>
          <button className="px-5 h-9 text-[#F0FDF4] bg-primary rounded-lg text-xs" >+ Add Test</button>
        </Link>
      </header>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {
          tests.map((test, i) => {
            return (
              <div className="mb-4" key={test.id}>{i + 1}. {test.name}</div>
            )
          })
        }
      </div>
    </div>
  )
}

export default TestList