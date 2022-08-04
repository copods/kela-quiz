import { useLoaderData } from '@remix-run/react'

function Question() {
  const questionDetail = useLoaderData()

  console.log('ss', questionDetail)

  return (
    <div className="flex">
      <div
        className="w-1/2"
        dangerouslySetInnerHTML={{ __html: questionDetail.question.question }}
      ></div>
      <div className="w-1/2">
        {questionDetail.question.options.map(
          (option: { id: string; option: string }) => {
            return <div key={option.id}>{option.option}</div>
          }
        )}
      </div>
    </div>
  )
}

export default Question
