(()=>{"use strict";var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};function e(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}function n(t,e,n){if(n||2===arguments.length)for(var i,r=0,o=e.length;r<o;r++)!i&&r in e||(i||(i=Array.prototype.slice.call(e,0,r)),i[r]=e[r]);return t.concat(i||Array.prototype.slice.call(e))}Object.create,Object.create;const i=function(){function t(t,e,n){var i=this;this.settings=t,this.editor=e,this.i18n=n,this.classNames=["grid-container","grid-row","grid-col"],this.onKeyDown=this.onKeyDown.bind(this),this.onBeforeExecCommand=this.onBeforeExecCommand.bind(this),e.on("keydown",(function(t){return i.onKeyDown(t)})),e.on("BeforeExecCommand",(function(t){return i.onBeforeExecCommand(t)}))}return t.prototype.onKeyDown=function(t){var e=this,n=t.key,i=this.editor.selection.getNode(),r=i.parentNode,o=this.editor.selection.getRng();if("Backspace"===n){if(o.startOffset>0)return;if(o.startOffset<=0&&this.classNames.some((function(t){return i.classList.contains(t)})))return t.preventDefault(),!1;if(r&&1===r.childElementCount&&this.classNames.some((function(t){return r.classList.contains(t)}))){if(!this.classNames.some((function(t){return i.classList.contains(t)}))){if(o.startOffset<=0)return t.preventDefault(),!1;this.editor.undoManager.transact((function(){e.editor.dom.remove(i),e.editor.execCommand("mceInsertContent",!1,e.editor.dom.createHTML("p"))}))}return t.preventDefault(),!1}}if("Delete"===n){if(r&&1===r.childElementCount&&this.classNames.some((function(t){return r.classList.contains(t)})))return t.preventDefault(),!1;if(o.startOffset>0)return;if(this.classNames.some((function(t){return i.classList.contains(t)})))return t.preventDefault(),!1}},t.prototype.onBeforeExecCommand=function(t){if("InsertOrderedList"===t.command||"InsertUnorderedList"===t.command||"InsertDefinitionList"===t.command){var e=this.editor.selection.getNode();this.classNames.forEach((function(n){if(e.classList.contains("".concat(n)))return t.preventDefault(),!1}))}},t}(),r=function(){function t(t,e,n){this.settings=t,this.editor=e,this.i18n=n,this.getElement=this.getElement.bind(this),this.isElement=this.isElement.bind(this),this.getElementColumn=this.getElementColumn.bind(this),this.isElementColumn=this.isElementColumn.bind(this),this.getElementRow=this.getElementRow.bind(this),this.isElementRow=this.isElementRow.bind(this),this.selectElement=this.selectElement.bind(this)}return t.prototype.cmd=function(t,e){var n=this;return void 0===e&&(e=null),function(){return n.editor.execCommand(t,!1,e)}},t.prototype.getElement=function(){return this.editor.dom.getParent(this.editor.selection.getStart(),".grid-container")},t.prototype.isElement=function(t){return this.editor.dom.is(t,".grid-container")&&this.editor.getBody().contains(t)},t.prototype.getElementColumn=function(){return this.editor.dom.getParent(this.editor.selection.getStart(),".grid-col")},t.prototype.isElementColumn=function(t){return!(!this.editor.dom.is(t,".grid-col")||!this.editor.getBody().contains(t))},t.prototype.getElementRow=function(){return this.editor.dom.getParent(this.editor.selection.getStart(),".grid-row")},t.prototype.isElementRow=function(t){return this.editor.dom.is(t,".grid-row")&&this.editor.getBody().contains(t)},t.prototype.selectElement=function(t){this.getElementColumn()&&(this.editor.selection.collapse(),this.editor.focus(!1))},t}(),o=function(){function t(t){this.preset=t}return t.prototype.render=function(t,e){var i=this,r="selected"in e?e.selected:{};return{title:"Column sizes",body:{type:"tabpanel",tabs:[{name:"allsizes",title:"All Sizes",items:n([],this.preset.allsizes.map((function(t){return i.breadpoint(t,r)})),!0)},{name:"responsive",title:"Responsive",items:n([],this.preset.breakpoints.map((function(t){return i.breadpoint(t,r)})),!0)}]},initialData:this.initialData(this.preset.breakpoints,r),buttons:[{type:"submit",text:"OK"},{type:"cancel",text:"Cancel"}],onSubmit:function(e){var n=e.getData();t(n),e.close()}}},t.prototype.getSelected=function(t){var e=this,n={};return this.preset.breakpoints.forEach((function(i){var r="",o=e.preset.columnClassRegex(i.prefix).exec(t);o&&o.length>1&&(r=o[1]),n[i.value]=r})),n},t.prototype.breadpoint=function(t,e){return{type:"panel",items:[{type:"selectbox",name:t.value,label:t.text,disabled:!1,value:t.value in e?e[t.value]:"",items:this.preset.columns}]}},t.prototype.initialData=function(t,e){var n={};return t.forEach((function(t){t.value in e&&(n[t.value]=e[t.value])})),n},t}(),s=function(t){function n(e,i,r,s){var a=t.call(this,e,r,s)||this;return a.settings=e,a.preset=i,a.editor=r,a.i18n=s,a.insertColumnDialog=new o(a.preset),a.insert=a.insert.bind(a),a.insertAfter=a.insertAfter.bind(a),a.insertBefore=a.insertBefore.bind(a),a.delete=a.delete.bind(a),a.properties=a.properties.bind(a),a.onInsertSubmit=a.onInsertSubmit.bind(a),r.ui.registry.addButton(n.BTN_COLUMN_PROPERTIES,{icon:"table-row-properties",onAction:function(t){a.properties(t.isDisabled(),t.setDisabled)},tooltip:s.translate("grid.column.properties")}),r.ui.registry.addButton(n.BTN_COLUMN_INSERT_AFTER,{icon:"table-insert-column-after",onAction:function(t){a.insertAfter(t.isDisabled(),t.setDisabled)},tooltip:s.translate("grid.column.insert_after")}),r.ui.registry.addButton(n.BTN_COLUMN_INSERT_BEFORE,{icon:"table-insert-column-before",onAction:function(t){a.insertBefore(t.isDisabled(),t.setDisabled)},tooltip:s.translate("grid.column.insert_before")}),r.ui.registry.addButton(n.BTN_COLUMN_DELETE,{icon:"table-delete-column",onAction:function(t){a.delete(t.isDisabled(),t.setDisabled)},tooltip:s.translate("grid.column.remove")}),a}return e(n,t),n.prototype.insertAfter=function(t,e){return this.insert(t,"after")},n.prototype.insertBefore=function(t,e){return this.insert(t,"before")},n.prototype.insert=function(t,e){var n=this;return!!this.getElementRow()&&(this.editor.windowManager.open(this.insertColumnDialog.render((function(t){n.onInsertSubmit(t,e)}),{}),{}),!0)},n.prototype.delete=function(t,e){var n=this.getElementColumn();return!!n&&1!==n.parentNode.querySelectorAll(".grid-col").length&&(this.editor.dom.remove(n),!0)},n.prototype.onInsertSubmit=function(t,e){var n=this.getElementColumn();n?"after"===e?n.parentNode.insertBefore(this.preset.renderColumn(t),n.nextSibling):n.parentNode.insertBefore(this.preset.renderColumn(t),n):this.getElementRow().appendChild(this.preset.renderColumn(t))},n.prototype.properties=function(t,e){var n=this,i=this.getElementColumn();if(i){var r=this.insertColumnDialog.getSelected(i.classList.value);return this.editor.windowManager.open(this.insertColumnDialog.render((function(t){var e=[];i.classList.forEach((function(t){n.preset.isColumn(t)&&e.push(t)})),e.forEach((function(t){i.classList.remove(t)}));var r=function(e){if(t.hasOwnProperty(e)){var r=t[e],o=e,s=n.preset.breakpoints.find((function(t){return t.value===o}));if(!r)return"continue";i.classList.add(n.preset.columnClass(s.prefix,r))}};for(var o in t)r(o)}),{class:i.classList.value,selected:r}),{}),!0}return!1},n.BTN_COLUMN_INSERT_AFTER="column_insert_after",n.BTN_COLUMN_INSERT_BEFORE="column_insert_before",n.BTN_COLUMN_DELETE="column_delete",n.BTN_COLUMN_PROPERTIES="column_properties",n}(r),a=function(t){function n(e,i,r,o){var s=t.call(this,e,r,o)||this;return s.settings=e,s.preset=i,s.editor=r,s.i18n=o,s.insert=s.insert.bind(s),s.insertAfter=s.insertAfter.bind(s),s.insertBefore=s.insertBefore.bind(s),s.delete=s.delete.bind(s),r.ui.registry.addButton(n.BTN_ROW_INSERT_AFTER,{icon:"table-insert-row-after",onAction:function(t){s.insertAfter(t.isDisabled(),t.setDisabled)},tooltip:o.translate("grid.row.insert_after")}),r.ui.registry.addButton(n.BTN_ROW_INSERT_BEFORE,{icon:"table-insert-row-above",onAction:function(t){s.insertBefore(t.isDisabled(),t.setDisabled)},tooltip:o.translate("grid.row.insert_before")}),r.ui.registry.addButton(n.BTN_ROW_DELETE,{icon:"table-delete-row",onAction:function(t){s.delete(t.isDisabled(),t.setDisabled)},tooltip:o.translate("grid.row.remove")}),s}return e(n,t),n.prototype.insertAfter=function(t,e){return this.insert(t,"after")},n.prototype.insertBefore=function(t,e){return this.insert(t,"before")},n.prototype.insert=function(t,e){var n=this.getElementRow();if(n){var i=this.preset.renderRow();return"after"===e?n.parentNode.insertBefore(i,n.nextSibling):n.parentNode.insertBefore(i,n),!0}return!1},n.prototype.delete=function(t,e){var n=this.getElementRow();return!!n&&(this.editor.dom.remove(n),!0)},n.BTN_ROW_INSERT_AFTER="row_insert_after",n.BTN_ROW_INSERT_BEFORE="row_insert_before",n.BTN_ROW_DELETE="row_delete",n}(r),l=function(t){function n(e,i,r,o){var l=t.call(this,e,r,o)||this;return l.settings=e,l.preset=i,l.editor=r,l.i18n=o,l.insert=l.insert.bind(l),l.delete=l.delete.bind(l),r.ui.registry.addMenuItem(n.BTN_INSERT_GRID,{icon:"table",text:o.translate("grid.insert"),onAction:function(t){l.insert(t.isDisabled(),t.setDisabled)}}),r.ui.registry.addButton("grid",{icon:"table",onAction:function(t){l.insert(t.isDisabled(),t.setDisabled)},text:o.translate("grid.insert"),tooltip:o.translate("grid.insert")}),r.ui.registry.addButton(n.BTN_DELETE_GRID,{icon:"table-delete-table",onAction:function(t){l.delete(t.isDisabled(),t.setDisabled)},tooltip:o.translate("grid.remove")}),r.ui.registry.addContextToolbar("grid",{predicate:l.isElementColumn,items:"".concat(n.BTN_DELETE_GRID," |  ").concat(a.BTN_ROW_INSERT_AFTER," ").concat(a.BTN_ROW_INSERT_BEFORE," ").concat(a.BTN_ROW_DELETE," | ").concat(s.BTN_COLUMN_PROPERTIES," ").concat(s.BTN_COLUMN_INSERT_AFTER," ").concat(s.BTN_COLUMN_INSERT_BEFORE," ").concat(s.BTN_COLUMN_DELETE)}),l}return e(n,t),n.prototype.insert=function(t,e){return!this.getElement()&&(this.editor.execCommand("mceInsertContent",!1,this.preset.renderContainer().outerHTML),!0)},n.prototype.delete=function(t,e){var n=this.getElement();return!!n&&(this.editor.dom.remove(n),!0)},n.BTN_INSERT_GRID="grid_insert",n.BTN_DELETE_GRID="grid_delete",n}(r),c=function(){function t(t){this.editor=t}return Object.defineProperty(t.prototype,"preset",{get:function(){var e=this.editor.getParam("grid_preset",t.presets[0]);if(!(e in t.presets))return e;throw new Error('Unknown grid preset "'.concat(e,'"'))},enumerable:!1,configurable:!0}),t.presets=["Bootstrap5"],t}();var u={Bootstrap5:function(){function t(t,e){var n=this;this.settings=t,this.editor=e,this.columns=[{text:"Select column",value:""},{text:"1",value:"1"},{text:"2",value:"2"},{text:"3",value:"3"},{text:"4",value:"4"},{text:"5",value:"5"},{text:"6",value:"6"},{text:"7",value:"7"},{text:"8",value:"8"},{text:"9",value:"9"},{text:"10",value:"10"},{text:"11",value:"11"},{text:"12",value:"12"}],this.breakpoints=[{text:"All",value:"allsizes",prefix:""},{text:"Extra small",value:"extra_small",prefix:"-xs"},{text:"Small",value:"small",prefix:"-sm"},{text:"Medium",value:"medium",prefix:"-md"},{text:"Large",value:"large",prefix:"-lg"}],this.allsizes=[{text:"All",value:"allsizes",prefix:""}],this.style=function(){return"display-bs5.css"},this.columnClassRegex=function(t){return new RegExp("col".concat(t,"-([\\d]+)"),"gi")},this.columnClass=function(t,e){return"col".concat(t,"-").concat(e)},this.isColumn=function(t){return!!n.breakpoints.find((function(e){return!!n.columns.find((function(i){return n.columnClass(e.prefix,i.value)===t}))}))}}return t.prototype.renderContainer=function(){var t=document.createElement("div");return t.innerHTML='\n        <div class="grid-container container">\n            <div class="grid-row row">\n                <div class="grid-col col-12"></div>\n            </div>\n        </div>'.trim(),t},t.prototype.renderRow=function(){var t=document.createElement("div");return t.innerHTML='\n        <div class="grid-row row">\n            <div class="grid-col col-12"></div>\n        </div>'.trim(),t.firstChild},t.prototype.renderColumn=function(t){var e=t.extra_small.length>0?"col-xs-".concat(t.extra_small):"",n=t.small.length>0?"col-sm-".concat(t.small):"",i=t.medium.length>0?"col-md-".concat(t.medium):"",r=t.large.length>0?"col-lg-".concat(t.large):"",o=t.allsizes.length>0?"col-".concat(t.allsizes):"",s="".concat(e," ").concat(n," ").concat(i," ").concat(r," ").concat(o),a='<div class="grid-col '.concat(s.trim(),'"></div>'),l=document.createElement("div");return l.innerHTML=a.trim(),l.firstChild},t}()};tinymce.PluginManager.requireLangPack("grid"),tinymce.PluginManager.add("grid",(function(t,e){return n=void 0,r=void 0,d=function(){var n,r;return function(t,e){var n,i,r,o,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(n=1,i&&(r=2&a[0]?i.return:a[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,a[1])).done)return r;switch(i=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,i=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!((r=(r=s.trys).length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){s.label=a[1];break}if(6===a[0]&&s.label<r[1]){s.label=r[1],r=a;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(a);break}r[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],i=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}}(this,(function(o){return n=new c(t),r=function(t,e){return new u[t.preset]}(n),t.contentCSS.push(e+"/".concat(r.style())),new i(n,t,tinymce.util.I18n),new a(n,r,t,tinymce.util.I18n),new s(n,r,t,tinymce.util.I18n),new l(n,r,t,tinymce.util.I18n),[2]}))},new((o=void 0)||(o=Promise))((function(t,e){function i(t){try{a(d.next(t))}catch(t){e(t)}}function s(t){try{a(d.throw(t))}catch(t){e(t)}}function a(e){var n;e.done?t(e.value):(n=e.value,n instanceof o?n:new o((function(t){t(n)}))).then(i,s)}a((d=d.apply(n,r||[])).next())}));var n,r,o,d}))})();