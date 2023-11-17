// This is our server. Also known as main.js

// first ma we gave command of npm init -y in terminal. This makes the package.json file
// and this project is initialized as a node js project.

//to install express we did npm i express.

// so we copy pasted this from express documentation (getting started; hello world app) 

const express = require('express')
const path = require('path')
//yo path wala line WE ADDED because tala we're using path.join
const app = express()

const port = 5001

//multer ra upload use garna uniharulai import pani ta garnuparyo ni
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {mergePdfs}  = require('./merge')
//yaha {} bhitra rakheko cause mergePdfs euta object ko form ma aairahuncha
//ani teslai destructure garnuparcha
//importing this function from merge.js file
//We're trying to import the mergePdfs 
//function from a module located in the same directory named merge.js.
//./merge specifies that the module is in the same directory.
//merge is the name of the module file without the file extension (e.g., .js).
app.use('/static', express.static('public files'))
//serving static files in exrpress("public files"  folder)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
  //aba hamile above line ma thorai change garyam express ko hello world doccumentation bhanda
  //instead of serving hello world, we're getting and serving the index.html file inside templates folder
//so aba index.html ma j change gareni server le gardincha hamro web app ma 
//tyo path.join(__dir...) is of nodejs syntax hai.
})

//app.post to post form content(i.e., pdf files); basically sending those files from  client
//to server ani server le merge garera pathaucha back to client, testo type ko web app banaira ho hami
//we also installed npm i multer, multer is used to upload files using a nodejs application
//upload means server lai pathaunu basically
//google ma express multer lekha you'll know how to take code from there as well

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
    // req.files is array of `pdf` files where max input can be 2
    // /merge is action
    console.log(req.files);
    await mergePdfs(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path))
    res.redirect("http://localhost:${port}/static/merged.pdf")
    res.send({data: req.files})
    //yo garesi aba files submit garda euta json file jasto dkhna sakchau where
    //data is being parsed. So euta uploads bhane folder bancha jata hamro client
    //bata submit gareko file aayera bascha, so that server le merge garera pathaos
  })
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
// http://localhost: etti chai hamile thape ho
// hamro server ho yo 
// aba terminal ma node server.js command diyepachi http://localhost:3000 yo chalna thalcha
// rather we'll use nodemon so that every small change garepachi server restart garna
// naparos to see the change