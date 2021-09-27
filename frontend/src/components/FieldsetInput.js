import React from 'react';


export default function FieldsetInput(params){

return (
<fieldset>
<legend>{params.title}</legend>
<span class="oneInfoItem">
<input type={params.type} name={params.name}/>
</span>
</fieldset>)
}