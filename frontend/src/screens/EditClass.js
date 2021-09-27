import React, { useState,useEffect } from 'react';


import axios from 'axios';
import { Link } from 'react-router-dom';



import EditClassBox from '../components/EditClassBox';
import {API_URL,IMG_URL} from '../constants/basicConst'


export default function EditClass(props){
const [edit,setEdit]=useState(false);
const [course,setCourse]=useState({});
const [reload,setReload]=useState(false);
useEffect(()=>{
axios({method:"post",url:API_URL+"/course/info",data:{id:props.match.params.id}}).then(res=>{
console.log(res);
if(res.data.msg==="ok"){
setCourse(res.data.res);
}});
},[props.match.params.id,reload]);

const removeId=(data)=>{
return data.substring(0,data.lastIndexOf('-')).replaceAll("-"," ");
}

const handleDelFac=(e)=>{
console.log(e.target.dataset.key);
var fData=new FormData();
fData.append("scid",course.school);
fData.append("coid",props.match.params.id);
fData.append("ind",e.target.dataset.key);
console.log("k",fData);
axios({method:"post",url:API_URL+"/course/deletefaculty",data:fData,headers:{"Authorization":`Bearer ${localStorage.jwt}`}}).then(res=>{

if(res.data.msg==="ok"){
setReload(pre=>!pre);
}else{
alert(res.data.msg);
}
});
}

return (

<div style={{"display":"flex","justifyContent":"space-between"}}>
{edit?<EditClassBox setEdit={setEdit} schoolName={course.school} setReload={setReload} scid={course.school}/>:""}
{course.school?<span class="folowcl" onClick={()=>{setEdit(true)}}>
<i class="fas fa-user-plus"></i></span>:""}
<div>
<p>All Faculty</p>
<div class="subjectcon">
{course.faculty && course.faculty.map((one,key)=>{
return (
<span class="comember member">
<div class="editbt" data-key={key} onClick={handleDelFac}>
<i class="fas fa-times-circle"></i></div>
<span class="coursecomember member-img"  style={{"backgroundImage":("url("+IMG_URL+one.id+".jpg),url(/images/userdefaultimage.svg)")}}></span>

<Link to={"/user/"+one.id}><h2>{removeId(one.id)}</h2>
</Link>
<p>{one.dept}</p>
<p>From {one.from}</p>
</span>
)
})}


</div>
</div>
<div class="coOpenbt">(-)</div>
<div id="studentscon">
<div class="coCrossbt">X</div>

{course.std && course.std.map(one=>{
return (

<div class="onecostuden">
<span class="onecostimg" style={{"backgroundImage":("url("+IMG_URL+one+".jpg),url(/images/userdefaultimage.svg)")}}></span>
<Link to={"/user/"+one}><div class="onecostname">{removeId(one)}</div></Link>
</div>
)
})}
</div>

</div>
)
}