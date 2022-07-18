import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

export default function QuillEditor({
  onTextChange,
}: {
  onTextChange: (e: string) => void
}) {
  const { quill, quillRef } = useQuill()

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onTextChange(quill.root.innerHTML)
      })
    }
  }, [quill, onTextChange])

  return (
    <div className="flex h-full w-full flex-col" id="quillEditor">
      <div ref={quillRef} />
    </div>
  )
}
