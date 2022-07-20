import { useEffect, useRef } from 'react'
import { useQuill } from 'react-quilljs'
import BlotFormatter from 'quill-blot-formatter'

export default function QuillEditor({
  onTextChange,
  fullAccess,
  quillPlaceholder,
  id,
}: {
  onTextChange: (e: string) => void
  fullAccess: boolean
  quillPlaceholder: string
  id: string
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

  const editorRef = useRef(null)
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
    if (quill) onTextChange(quill?.root?.innerHTML)

    quill?.on('text-change', () => {
      if (quill && document.activeElement?.parentNode === quillRef.current) {
        console.log('//////', id)
        onTextChange(quill.root.innerHTML)
      }
    })
  }, [quill, onTextChange, id, quillRef])

  useEffect(() => {
    console.log('ok', document.activeElement?.parentNode === quillRef.current)

    // if (quill && document.activeElement?.parentNode === quillRef.current) {
    //   console.log('aa gye', quill)

    //   quill?.on('text-change', () => {
    //     console.log(2)
    //     onTextChange(quill.root.innerHTML)
    //   })
    // }
    // if (quill) {
    //   console.log('aa gye', quill)

    //   quill?.on('text-change', () => {
    //     console.log(2)
    //     if (document.activeElement?.parentNode === quillRef.current) {
    //       onTextChange(quill.root.innerHTML)
    //       console.log('done')
    //     }
    //   })
    // }

    // quill?.on('text-change', () => {
    //   console.log(123)
    //   onTextChange(quill.root.innerHTML)
    // })
  }, [quill, onTextChange, id, quillRef])

  return (
    <div
      className="h-full w-full rounded-lg bg-white"
      id="quillEditor"
      ref={editorRef}
    >
      <div ref={quillRef} />
    </div>
  )
}
