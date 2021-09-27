import React, { useEffect, useState } from 'react';


import { BrowserRouter, Link, Route} from 'react-router-dom';

import axios from 'axios';
import {API_URL} from './constants/basicConst';
import SearchScreen from './screens/SearchScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import CreateNewInst from './screens/CreateNewInst';
import SchoolInfo from './screens/SchoolInfo';
import EditSchool from './screens/EditSchool';
import EditClass from './screens/EditClass';
import Class from './screens/Class';
import StartVideo from './screens/StartVideo';
import Profile from './screens/Profile';
import UserProfile from './screens/UserProfile';
import StudentOfScreen from './screens/StudentOfScreen';
import TeacherOfScreen from './screens/TeacherOfScreen';
import HomePage from './screens/HomePage';

import WebTitle from './components/WebTitle';
import Nvideocon from './components/Nvideocon';
import NavSignInOut from './components/NavSignInOut';




function App(props) {
 
const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
const closebar=()=>setSidebarIsOpen(false);
const [vidbt,setVidbt]=useState(true);
const [searchIsOpen, setsearchIsOpen] = useState(false);
function Serchbtclick(history){
setsearchIsOpen(pre=>{return !pre});
document.querySelector("#upperNamecont input").focus();
const searchval=document.querySelector("#upperNamecont input").value;
if(searchval){
history.push('/search?key='+searchval);
}
}
  return (
    <BrowserRouter>
 
<div className="navcon">
<div className="navtogglebt" onClick={()=>{if(!sidebarIsOpen){setSidebarIsOpen(true);}else{setSidebarIsOpen(false)}}}
  ><i class="fas fa-bars"></i></div>

<WebTitle searchIsOpen={searchIsOpen} Serchbtclick={Serchbtclick}/>


<div className={sidebarIsOpen ? "sidenav shownav" : "sidenav"}>

<div className="sidenavitem"><i class="fas fa-user-edit"></i><p className="sideitemtext"><Link to="/myprofile">Profile</Link></p></div>
<div className="sidenavitem"><i class="fas fa-graduation-cap"></i><p className="sideitemtext"><Link to="/studentof">Student OF</Link></p></div>
<div className="sidenavitem"><i class="fas fa-university"></i><p className="sideitemtext"><Link to="/teacherof">Teacher At</Link></p></div>

<div className="sidenavitem"><i class="fas fa-school"></i><p className="sideitemtext"><Link to="/addnewinst">Create new School</Link></p></div>

{<NavSignInOut />}


{sidebarIsOpen?(<div className="closenavdiv" onClick={closebar}>
<i class="fas fa-times-circle"></i></div>):""}
</div>
</div>

<div className="maincont">
    <Route path="/" component={HomePage} exact></Route>
 
    <Route path="/search" component={SearchScreen} exact></Route>
  
    <Route path="/signup" component={SignUpScreen} exact></Route>
 
    <Route path="/video/:id" component={StartVideo} exact></Route>
   
    <Route path="/nvideo" component={Nvideocon} exact></Route>
   
    <Route path="/login" component={LoginScreen} exact></Route>
   
    <Route path="/addnewinst" component={CreateNewInst} exact></Route>
    
    <Route path="/viewschool/:id" component={SchoolInfo} exact></Route>
   
    <Route path="/class/:id" component={Class} exact></Route>
     
    <Route path="/edit/school/:id" component={EditSchool} exact></Route>
   
    <Route path="/edit/class/:id" component={EditClass} exact></Route>
   
    <Route path="/myprofile" component={Profile} exact></Route>
  
 <Route path="/studentof" component={StudentOfScreen} exact></Route>
 
 <Route path="/teacherof" component={TeacherOfScreen} exact></Route>
  
   <Route path="/user/:id" component={UserProfile} exact></Route>
    
</div>
</BrowserRouter>
  );
}



export default App;
