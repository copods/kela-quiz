import Editor from "react-simple-code-editor"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism.css" //Example style, you can use another
// eslint-disable-next-line import/order
import { highlight, languages } from "prismjs"

const CodeEditor = ({ code, setCode }: any) => {
  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages.js, "")}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
      className="border border-gray-300"
    />
  )
}
export default CodeEditor
