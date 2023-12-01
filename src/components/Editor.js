import React, { useRef, useEffect } from "react";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(editorRef.current, {
      mode: "javascript",
      theme: "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
      // lint: true
    });

    return () => {
      editor.toTextArea();
    };
  }, []);

  return <textarea ref={editorRef}></textarea>;
};

export default Editor;