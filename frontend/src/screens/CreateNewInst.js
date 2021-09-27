import React, { useState } from 'react';


import {API_URL} from '../constants/basicConst'


import axios from 'axios';




export default function CreateNewInst(props){
const [error,setError]=useState('');

async function handleSubmit(e){
e.preventDefault();
document.querySelector('#crsubmit').disabled=true;
var formEl = document.forms.newInsta;

let fdata=new FormData(formEl);

if(!fdata.get('name')||!fdata.get('location')||!fdata.get('image')||!fdata.get('backimage')||!fdata.get('logo')){
setError("please fill the form");
document.querySelector('#crsubmit').disabled=false;
return;
}
if(!localStorage.jwt){
props.history.push("/login");
document.querySelector('#crsubmit').disabled=false;
return;
}
axios({method:"post",url:API_URL+"/upload",data:fdata,headers:{
"content-Type":"multipart/form-data;","Authorization":`Bearer ${localStorage.jwt}`}}).then(res=>{
console.log(res);
if(res.data.msg==='ok'){console.log('ok');
props.history.push("/viewschool/"+res.data.url);
}else{
setError("Something went wrong!");
document.querySelector('#crsubmit').disabled=false;
}

})


}


return (

<div id="upnewClassFormCon">
<div id="image"></div>
<div id="newClassFormCon">

<form id="newInsta" method="post">

{error?<h6>{error}</h6>:""}

<fieldset>
<legend>Institute Name</legend>
<span class="oneInfoItem">
<input type="text" placeholder="Name" name="name"/>
</span>
</fieldset>


<fieldset>
<legend>Institute Location</legend>
<span class="oneInfoItem">
<input type="text" placeholder="Location" name="location"/>
</span>
</fieldset>


<fieldset>
<legend>Image Of Institute</legend>
<span class="oneInfoItem">
<input type="file" name="image"/>
</span>
</fieldset>

<fieldset>
<legend>Background Image for Institute</legend>
<span class="oneInfoItem">
<input type="file" name="backimage"/>
</span>
</fieldset>


<fieldset>
<legend>Logo</legend>
<span class="oneInfoItem">
<input type="file" name="logo"/>
</span>
</fieldset>

<button id="crsubmit" onClick={handleSubmit} >Submit</button>
</form>
</div>
</div>
)

}