import { useEffect, useRef } from 'react'
import { useQuill } from 'react-quilljs'
import BlotFormatter from 'quill-blot-formatter'
import hljs from 'highlight.js'

export default function QuillEditor({
  text,
  onTextChange,
  fullAccess,
  quillPlaceholder,
  id,
}: {
  text: string
  onTextChange: (e: string) => void
  fullAccess: boolean
  quillPlaceholder: string
  id: string
}) {
  hljs.configure({
    languages: ['javascript'],
  })
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
          ['code-block'],
          ['clean'],
        ],
        clipboard: {
          matchVisual: false,
        },
        blotFormatter: {},
      }
    : {
        toolbar: [['bold', 'italic', 'underline'], ['image'], ['code-block']],
        clipboard: {
          matchVisual: false,
        },
        blotFormatter: {},
      }
  const placeholder = `Write your ${quillPlaceholder} here....`
  let formats = [
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
    'code-block',
  ]
  const editorRef = useRef(null)
  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  })
  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter)
  }
  useEffect(() => {
    if (quill && text) {
      quill.clipboard.dangerouslyPasteHTML(text)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill])
  useEffect(() => {
    if (quill) {
      quill?.on('text-change', () => {
        onTextChange(quill.root.innerHTML)
      })
    }
  }, [quill, onTextChange])
  return (
    <div
      className="flex h-full w-full flex-col rounded-lg bg-white"
      id="quill-editor"
      ref={editorRef}
    >
      <div ref={quillRef} />
    </div>
  )
}
