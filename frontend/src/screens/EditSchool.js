import React, { useState,useEffect } from 'react';


import EditSchoolBox from '../components/EditSchoolBox';

import axios from 'axios';
import { Link } from 'react-router-dom';



import {API_URL,IMG_URL} from '../constants/basicConst'

export default function EditSchool(props){

const [curEdit,setCurEdit]=useState('');
const [reload,setReload]=useState(false);
function handlerCurEdit(cur){
console.log(cur);
setCurEdit(cur);
}


const [school,setSchool]=useState({});
const [info,setInfo]=useState({});
useEffect(()=>{
(async ()=>{

axios({method:"post",url:API_URL+"/viewschool",data:{id:props.match.params.id}}).then(res=>{
console.log(res);
if(res.data.msg==="ok"){
setSchool(res.data.result.school);
setInfo(res.data.result.info);}
})

})();
},[props.match.params.id,reload])

const removeId=(data)=>{
return data.substring(0,data.lastIndexOf('-')).replaceAll("-"," ");
}

const handleDelFac=(e)=>{
console.log(e,e.target,e.target.dataset.key);
axios({method:"post",url:API_URL+"/deleteSchoolitems",data:{id:props.match.params.id,facultyInd:e.target.dataset.key},headers:{"Authorization":`Bearer ${localStorage.jwt}`}}).then(res=>{
console.log("r",res);
if(res.data.msg==="ok"){
setReload(pre=>!pre);
}else{
alert("Something went Wrong!");
}
});

}



const handleDelCou=(e)=>{
console.log(e,e.target,e.target.dataset.key);
axios({method:"post",url:API_URL+"/deleteSchoolitems",data:{id:props.match.params.id,courseInd:e.target.dataset.key},headers:{"Authorization":`Bearer ${localStorage.jwt}`}}).then(res=>{
console.log("r",res);
if(res.data.msg==="ok"){
setReload(pre=>!pre);
}else{
alert("Something went Wrong!");
}
});

}


const scrollLeftClick=()=>{
var left=Math.abs(parseInt(document.querySelector('.membercon').style.left))<(window.innerWidth/2)?Math.abs(parseInt(document.querySelector('.membercon').style.left)):window.innerWidth/2;
console.log("left",left);

document.querySelector('.membercon').style.left=parseInt(document.querySelector('.membercon').style.left)+left+"px";

};


const scrollRightClick=()=>{
var left=Math.abs(parseInt(document.querySelector('.membercon').style.left))+parseInt(document.querySelector('.membercon').offsetWidth);
console.log("ri",window.innerWidth,left);
var clientw=document.querySelector('.membercon').offsetWidth;

left=Math.abs(document.querySelector('.membercon').scrollWidth-left);
const sub=left<(window.innerWidth/2)?left:window.innerWidth/2;

console.log("r4i",window.innerWidth,sub);

document.querySelector('.membercon').style.left=parseInt(document.querySelector('.membercon').style.left)-sub+"px";

};


return (<section>
{curEdit?<EditSchoolBox curEdit={curEdit} handlerCurEdit={handlerCurEdit} setReload={setReload} logo={school.logo} scname={school.id?removeId(school.id):"Loading.."}/>:""}

<div class="upimg"  style={{"backgroundImage":(school.backImg?"url("+IMG_URL+school.backImg+")":"")}} >
<div class="editbt" onClick={()=>{handlerCurEdit('bgimg');}}>
<i class="fas fa-pen"></i></div>
</div>
<div class="doimgcon">
<div style={{"display":"flex","alignItems":"center"}}>
<div>
<div class="doimg" style={{"backgroundImage":(school.img?"url("+IMG_URL+school.img+")":"")}}>
<div class="editbt" onClick={()=>{handlerCurEdit('img');}}><i class="fas fa-pen"></i></div>
</div>
<h4 style={{"textAlign":"center","position":"relative"}}>{school.createdBy?removeId(school.createdBy):"Loading..."}</h4>
</div>
<p style={{"paddingLeft": "30px"}}>{school.id?removeId(school.id):"Loading.."}</p>
</div>
<div class="row basicinfo">
<div >Location : {school.location}<div class="editbt" onClick={()=>{handlerCurEdit('location');}}><i class="fas fa-pen"></i></div></div>
<div >Students : {info.stdcount}<div class="editbt" onClick={()=>{handlerCurEdit('student');}}><i class="fas fa-pen"></i></div></div>
<div>Teachers : {info.tchcount}<div class="editbt" onClick={()=>{handlerCurEdit('teachers');}}><i class="fas fa-pen"></i></div></div>
<div>Year : {school.since?school.since:"---"}<div class="editbt" onClick={()=>{handlerCurEdit('since');}}><i class="fas fa-pen"></i></div></div>
</div>
<div>
<div class="facultyHead">
<p>Faculty</p><div class="editbt" onClick={()=>{handlerCurEdit('addfaculty');}}>+</div>
</div>
<div style={{"position":"relative","overflow":"hidden"}}>
<h1 class="slidebt slideleft" onClick={scrollLeftClick}>{"<"}</h1>
<div class="membercon" style={{"left":"0px"}}>

{info.faculty && info.faculty.map((one,key)=>{
console.log("ke",key);
return (
<span class="member">
<span class="member-img" style={{"backgroundImage":("url("+IMG_URL+one.id+".jpg),url(/images/userdefaultimage.svg)")}}></span>
<h2><Link to={"/user/"+one.id}>{removeId(one.id)}</Link></h2>
<p>{one.dept}</p>
<p>{one.from}</p><div class="editbt" data-key={key} onClick={handleDelFac}>
<i class="fas fa-times-circle"></i></div>
</span>);
})}</div>
<h1 class="slidebt slideright" onClick={scrollRightClick}>{">"}</h1></div>
</div>
<div class="quotecon">
<h4 >{info.Desc!==''?info.Desc:"Nothing"}
<div class="editbt" onClick={()=>{handlerCurEdit('quote');}}>
<i class="fas fa-pen"></i></div>
</h4>
<h4 style={{"textAlign":"right"}} onClick={()=>{handlerCurEdit('byquote');}}>- {info.DescName!==''?info.DescName:"unknown"}<div class="editbt">
<i class="fas fa-pen"></i></div></h4>
</div>
<div class="coursehead"><p >Courses</p><div class="editbt" onClick={()=>{handlerCurEdit('addcourse');}}>+</div></div>
<div class="coursecon">
{info.stream && info.stream.map((one,key)=>{
return (<div class="course"><span style={{"background-image":"url("+IMG_URL+one.img+")"}}></span><p><Link to={"/edit/class/"+one.id}>{one.name}</Link></p><div class="editbt" data-key={key} onClick={handleDelCou}>
<i class="fas fa-times-circle"></i></div></div>);
})}
</div>

</div>

</section>);

}