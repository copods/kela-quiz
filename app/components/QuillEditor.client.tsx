import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

export default function QuillEditor({ setData }: { setData: (e: string) => void }) {

  const { quill, quillRef } = useQuill()

  useEffect(() => {

    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setData(quill.root.innerHTML)
      });
    }

  }, [quill, setData])

  return (
    <div className='w-full h-56 helloQuill'>
      <div ref={quillRef} />
    </div>
  )
}