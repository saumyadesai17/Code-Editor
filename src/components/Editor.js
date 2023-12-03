// import React, { useRef, useEffect } from "react";
// import "codemirror/theme/dracula.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import "codemirror/lib/codemirror.css";
// import CodeMirror from "codemirror";
// import ACTIONS from "../Actions";



// const Editor = ({socketRef,roomId}) => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     const editor = CodeMirror.fromTextArea(editorRef.current, {
//       mode: "javascript",
//       theme: "dracula",
//       autoCloseTags: true,
//       autoCloseBrackets: true,
//       lineNumbers: true,
//       // lint: true
//     });

//     editorRef.current.on('change',(instance,changes)=>{
//       console.log("Changes",changes);
//       const {origin} = changes;
//       if (origin !== 'setvalue'){
//         socketRef.current.emit()
//       }
//       const code = instance.getValue(ACTIONS.CODE_CHANGE,{
//         roomId,
//         code,

//       });
//     })

//     socketRef.current.on(ACTIONS.CODE_CHANGE,({code}) =>{
//       if(code!==null){
//         editorRef.current.setValue(code);
//       }
//     })

//     return () => {
//       editor.toTextArea();
//     };
//   }, []);

//   return <textarea ref={editorRef}></textarea>;
// };

// export default Editor;


import React, { useRef, useEffect } from "react";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import ACTIONS from "../Actions";

let editor;
const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);

  useEffect(() => {
     editor = CodeMirror.fromTextArea(editorRef.current, {
      mode: "javascript",
      theme: "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
      // lint: true
    });

    editor.on("change", (instance, changes) => {
      console.log("Changes", changes);
      const { origin } = changes;
      if (origin !== "setValue" && socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code: instance.getValue(),
        });
      }
    });

    return () => {
      editor.toTextArea();
    };
  }, [socketRef, roomId]);

  useEffect(() =>{
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editor.setValue(code);
        }
      });
    }
  },[socketRef.current])

  return <textarea ref={editorRef}></textarea>;
};

export default Editor;



