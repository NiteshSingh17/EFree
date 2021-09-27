import React, { useEffect, useState } from 'react';


import { BrowserRouter, Link, Route} from 'react-router-dom';



import {IMG_URL} from '../constants/basicConst';

export default function HomePage() {
 

return (
<main>
<div id="frontcon">
<div id="mainhead">We Happily welcome all Students and Teachers to share and increase there knowledge with us and let buitd tommorow with us This is right place and right time to join EFree.Join us on this long journey and share your experience with us</div><div id="mainimg"></div>
</div>
<div class="oneSection" id="discover">
<h3>Discover New Things</h3>
<div>
<div class="onemainInfo" style={{"backgroundImage":"url(/images/pic3.jpg)"}}>Learn online</div>
<div class="onemainInfo" style={{"backgroundImage":"url(/images/pic4.jpg)"}}>Creativity</div>
<div class="onemainInfo" style={{"backgroundImage":"url(/images/pic5.jpg)"}}>Career Building</div>
<div class="onemainInfo" style={{"backgroundImage":"url(/images/pic6.jpg)"}}>Basic to Advanced</div>
</div>
</div>
<div id="whyjoinus" class="oneSection">
<h3>Why Join us</h3>
<p>We belive in making better future by making education avialble to everyone at no cost from all around world some Experts on Efree who will guide you in future</p>
<div>

<div class="onemainInfo">
<span class="member">
<span class="member-img" style={{"backgroundImage":"url("+IMG_URL+"Alexa-ku2psz4b.jpg"}}></span>
<h2>Alexa</h2>
<p>Computer Science</p>
<p>2012</p>
</span></div>
<div class="onemainInfo">
<span class="member">
<span class="member-img" style={{"backgroundImage":"url("+IMG_URL+"Nolan-ku2w8gu4.jpg"}} ></span>
<h2>Nolan</h2>
<p>Strategy</p>
<p>2000</p>
</span></div>
<div class="onemainInfo">
<span class="member">
<span class="member-img" style={{"backgroundImage":"url("+IMG_URL+"Jinjin-ku2me9wg.jpg"}} ></span>
<h2>Jinjin</h2>
<p>Mathematics</p>
<p>1999</p>
</span></div>
<div class="onemainInfo">
<span class="member">
<span class="member-img" style={{"backgroundImage":"url("+IMG_URL+"Mike-ku2wd1ma.jpg"}}></span>
<h2>Mike</h2>
<p>Cloud computing</p>
<p>2010</p>
</span></div>

</div>
</div>

<div class="oneSection">
<h3>How can you particapte</h3>
<p>God help them who help there selfs,Efree is available to everyone who has interest in learning new things and providing guidence to others you can join us as a student or a institute and teaches to Help us to create a better enviroment for everyone</p>
</div>

<div class="oneSection">
<h3>Achievments</h3>
<div class="achievments">
<div style={{"backgroundImage":"url(https://www.pngkit.com/png/detail/131-1311128_school-icon-vector-graphics.png)"}}></div><div class="achievmentinfo">More than 500+ Schools</div>
</div>

<div class="achievments">
<div style={{"backgroundImage":"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-xL91kkhnm0ExcnzBIvjpxxY7YMnOjgQ5xSv0UxDJOXVeLnqp4UEW39ShFhmUxFaMjc&usqp=CAU)"}}></div><div class="achievmentinfo">More than 10000+ daily Users</div>
</div>

<div class="achievments">
<div style={{"backgroundImage":"url(https://pbs.twimg.com/media/CryohnuXEAU734V.jpg)"}}></div><div class="achievmentinfo">Award for Fastest Trending App</div>
</div>


</div>
<div id="whyjoinus" class="oneSection">
<h3>Our Partners</h3>

<ul id="allcoll">

<li>
<div class="collcon">
<div class="collimg" style={{"backgroundImage":"url(https://res.cloudinary.com/dtxg6pl5f/image/upload/Efree/vik8gcu31fdu9nxrd5nk.jpg)"}}></div>
<div class="collinfo">
<p class="collfoll">Follow +</p>
<span class="collphoto" style={{"backgroundImage":"url(https://res.cloudinary.com/dtxg6pl5f/image/upload/Efree/mmezcdoyvvsjuumne6jc.jpg)"}}></span>
<div><p><Link to={"/class/University-of-Kings-ku2nf1yx"}>University of Kings</Link></p><span>Since : 1990 </span><span> Location : USA</span></div>

</div></div>
</li>
<li>
<div class="collcon">
<div class="collimg" style={{"backgroundImage":"url(https://res.cloudinary.com/dtxg6pl5f/image/upload/Efree/eywubdrbwwrojig8fkdw.jpg)"}}></div>
<div class="collinfo">
<p class="collfoll">Follow +</p>
<span class="collphoto" style={{"backgroundImage":"url(https://res.cloudinary.com/dtxg6pl5f/image/upload/Efree/u73bht48ye9dldqxqq6b.jpg)"}}></span>
<div><p><Link to={"/class/University-of-Technology-ku2p61kd"}>University of Technology</Link></p><span>Since : 2000 </span><span> Location : Jaipur,Rajasthan</span></div>

</div></div>
</li>
</ul>

</div>
</main>
);}