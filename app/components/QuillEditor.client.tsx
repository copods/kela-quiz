import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

export default function QuillEditor({setData}: {setData: (e: string) => void}) {
   const theme = 'snow';
  // const theme = 'bubble';
  const modules= {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      //['bold', 'italic', 'underline'],
      [{ align: [] }],
  
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ indent: '-1'}, { indent: '+1' }],
  
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      //[{'header' : [1,2,3,4,5,6,false]}],
      ['link', 'image', 'video'],
      ['link', 'image'],
      [{ color: [] }, { background: [] }],
      //['image','code-block'],
  
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }
  const placeholder = 'Write your question here....';

  const formats = ['bold', 'italic', 'underline','strike'];

   const { quill, quillRef} = useQuill({ theme, modules, formats, placeholder})
  
  useEffect(() => {
    if(quill){
      console.log(quill);
    }
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        // console.log('Text change!');
        // console.log(quill.getText()); // Get text only
        // console.log(quill.getContents()); // Get delta contents
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        setData(quill.root.innerHTML)
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }

  }, [quill])
  console.log(quill)

  return (
    <div className='rounded-lg w-full h-full helloQuill'>
      <div ref={quillRef}  />
    </div>
  )
}