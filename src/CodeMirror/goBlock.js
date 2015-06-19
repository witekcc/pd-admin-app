import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';

CodeMirror.defineSimpleMode("goBlock", {
  // The start state contains the rules that are intially used
  start: [
  
    {regex: /{{/, token: "meta", mode: {spec: "goTemplate", end: /}}/}}
  ]
 
});

