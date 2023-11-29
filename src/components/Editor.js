import React from 'react'
import CodeMirror from 'codemirror';
import 'codemirror/theme/dracula.css'; 
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/lib/codemirror.css'
import 'C:/Users/suyash/Desktop/projects/code_editor/node_modules/codemirror/mode/clike/clike.js'

const Editor = () => {

  React.useEffect(() => {
      async function init(){

        CodeMirror.fromTextArea(document.getElementById('realTimeEditor'),{
          // mode:{name:'javascript', json:true}, for javascript
          mode:'text/x-c++src',//for c++
          theme:'dracula',
          autocorrect:true,
          autoCloseTags:true,
          autoCloseBrackets:true,
          lineNumbers:true
        });
      }
      init();
    },[]);

    
  return <textarea id='realTimeEditor'></textarea>
  }


    


  export default Editor;