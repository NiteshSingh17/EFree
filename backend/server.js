
dotenv.config();
import cors from 'cors';

import bcrypt from 'bcryptjs';
import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

import streamifier from 'streamifier';
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload'
import path from 'path';

import cld from 'cloudinary'

import Twillo from "twilio"

var AccessToken = Twillo.jwt.AccessToken;  
var VideoGrant = AccessToken.VideoGrant;
  
const twilioClient= new Twillo.Twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, { accountSid: process.env.TWILIO_ACCOUNT_SID });



const cloudinary=cld.v2;
const saltRounds=5;

const secret="my_secret";

import bodyparser from"body-parser"
dotenv.config();


const app = express();

app.use(cors());

app.use(fileUpload())
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());



mongoose.connect("mongodb+srv://Nitesh:niteshsingh@cluster0.1tdq7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true});
mongoose.set('useNewUrlParser', true);


cloudinary.config({ 
  cloud_name: 'dtxg6pl5f', 
  api_key: '476458177183837', 
  api_secret: 'SAC-PvqTjbQ2dQZnHKnejlng3NM' 
});


var user=new mongoose.Schema({
  email:String,
id:String,
pass:String,
stdof:{type: Array,default:[]},
proof:{type:Array,default:[]},
Desc:{ type: String, default: '' }
});

var user = new mongoose.model("user",user);


var schoolModel=new mongoose.Schema({
since:{ type: String, default: '' },
createdBy:String,
backImg:{ type: String, default: '' },
img:{ type: String, default: '' },
name:{ type: String, default: '' },
location:{ type: String, default: '' },
id:String,
});

var school = new mongoose.model("schoo",schoolModel);

var schoolInfoModel=new mongoose.Schema({
id:String,
faculty:[],
Desc:{ type: String, default: '' },
DescName:{ type: String, default: '' },
stream:[],
logo:{ type: String, default: '' },
email:{ type: String, default: '' },
stdcount:{ type: String, default: '0'},
tchcount:{ type: String, default: '0' }
});

var schoolInfo = new mongoose.model("schoolInfo",schoolInfoModel);

var courseModel=new mongoose.Schema({
  school:String,
name:String,
  faculty:[],
std:[],
vid:[]
});

var course = new mongoose.model("course",courseModel);



function generateAccessToken(username) {
  return jwt.sign(username,secret);
}


async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
console.log(token);
  if (token == null) return res.send({"msg":"Please Login"});

  jwt.verify(token,secret,async (err, user) => {
    console.log(err)


console.log("auth ",token);
    if (err) return res.send({"msg":"Not able to authenticate"});



    req.user = user;

next()
  })
}




app.post('/token', function (req, res) {  
  const identity = req.body.name;  
console.log("toke",identity);
  // Create an access token which we will sign and return to the client,  
  // containing the grant we just created  
  var token = new AccessToken(  
    process.env.TWILIO_ACCOUNT_SID,  
    process.env.TWILIO_API_KEY,  
    process.env.TWILIO_API_SECRET  
  );  

  // Assign the generated identity to the token  
  token.identity = identity;  

  const grant = new VideoGrant();  
  // Grant token access to the Video API features  
  token.addGrant(grant);  

  // Serialize the token to a JWT string and include it in a JSON response  
  res.send({  
    identity: identity,  
    jwt: token.toJwt()  
  })  
})  



app.post("/course/addvideo",authenticateToken,(req,res)=>{
console.log("/c/adv",req.body);
course.findOne({_id:req.body.coid},async (err,found)=>{
if(found){
if(found.faculty.indexOf(req.user.id)){
console.log("adding");
var vidid=new Date().getTime().toString(12);

  try {
    // Call the Twilio video API to create the new room.
    const room = await twilioClient.video.rooms.create({
        uniqueName: vidid,
        type: 'group'
      });
found.vid.push({title:req.body.title,desc:req.body.classDesc,url:room.links.recordings,time:vidid,by:req.user.id})
found.save();


console.log("room",room,found);
res.send({"msg":"ok",vidId:room.uniqueName});


  } catch (error) {
   
res.send({"msg":"Something went wrong"});
  }


}
}
})
})




app.post("/simpleroom",async (req,res)=>{
console.log("/simplerom",req.body);

var vidid=new Date().getTime().toString(12);

  try {
    // Call the Twilio video API to create the new room.
    const room = await twilioClient.video.rooms.create({
        uniqueName: vidid,
        type: 'group'
      });
console.log(room);
res.send({"msg":"ok",vidId:room.uniqueName});

  } catch (error) {
   
res.send({"msg":"Something went wrong"});
  }

});


app.post("/editschool",authenticateToken,(req,ures)=>{
console.log("/ed",req.body,req.files);
if(req.user){
school.findOne({id:req.body.scid},(err,found)=>{
if(found&&found.createdBy===req.user.id){
if(req.files && req.files.backImg){

let cld_upload_stream_bgimg=cloudinary.uploader.upload_stream({folder:"Efree/",transformation: [
  {width: "1440", height: "400"}]},(err,res)=>{console.log(err,res);
var newimurl=res.secure_url.split('/');

newimurl=newimurl[newimurl.length-1];
found.backImg=newimurl;
found.save();
console.log("sa",found);
});
streamifier.createReadStream(req.files.backImg.data).pipe(cld_upload_stream_bgimg);
}else if(req.files && req.files.img){
let cld_upload_stream_img=cloudinary.uploader.upload_stream(
{folder:"Efree/",transformation:[{width: "150", height: "150"}]},(err,res)=>{console.log(err,res);
var newimurl=res.secure_url.split('/');

newimurl=newimurl[newimurl.length-1];
found.img=newimurl;
found.save();
console.log("sa",found);
});
streamifier.createReadStream(req.files.img.data).pipe(cld_upload_stream_img);
}else if(req.body.location){

found.location=req.body.location;
found.save();
}else if(req.body.since){
found.since=req.body.since;
found.save();
}
else if(req.body.stdcount||req.body.tchcount||req.body.facultyid||req.body.byquote||req.body.quote||req.body.streamName){
console.log("inif");
schoolInfo.findOne({id:req.body.scid},(err,ifound)=>{
console.log("if",ifound);
if(req.body.stdcount){
ifound.stdcount=req.body.stdcount;
}
else if(req.body.tchcount){
ifound.tchcount=req.body.tchcount;
}
else if(req.body.byquote){
ifound.DescName=req.body.byquote;
}
else if(req.body.quote){
ifound.Desc=req.body.quote;
}
else if(req.body.facultyid){
ifound.faculty.push({id:req.body.facultyid,dept:req.body.facultydept,from:req.body.facultyfrom})
}
else if(req.body.streamName){

const ncourse=new course({
 school:req.body.scid,
name:req.body.streamName,
  faculty:[],
std:[]
});
ncourse.save();
let cld_upload_stream_img=cloudinary.uploader.upload_stream({folder:"Efree/",transformation: [
  {width: "150", height: "150"}]},(err,res)=>{console.log(err,res);
var newimurl=res.secure_url.split('/');

newimurl=newimurl[newimurl.length-1];


ifound.stream.push({name:req.body.streamName,img:newimurl,id:
ncourse._id});
ifound.save();

ures.send({msg:"ok"});

});
streamifier.createReadStream(req.files.strimg.data).pipe(cld_upload_stream_img);

}

console.log("sesav");
if(!req.body.streamName){
ifound.save();}

})

}
if(!req.body.streamName){
ures.send({msg:"ok"});}
}

})

}else{res.send({"msg":"User Not Authenticated!"})}

})



app.post("/deleteSchoolitems",authenticateToken,(req,res)=>{
console.log(req.body);

school.findOne({id:req.body.id},(err,found)=>{
if(found&&found.createdBy===req.user.id){
schoolInfo.findOne({id:req.body.id},(err,ifound)=>{
if(ifound){
if(req.body.facultyInd){
let facl=ifound.faculty;
let nfacl=[];
for(var i=0;i<facl.length;i++){
if(i!=req.body.facultyInd){
nfacl.push(facl[i]);
}
}
console.log(nfacl);
ifound.faculty=nfacl;
console.log("upd",ifound);

ifound.markModified('faculty');

}else if(req.body.courseInd){

let facl=ifound.stream;
let nfacl=[];
for(var i=0;i<facl.length;i++){
if(i!=req.body.courseInd){
nfacl.push(facl[i]);
}
}
console.log(nfacl);
ifound.stream=nfacl;
console.log("upd",ifound);
ifound.markModified('stream');
}

ifound.save();
res.send({"msg":"ok"})
}

})
}

})

})

app.post("/course/info",(req,res)=>{
course.findOne({_id:req.body.id},(err,found)=>{
if(found){
console.log("info",found);
res.send({"msg":"ok","res":found});
}else{

res.send({"msg":"Nothing Found"});
}
})

})

app.post("/course/addfaculty",authenticateToken,(req,res)=>{
console.log("/info",req.body,req.user);
if(req.user){
req.body.facultyid=req.body.facultyid.trim();
school.findOne({id:req.body.scid},(err,found)=>{
console.log(err,found,found.createdBy,req.user.id,found.createdBy===req.user.id);
if(found && found.createdBy===req.user.id){
user.findOne({id:req.body.facultyid.trim()},(err,ufound)=>{
console.log("ufdf",ufound);
if(ufound){
console.log(ufound);
ufound.proof.push(req.body.coid);
ufound.save();
course.findOne({_id:req.body.coid},(err,cfound)=>{
cfound.faculty.push({id:req.body.facultyid,facultydept:req.body.facultydept,from:req.body.facultyfrom});
cfound.markModified('faculty');
cfound.save();

res.send({"msg":"ok"})
})
}else{res.send({"msg":"User Not Found with provided Id"})}

})

}else{res.send({"msg":"Not Authenticated!"})}

})

}
})




app.post("/course/deletefaculty",authenticateToken,(req,res)=>{
console.log("/info",req.body,req.user);
if(req.user){
school.findOne({id:req.body.scid},(err,found)=>{
console.log(err,found,found.createdBy,req.user.id,found.createdBy===req.user.id);
if(found && found.createdBy===req.user.id){
course.findOne({_id:req.body.coid},(err,cfound)=>{
cfound.faculty=cfound.faculty.filter((one,ind)=> ind!==parseInt(req.body.ind));
cfound.markModified('faculty');
console.log("m",cfound);
cfound.save();
res.send({"msg":"ok"})
})
}else{res.send({"msg":"Not Authenticated!"})}
})

}
})

app.post("/course/follow",authenticateToken,(req,res)=>{
console.log("/course/follow",req.body);
if(req.user){
user.findOne({id:req.user.id},(err,found)=>{
if(found){
if(found.stdof.indexOf(req.body.coid)>-1){
console.log("unfollow");
found.stdof=found.stdof.filter(one=>one!==req.body.coid);
course.findOne({_id:req.body.coid},(err,cfound)=>{
if(cfound){
cfound.std=cfound.std.filter(one=>one!==req.user.id);
cfound.save();
}
})

}else{
console.log("follow");
found.stdof.push(req.body.coid);
course.findOne({_id:req.body.coid},(err,cfound)=>{
if(cfound){
cfound.std.push(req.user.id);
cfound.save();
}
})}
found.save();
res.send({msg:"ok"});
}else{{msg:"Something went Wrong!"}}
})
}else{res.send({msg:"Please Login!"})}
})

app.post("/changeuserimage",authenticateToken,(req,ures)=>{
console.log("/changeimage",req.body,req.files);
if(req.user){
let cld_upload_stream_img=cloudinary.uploader.upload_stream({resource_type: "image", public_id: "Efree/"+req.user.id,
  overwrite: true,transformation: [
  {width: "150", height: "150"}]},(err,res)=>{
var newimurl=res.secure_url.split('/');

newimurl=newimurl[newimurl.length-1];
console.log(err,res);
ures.send({msg:"ok"});
});

streamifier.createReadStream(req.files.newimg.data).pipe(cld_upload_stream_img);
}
})

app.post("/myprofile",authenticateToken,(req,res)=>{

if(req.user){
user.findOne({id:req.user.id},(err,found)=>{
if(found){
console.log(found);
res.send({msg:"ok",user:found});
}else{

res.send({msg:"User Not found"});
}
})
}
})


app.post("/userprofile",(req,res)=>{

user.findOne({id:req.body.id},(err,found)=>{
if(found){
console.log(found);
res.send({msg:"ok",user:found});
}else{
res.send({msg:"User Not found"});
}
})

})



app.post("/myprofile/updatdesc",authenticateToken,(req,res)=>{

if(req.user){
user.findOne({id:req.user.id},(err,found)=>{
if(found){
console.log(found);
found.Desc=req.body.desc;
found.save();
res.send({msg:"ok",user:found});
}else{

res.send({msg:"User Not found"});
}
})
}

})

async function getdata(eone,res){

let allclass=[];
await eone.forEach(async (one,ind)=>{
const cone=await getone(one);
allclass.push(cone);
if(allclass.length===eone.length){
console.log("all",allclass);
const allschool=[];
allclass.forEach(async cone=>{
let schooldata=await getschool(cone.school);
console.log("cone",schooldata);
allschool.push({data:schooldata,id:cone._id});
if(allschool.length===eone.length){
console.log("scic",allschool);
res.send({"msg":"ok",result:allschool});
}
})
}
})
}

async function getone(one){
let d={};
await course.findOne({_id:one},(err,found)=>{
if(found){
console.log("f",found);
d=found;
}
})
return d;
}

async function getschool(one){

let d={};

await school.findOne({id:one},(err,found)=>{
if(found){
console.log("f",found);
d=found;
}
})
return d;
}
app.post("/schoolbasicinfo",(req,res)=>{
console.log(req.body,req.body.collid);
let allclass=[];/*
const re=await req.body.collid.forEach(async (one,ind)=>{
console.log("ind");

const re=await getdata(one);
allclass.push(re);
console.log("ind",ind);

})
*/
getdata(req.body.collid,res);
})

app.post('/upload',authenticateToken,(req,ures)=>{

console.log("/upload",req.body,req.files,req.user.id);

let cld_upload_stream_img=cloudinary.uploader.upload_stream({folder:"Efree/",transformation: [
  {width: "150", height: "150"}]},(err,res)=>{console.log(err,res);
var newimurl=res.secure_url.split('/');

newimurl=newimurl[newimurl.length-1];

const imurl=newimurl;

let cld_upload_stream_bgimg=cloudinary.uploader.upload_stream({folder:"Efree/",transformation: [
  {width: "1440", height: "400"}]},(err,res)=>{console.log(err,res);
var newbgimurl=res.secure_url.split('/');

newbgimurl=newbgimurl[newbgimurl.length-1];

const bgimurl=newbgimurl;


let cld_upload_stream_logo=cloudinary.uploader.upload_stream({folder:"Efree/",transformation: [
  {width: "100", height: "100"}]},(err,res)=>{console.log(err,res);

var logo=res.secure_url.split('/');

logo=logo[logo.length-1];

const sclogo=logo;

var curdate=new Date().getTime().toString(36);
const newid=req.body.name.replace(/[^a-zA-Z0-9]/g,'-')+"-"+curdate;

const newsc=new school({

createdBy:req.user.id,
backImg:bgimurl,
img:imurl,
location:req.body.location,
id:newid,
});
newsc.save();
console.log(newsc);
const newscInfo=new schoolInfo({
id:newid,
faculty:[],
stream:[],
logo:sclogo
});
newscInfo.save();
console.log(newscInfo);
ures.send({"msg":"ok","url":newid})
});

streamifier.createReadStream(req.files.image.data).pipe(cld_upload_stream_logo);


});

streamifier.createReadStream(req.files.backimage.data).pipe(cld_upload_stream_bgimg);

});
streamifier.createReadStream(req.files.logo.data).pipe(cld_upload_stream_img);
})

app.post('/createaccount',(req,res)=>{
req.body=req.body.data;
console.log("/createacc",req.body);

user.findOne({email:req.body.email},async (err,found)=>{

if(found){res.send({msg:"User already Exists"});return;}

else if(!found){


await bcrypt.hash(req.body.pass, saltRounds,async function(err, hash) {

 const newpass=hash;

var curdate=new Date().getTime().toString(36);
var nid=req.body.name.replace(/[^a-zA-Z0-9]/g,'-')+"-"+curdate;

var newuser=user({
email:req.body.email,
id:nid,
pass:newpass,
});

newuser.save();

const newjwt=generateAccessToken({id:newuser.id});
res.send({msg:"ok",jwt:newjwt,stdof:[],proof:[]});

});
}else{
res.send({msg:"Some error occur!"});
}
})

})


app.post('/login',(req,res)=>{
req.body=req.body.data;
console.log("/login",req.body);
user.findOne({email:req.body.email},(err,found)=>{
if(!found){console.log("nue");res.send({"msg":"Email or Password is wrong!"})}
else if(found){

bcrypt.compare(req.body.pass,found.pass, function(err, result) {
if(result){
const newjt=generateAccessToken({id:found.id});
res.send({"msg":"ok","jwt":newjt,stdof:found.stdof,proof:found.proof});
}else{
res.send({"msg":"Email or Password is wrong!"});
}
});
}else{
res.send({msg:"Something Went Wrong!"})
}
})
})

app.post('/search',(req,res)=>{
console.log(req.body);
const seaex=`.*${req.body.key}.*`
console.log("/se",req.body,seaex);
school.find({id:{"$regex" :seaex }},(err,found)=>{

console.log("f",found,err);
if(err||!found){res.send({"msg":"something went Wrong!"})}
else if(found){
res.send({"msg":"ok","result":found});
}
})

})

app.post('/viewschool',(req,res)=>{

let result={};
console.log('/viewschool',req.body);
school.findOne({id:req.body.id},(err,found)=>{
if(err||!found){res.send({msg:"Something Went Wrong"})}
else if(found){
console.log("f",found);
result['school']=found;
schoolInfo.findOne({id:req.body.id},(err,infofound)=>{

if(err||!found){res.send({msg:"Something Went Wrong"})}
else if(infofound){
console.log(infofound);

result['info']=infofound;

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
console.log(token,authHeader,req.headers);
  if (token == null)
{res.send({msg:"ok",result:result,edit:false});return;}


  jwt.verify(token,secret,async (err, user) => {
    console.log(err)
console.log("auth ",token);
    if (err) res.send({msg:"ok",result:result,edit:false});
else{
if(found.createdBy===user.id){
res.send({msg:"ok",result:result,edit:true});}
else{
res.send({msg:"ok",result:result,edit:false});
}
}

  })

}
})
}
})
})



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}${process.env.MONGODB_URL}`);
});
