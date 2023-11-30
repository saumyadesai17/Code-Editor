import React from 'react'
import CodeMirror from 'codemirror';
import 'codemirror/theme/dracula.css'; 
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/lib/codemirror.css'



const Editor = () => {

  React.useEffect(() => {
      async function init(){
        CodeMirror.fromTextArea(document.getElementById('realTimeEditor'),{
          mode:{name:'javascript', json:true}, //for javascriptx
          theme:'dracula',
          autocorrect:true,
          autoCloseTags:true,
          autoCloseBrackets:true,
          lineNumbers:true,
          // lint:true
        });
      }
      init();
    },[]);

    
  return <textarea id='realTimeEditor'></textarea>
  }
  export default Editor;