import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import BlotFormatter from 'quill-blot-formatter'

export default function QuillEditor({
  text,
  onTextChange,
}: {
  text: string
  onTextChange: (e: string) => void
}) {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  })
  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter)
  }
  useEffect(() => {
    if (quill && text) {
      quill.clipboard.dangerouslyPasteHTML(text)
    }
  }, [quill])

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
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
