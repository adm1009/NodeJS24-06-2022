const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./router/user.js")
const taskRouter = require("./router/task.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000;

const multer = require("multer");
const upload = multer({
  dest:"images",
  limits:{
    fileSize:1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(doc|docx)$/)){
      return cb(new Error("file must be a word document"))
    }
    // if(!file.originalname.endsWith(".pdf")){
    //   return cb(new Error("file must be a pdf"))
    // }
    cb(undefined,true)
  }
});
// const errorMiddleware =(req,res)=>{
//   throw new Error("error from middleware");
// }
app.post("/upload", upload.single("upload"), (req,res)=>{
  res.send()
},(error,req,res,next)=>{
  res.status(400).send({error:error.message})
})

app.listen(port, () => {
  console.log("app is listening in " + port);
});

