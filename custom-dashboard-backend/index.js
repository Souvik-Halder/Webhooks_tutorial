const express=require('express')
const app=express()
const port=process.env.PORT || 5601

const messages=[];

app.use(express.json())


app.post('/api-info',(req,res)=>{
  const data=req.body;
  messages.push(data)
    res.status(201).send({message:"Data added successfully"})
}
)
app.get('/',(req,res)=>{
 res.status(200).json(messages)
}
)
app.listen(port,(err)=>{
    console.log(`Listening at the PORT ${port}`)
}
)