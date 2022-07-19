import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import BlotFormatter from 'quill-blot-formatter'

export default function QuillEditor({
  onTextChange,
  fullAccess,
  quillPlaceholder,
}: {
  onTextChange: (e: string) => void
  fullAccess: boolean
  quillPlaceholder: string
}) {
  const theme = 'snow'
  const modules = fullAccess
    ? {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['link', 'image'],
          [{ color: [] }, { background: [] }],

          ['clean'],
        ],
        clipboard: {
          matchVisual: false,
        },
        blotFormatter: {},
      }
    : {
        toolbar: [['bold', 'italic', 'underline']],
        clipboard: {
          matchVisual: false,
        },
        blotFormatter: {},
      }
  const placeholder = `Write your ${quillPlaceholder} here....`
  var formats = [
    'bold',
    'italic',
    'underline',
    'list',
    'header',
    'link',
    'image',
    'align',
    'color',
    'background',
  ]

  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  })
  // const { quill, quillRef, Quill } = useQuill({
  //   modules: { blotFormatter: {} },
  // })

  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter)
  }
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onTextChange(quill.root.innerHTML)
      })
    }
  }, [quill, onTextChange])

  return (
    <div className="h-full w-full rounded-lg bg-white" id="quillEditor">
      <div ref={quillRef} />
    </div>
  )
}
