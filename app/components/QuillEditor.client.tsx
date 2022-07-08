import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

export default function QuillEditor({ onTextChange, fullAccess, quillPlaceholder }: { onTextChange: (e: string) => void, fullAccess: boolean, quillPlaceholder: string }) {
  const theme = 'snow';
  const modules = fullAccess ? {
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
  }
    :
    {
      toolbar: [
        ['bold', 'italic', 'underline'],
      ],
      clipboard: {
        matchVisual: false,
      },
    }
  const placeholder = `Write your ${quillPlaceholder} here....`;
  var formats = ['bold', 'italic', 'underline', 'list', 'header', 'link', 'image', 'align', 'color', 'background'];

  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder })

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onTextChange(quill.root.innerHTML);
      });
    }

  }, [quill, onTextChange])

  return (
    <div className='rounded-lg w-full h-full helloQuill'>
      <div ref={quillRef} />
    </div>
  )
}