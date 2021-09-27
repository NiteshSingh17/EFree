
import React, {useState } from 'react';


import axios from 'axios';


import { Link } from 'react-router-dom';

import {API_URL} from '../constants/basicConst'
export default function LoginScreen(props){


const [error,setError]=useState('');

const handleFormSumbit=(e)=>{
e.preventDefault();
console.log("form");
handleSubmit(e);
}

const handleSubmit=async (e)=>{
e.preventDefault();
console.log("submit");
const form=document.forms.loginForm;
const fdata={};
fdata['pass']=form.pass.value;
fdata['email']=form.email.value;

console.log(fdata);

if(!fdata['pass']||!fdata['email']){
setError("please fill the form");
return;
}
try{
const {data}=await axios.post(API_URL+'/login',{data:fdata});
console.log(data);
if(data.msg==='ok'){
localStorage.setItem('jwt',data.jwt);
localStorage.setItem('stdof',data.stdof);
localStorage.setItem('proof',data.proof);

props.history.push("/");
}else{
setError(data.msg);
}}
catch(e){
setError(e.message);
}

}
return (
<div id="logincont">
<div>
<span id="loginLogo"></span>
<div id="loginInfo">
<h3>Login
</h3>
{error?<h6>{error}</h6>:""}

<div>
<form onSubmit={handleFormSumbit} id="loginForm">

<div class="oneDetail">
<span><span class="logoDetail"></span>Email</span><span><input type="text" name="email"/></span>
</div>

<div class="oneDetail">
<span><span class="logoDetail"></span>Password</span><span><input type="password" name="pass"/></span>
</div>

<div class="loginbtcon">
<button onClick={handleSubmit}>Submit</button>
</div>
</form>
</div>
<p>Create a new account? <Link to="/signup">Sign-up</Link>.</p>
</div>
</div>

</div>)

}