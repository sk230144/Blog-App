const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'});
const fs = require('fs');



const salt = bcrypt.genSaltSync(10);
//this string is taken just random
const secret = 'wieyruiwe73iuhifhdfhj';
///////////////////////////////////


// Middleware
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
/////////////////////





//Database Connection
mongoose.connect('mongodb+srv://risabht043:Skt230144@cluster0.xi43tgp.mongodb.net/?retryWrites=true&w=majority');
////////////////////////




//1.registration


app.post('/register', async (req, res) => {
  const  {username, password} = req.body;
  try{
    const userDoc = await User.create({username, 
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e){
      res.status(400).json(e)
  }
})


////////////////////////////////


//2. LOGIN ////////////////////


app.post('/login', async (req, res) => {
  const  {username, password} = req.body;
  const userDoc = await User.findOne({username:username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if(passOk){
    //If logged in then respond with jwt
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
     if(err) throw err;
     res.cookie('token', token).json({
      id:userDoc._id,
      username,
     });
  })
  }else{
    res.status(400).json('wrong credentials');
  }
})



//3. Check user is logged in or not

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
  if(err) throw err;
  res.json(info);
  })
})



//////////////////////////////////////////////////////////////////////////////////////


// 4.Logout function ///////////////////////////////////////////////////////////////////////



app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
})









////////////////////////////////////////////////////////////////////////////////////////


//5. Create Post ///////////////////////////////////////////////////////////////////////////


app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  // code for rename the file in his original form
  const {originalname, path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  ////////////////////////////////////////////////
  // change the name in path upload folder to its original
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);
  ////////////////////////////////////////////////////////
  //Post send in DataBase
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if(err) throw err;
    const {title, summary, content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
  })
   res.json(postDoc);
    })
});


///////////////////////////////////////////////////////////////////////////////////////////




// 6.Fetch posts from database///////////////////////////


app.get('/post', async (req, res) => {
 const posts = await Post
 .find()
 .populate('author', ['username'])
 .sort({createdAt: -1})

  res.json(posts);
})







/////////////////////////////////////////////


// 7. Display post on click//////////////////

app.get('/post/:id', async(req, res)=> {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})


////////////////////////////////////////

console.log('backend start');
app.listen(4000)


// mongodb+srv://risabht043:Skt230144@cluster0.xi43tgp.mongodb.net/?retryWrites=true&w=majority