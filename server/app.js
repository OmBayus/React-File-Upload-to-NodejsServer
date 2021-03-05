const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")

const app = express()

app.use('/uploads', express.static('uploads'))

app.use(cors())

app.use(fileUpload())


app.post("/api/upload",(req,res,next)=>{
      if(req.files === null){
            return res.status(400).json({msg:"No file uploaded"})
      }

      const file = req.files.file


      file.mv(`${__dirname}/uploads/${file.name}`,err=>{
            if(err){
                  console.error(err)
                  return res.status(500).send(err)
            }

            res.json({fileName:file.name,filePath:`http://localhost:4000/uploads/${file.name}`,name:req.body.name})
      })
})


app.listen(4000,()=>console.log("Server Started"))