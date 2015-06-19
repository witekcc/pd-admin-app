import {bindable, customElement} from 'aurelia-framework';
import CodeMirror from 'codemirror';
import '../CodeMirror/goTemplate' 
import '../CodeMirror/goBlock' 


@bindable ({ name:'value', attribute:'value', changeHandler:'valueChanged'})
@customElement("cmeditor")
export class CmEditor {

  constructor() {
    this.value = "Enter your template...";
    this.codeMirror = null;
  }

  attached(){

    this.codeMirror = CodeMirror.fromTextArea(this.cmTextArea, {
      mode: "goBlock",
      theme: "lesser-dark"
    });

    let that = this;

    this.codeMirror.on('shown.bs.tab', function(e){ 
      that.codeMirror.refresh();
     });

    this.codeMirror.on('change', (cm, changeObj) => {
      let newValue = cm.getValue();
      if (newValue !== this.value) {
        this.value = newValue;
      }
    });
  }

  activate(){

    this.refresh();
  }

  valueChanged(newValue, oldValue){
    if (this.codeMirror != null && newValue !== this.codeMirror.getValue()) {
        this.codeMirror.setValue(newValue);
      }

    
  }

  refresh(){
    if(this.codeMirror != null){
      this.codeMirror.refresh();
    }
  }
}