import React, { useState,useEffect } from 'react';


import axios from 'axios';
import { Link } from 'react-router-dom';


import {API_URL,IMG_URL} from '../constants/basicConst'
import CreateVideoScBox from '../components/CreateVideoScBox'


export default function Class(props){


const [course,setCourse]=useState({});
const [reload,setReload]=useState(false);

const [createvideosc,setCreatevideosc]=useState(false);


useEffect(()=>{
axios({method:"post",url:API_URL+"/course/info",data:{id:props.match.params.id}}).then(res=>{
console.log(res);
if(res.data.msg==="ok"){
setCourse(res.data.res);
}});
},[props.match.params.id]);

const removeId=(data)=>{
return data.substring(0,data.lastIndexOf('-')).replaceAll("-"," ");
}

const handleFollow=(e)=>{

console.log(e.target.dataset.key);
var fData=new FormData();
fData.append("coid",props.match.params.id);
console.log("k",fData);
axios({method:"post",url:API_URL+"/course/follow",data:fData,headers:{"Authorization":`Bearer ${localStorage.jwt}`}}).then(res=>{

if(res.data.msg==="ok"){


let std=localStorage.getItem('stdof');
if(std.indexOf(props.match.params.id)>-1){
console.log("rest",std);
std=std.replace(","+props.match.params.id,"");
console.log("std",std);
}else{
std+=","+props.match.params.id;
}
localStorage.setItem('stdof',std);
setReload(pre=>!pre);
}else{
alert(res.data.msg);
}
});
}
let isAlreadyFollow=false;
let isTeacher=false;
if(localStorage.getItem('stdof')){
localStorage.getItem('stdof').split(',').forEach(one=>{
if(one===props.match.params.id){
isAlreadyFollow=true;
}
})
}

if(localStorage.getItem('proof')){
localStorage.getItem('proof').split(',').forEach(one=>{
if(one===props.match.params.id){
isTeacher=true;
}
})
}
const handleTakeClassBox=(opt)=>{

setCreatevideosc(opt);
}

return (

<div style={{"display":"flex","justifyContent":"space-between"}}>

{!isTeacher && course.school?<span class="folowcl" onClick={handleFollow}>{isAlreadyFollow?"Unfollow +":"Follow +"}</span>:""}

{isTeacher&& course.school?<span class="folowcl" onClick={()=>{handleTakeClassBox(true)}}>Take Class</span>:""}
{createvideosc?<CreateVideoScBox schoolName={course.school} handleCancel={handleTakeClassBox}/>:""}
<div>
<p>All Faculties</p>
<div class="subjectcon">
{course.faculty && course.faculty.map((one)=>{
return (
<Link to={"/user/"+one.id}>
<span class="comember member">
<span class="coursecomember member-img" style={{"backgroundImage":"url("+IMG_URL+one.id+".jpg),url(/images/userdefaultimage.svg)"}}></span>
<h2>{removeId(one.id)}</h2>
<p>{one.dept}</p>
<p>From {one.from}</p>
</span>
</Link>
)
})}


</div>
</div>
<div class="coOpenbt">(-)</div>
<div id="studentscon">
<div class="coCrossbt">X</div>

{course.std && course.std.map(one=>{
return (
<React.Fragment>

<div class="onecostuden">
<div class="onecostimg" style={{"backgroundImage":"url("+IMG_URL+one+".jpg),url(/images/userdefaultimage.svg)"}}></div>
<div class="onecostname"><Link to={"/user/"+one}>{removeId(one)}</Link></div>
</div>
</React.Fragment>
)
})}
</div>

</div>
)



}