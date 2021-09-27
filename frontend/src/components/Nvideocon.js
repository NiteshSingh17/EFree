import React, { useEffect, useState } from 'react';


import axios from 'axios';  

const Video = require('twilio-video');


function Nvideocon() {
 

//const [jwt, setjwt] = useState("");


function getjwt(){

    axios.get('http://localhost:3001/token/nite1').then(results => {  
    
const { identity, jwt } = results.data; 
//setjwt(jwt);
Joinroom(jwt);
});
}

function Joinroom(jwt){
let una=document.querySelector('#name').value;
let id=document.querySelector('#pass').value;

console.log(jwt);
let connectOptions = {};
connectOptions['name']=id; 
Video.connect(jwt, connectOptions).then(room => {
  console.log('Connected to Room "%s"', room.name);

  room.participants.forEach(participantConnected);
  room.on('participantConnected', participantConnected);

  room.on('participantDisconnected', participantDisconnected);
  room.once('disconnected', error => room.participants.forEach(participantDisconnected));
});
}
function participantConnected(participant) {
  console.log('Participant "%s" connected', participant.identity);

  const div = document.createElement('div');
  div.id = participant.sid;
  div.innerText = participant.identity;

  participant.on('trackSubscribed', track => trackSubscribed(div, track));
  participant.on('trackUnsubscribed', trackUnsubscribed);

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      trackSubscribed(div, publication.track);
    }
  });

  document.body.appendChild(div);
}

function participantDisconnected(participant) {
  console.log('Participant "%s" disconnected', participant.identity);
  document.getElementById(participant.sid).remove();
}
function trackSubscribed(div, track) {
  div.appendChild(track.attach());
}

function trackUnsubscribed(track) {
  track.detach().forEach(element => element.remove());
}

return (<div><input type="text" id="name"></input><input type="text" id="pass"></input><div onClick={getjwt}>sub</div></div>

);

}


export default Nvideocon;
