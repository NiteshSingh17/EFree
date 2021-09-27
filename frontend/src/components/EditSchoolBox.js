import React, { useState } from 'react';


import FieldsetInput from '../components/FieldsetInput';

import axios from 'axios'

import {API_URL,IMG_URL} from '../constants/basicConst'
import {withRouter } from 'react-router-dom';
 function EditSchoolBox(props){
const [err,setErr]=useState('');
const curEdit=props.curEdit;
const handleEditSubmit=(e)=>{
e.preventDefault();
switch(curEdit){
case "bgimg":{
if(document.forms.editSchoolForm.backImg.value===''){
setErr("Give Background new Image");
return;
}
break;
}
case "img":{
if(document.forms.editSchoolForm.img.value===''){
setErr("Give new Image");
return;
}
break;
}

case "location":{
if(document.forms.editSchoolForm.location.value===''){
setErr("Give new Location");
return;
}
break;
}

case "student":{
if(document.forms.editSchoolForm.stdcount.value===''){
setErr("Give new Studnts Value");
return;
}
break;
}
case "teachers":{
if(document.forms.editSchoolForm.tchcount.value===''){
setErr("Give new Teachers Value");
return;
}
break;
}

case "since":{
if(document.forms.editSchoolForm.since.value===''){
setErr("Give new since Value");
return;
}
break;
}

case "addfaculty":{
if(document.forms.editSchoolForm.facultyid.value==='' ||document.forms.editSchoolForm.facultyfrom.value===''||document.forms.editSchoolForm.facultydept.value===''){
setErr("Please Fill Form");
return;
}
break;
}

case "byquote":{
if(document.forms.editSchoolForm.byquote.value===''){
setErr("Give New Quote Owner value");
return;
}
break;
}
case "quote":{
if(document.forms.editSchoolForm.quote.value===''){
setErr("Give New Quote");
return;
}
break;
}

case "addcourse":{
if(document.forms.editSchoolForm.streamName.value===''||document.forms.editSchoolForm.strimg.value===''){
setErr("Complete the form");
return;
}
break;
}
}

const fdata=new FormData(document.forms.editSchoolForm);
console.log(props);
fdata.append("scid",props.match.params.id);
axios({method:"post",url:API_URL+"/editschool",data:fdata,headers:{"Authorization":`Bearer ${localStorage.jwt}`}}).then(res=>{
console.log("r",res);
if(res.data.msg==="ok"){
props.handlerCurEdit(false);
props.setReload(pre=>!pre)
}else{
alert(res.data.msg||"Something Went Wrong!");
}
})
}
return (

<div id="editboxcon">
<div id="upeditbox">
<div id="editboxsclogo" style={{"backgroundImage":(props.logo?"url("+IMG_URL+props.logo+")":"")}}></div>
<div id="editboxinfo">
<form id="editSchoolForm">
<p>{props.scname}</p>

{err?<h6>{err}</h6>:""}
{curEdit==="bgimg"?
<FieldsetInput title="Background Image"type="file" name="backImg"/>:""
}

{curEdit=="img"?
<FieldsetInput title="Image" type="file" name="img"/>:""
}

{curEdit=="location"?
<FieldsetInput title="New Location" type="text" name="location" place="Location"/>:""
}


{curEdit=="student"?
<FieldsetInput title="Edit Studens Numbers" type="text" name="stdcount" place="New Students Count"/>:""
}

{curEdit=="teachers"?
<FieldsetInput title="Edit teachers Numbers"type="text" name="tchcount" place="New Teachers Count"/>:""
}




{curEdit=="since"?
<FieldsetInput title="Edit since" type="text" name="since" place="Since"/>:""
}


{curEdit=="addfaculty"?
<div>
<FieldsetInput title="Faculty EFreeId" type="text" name="facultyid"/>
<FieldsetInput title="Faculty Department Name" type="text" name="facultydept"/>
<FieldsetInput title="Faculty Since" type="text" name="facultyfrom"/>
</div>
:""
}

{curEdit=="byquote"?
<FieldsetInput title="New By Quote" type="text" name="byquote" place="By"/>:""
}

{curEdit=="quote"?
<FieldsetInput title="New Quote" type="text" name="quote" place="Quote"/>:""
}


{curEdit=="addcourse"?
<div>
<FieldsetInput title="Course Name" type="text" name="streamName"/>
<FieldsetInput title="Course Background Photo" type="file" name="strimg"/>
</div>
:""
}







<div class="editboxbtcon"><button style={{"background":"white"}} onClick={()=>{props.handlerCurEdit('');}}>cancel</button>
<button onClick={handleEditSubmit} style={{"background":"#86de86"}}>Update</button>
</div>
</form>
</div>
</div>
</div>
);

}



export default withRouter(EditSchoolBox);
