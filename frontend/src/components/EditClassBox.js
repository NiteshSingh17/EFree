import React, { useState } from 'react';


import FieldsetInput from '../components/FieldsetInput';

import axios from 'axios'

import {API_URL,IMG_URL} from '../constants/basicConst'
import {withRouter } from 'react-router-dom';

 function EditClassBox(props){
const [err,setErr]=useState('');

const handleSub=(e)=>{
e.preventDefault()
if(document.forms.editClassForm.facultyid.value==='' ||document.forms.editClassForm.facultyfrom.value===''||document.forms.editClassForm.facultydept.value===''){
setErr("Please Fill Form");
return;
}
const fData=new FormData(document.forms.editClassForm);

fData.append("scid",props.scid);
fData.append("coid",props.match.params.id);
axios({method:"post",url:API_URL+"/course/addfaculty",data:fData,headers:{"Authorization":`Bearer ${localStorage.jwt}`}}).then(res=>{
console.log(res);
if(res.data.msg==="ok"){
props.setEdit(false);
props.setReload(pre=>!pre);
}else{
setErr(res.data.msg);
}
});


}

return (
<div id="editboxcon">
<div id="upeditbox">
<div id="editboxinfo">
<p>{props.schoolName}</p>
<form id="editClassForm" onsubmit={handleSub}>
{err?<h6>{err}</h6>:""}

<FieldsetInput title="Faculty EFreeId" type="text" name="facultyid"/>
<FieldsetInput title="Faculty Department Name" type="text" name="facultydept"/>
<FieldsetInput title="Faculty Since" type="text" name="facultyfrom"/>

<div class="editboxbtcon"><button style={{"background":"white"}} onClick={()=>{props.setEdit(false);}}>cancel</button>
<button onClick={handleSub} style={{"background":"#86de86"}}>Add</button>
</div>
</form>
</div>
</div>
</div>
)
}





export default withRouter(EditClassBox);