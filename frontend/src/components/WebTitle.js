import React, { useEffect, useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
function WebTitle(props) {
 


return (
<div id="upperNamecont">	<div className="innav"><Link to="/">EduFree</Link></div><div>
<form onSubmit={(e)=>{e.preventDefault();props.Serchbtclick(props.history);}} style={{"display":"inline"}}>
<input placeholder="Search University" type="text" style={{"width":(props.searchIsOpen?"130px":"")}}/>
</form>
<span onClick={()=>{props.Serchbtclick(props.history);}}>
<i class="fas fa-search"></i></span></div></div>
);

}


export default withRouter(WebTitle);
