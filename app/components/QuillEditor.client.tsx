import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

export default function QuillEditor({ onTextChange }: { onTextChange: (e: string) => void }) {

  const { quill, quillRef } = useQuill()

  useEffect(() => {

    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        onTextChange(quill.root.innerHTML)
      });
    }

  }, [quill, onTextChange])

  return (
    <div className='w-full h-56 helloQuill'>
      <div ref={quillRef} />
    </div>
  )
}