import React, { useState } from 'react';




export default function Error(props) {
return (<div id="errorCont">
<div id="insideError">
<section>{props.msg}
</section>
<button onClick={props.onClickHandler}>Ok</button>
</div>
</div>
);
}
 