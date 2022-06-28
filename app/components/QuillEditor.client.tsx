import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'

export default function QuillEditor({setData}: {setData: (e: string) => void}) {
  // const theme = 'snow';
  // // const theme = 'bubble';
  // const modules= {
  //   toolbar: [
  //     ['bold', 'italic', 'underline', 'strike'],
  //     [{ align: [] }],
  
  //     [{ list: 'ordered'}, { list: 'bullet' }],
  //     [{ indent: '-1'}, { indent: '+1' }],
  
  //     [{ size: ['small', false, 'large', 'huge'] }],
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ['link', 'image', 'video'],
  //     [{ color: [] }, { background: [] }],
  
  //     ['clean'],
  //   ],
  //   clipboard: {
  //     matchVisual: false,
  //   },
  // }
  // const placeholder = 'Write your question here....';

  // const formats = ['bold', 'italic', 'underline', 'strike'];

  // const { quill, quillRef} = useQuill({theme, modules, formats, placeholder})
  const { quill, quillRef} = useQuill()


  // image upload to server
  // // Insert Image(selected by user) to quill
  // const insertToEditor = (url) => {
  //   const range = quill.getSelection();
  //   quill.insertEmbed(range.index, 'image', url);
  // };

  // // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  // const saveToServer = async (file) => {
  //   const body = new FormData();
  //   body.append('file', file);
  //   console.log(file)

  //   const res = await fetch('Your Image Server URL', { method: 'POST', body });
  //   insertToEditor(res.uploadedImageUrl);
  // };

  // // Open Dialog to select Image File
  // const selectLocalImage = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.onchange = () => {
  //     const file = input.files[0];
  //     saveToServer(file);
  //   };
  // };

  useEffect(() => {
    // if (quill && defaultValue && quillRef) {
    //   quill.clipboard.dangerouslyPasteHTML(defaultValue)
    // }
    // if (quill) {
    //   // Add custom handler for Image Upload
    //   // quill.getModule('toolbar').addHandler('image', selectLocalImage);
    // }
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

  return (
    <div className='w-full h-56'>
      <div ref={quillRef}  />
    </div>
  )
}