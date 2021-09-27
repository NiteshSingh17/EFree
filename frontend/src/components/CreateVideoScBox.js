import React, { useState } from 'react';


import FieldsetInput from '../components/FieldsetInput';

import axios from 'axios'

import {API_URL,IMG_URL} from '../constants/basicConst'
import {withRouter } from 'react-router-dom';

 function CreateVideoScBox(props){
const [err,setErr]=useState('');

const handleSub=(e)=>{
e.preventDefault()
if(document.forms.CreateClassVideoForm.title.value==='' ||document.forms.CreateClassVideoForm.classDesc.value===''){
setErr("Please Fill Form");
return;
}
const fData=new FormData(document.forms.CreateClassVideoForm);

fData.append("coid",props.match.params.id);
axios({method:"post",url:API_URL+"/course/addvideo",data:fData,headers:{"Authorization":`Bearer ${localStorage.jwt}`}}).then(res=>{
console.log(res);
if(res.data.msg==="ok"){
props.history.push("/video/"+res.data.vidId);
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
<form id="CreateClassVideoForm" onsubmit={handleSub}>
{err?<h6>{err}</h6>:""}

<FieldsetInput title="Today Class Title" type="text" name="title"/>
<FieldsetInput title="Today Class Description" type="text" name="classDesc"/>

<div class="editboxbtcon"><button style={{"background":"white"}} onClick={()=>{props.handleCancel(false);}}>cancel</button>
<button onClick={handleSub} style={{"background":"#86de86"}}>Add</button>
</div>
</form>
</div>
</div>
</div>
)
}





export default withRouter(CreateVideoScBox);