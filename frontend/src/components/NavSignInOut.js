import React,{useState} from 'react';

import { Link,withRouter } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../constants/basicConst';

function NavSignInOut(props) {

const [vidbt,setVidbt]=useState(true);

 
const handleLogout=()=>{
localStorage.removeItem('jwt');
localStorage.removeItem('stdof');
localStorage.removeItem('proof');
}


const handleVideo=()=>{

setVidbt(false);

console.log("v");

axios({method:"post",url:API_URL+"/simpleroom"}).then(res=>{
console.log(res);
if(res.data.msg==="ok"){
props.history.push("/video/"+res.data.vidId);
}else{
alert(res.data.msg);
}
setVidbt(true);
});

}


return (
<React.Fragment>
{
localStorage.getItem('jwt')?
<div className="sidenavitem"><p>
<i class="fas fa-sign-out-alt"></i></p><p className="sideitemtext"><p onClick={()=>{handleLogout();
props.history.push("/");}}>signout</p></p></div> : <React.Fragment>
<div className="sidenavitem">
<i class="fas fa-user-plus"></i><p className="sideitemtext">
<Link to="/signup">Sign-Up</Link></p></div>
<div className="sidenavitem">
<i class="fas fa-sign-in-alt"></i><p className="sideitemtext"><Link to="/login">login</Link></p></div></React.Fragment>
}
<div className="sidenavitem" onClick={vidbt?handleVideo:""}>
<i class="fas fa-video"></i><p className="sideitemtext">Videocall</p></div>

</React.Fragment>
);
}


export default withRouter(NavSignInOut);
