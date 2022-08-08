import { useLoaderData } from '@remix-run/react'

function Question() {
  const { question, candidateTest } = useLoaderData()
  console.log('aa', candidateTest)
  return (
    <form method="post" className="flex flex-wrap">
      <div
        className="w-1/2"
        dangerouslySetInnerHTML={{ __html: question.question.question }}
      ></div>
      <div className="w-1/2">
        {question.question.options.map(
          (option: { id: string; option: string }) => {
            return <div key={option.id}>{option.option}</div>
          }
        )}
      </div>
      <div className="flex w-full justify-end gap-8">
        <button
          name="previous"
          value="prev"
          type="submit"
          className="rounded bg-primary px-7 py-2 text-white"
        >
          Prev
        </button>
        <button
          name="next"
          value="next"
          type="submit"
          className="rounded bg-primary px-7 py-2 text-white"
        >
          Next
        </button>
      </div>
    </form>
  )
}

export default Question
