const express=require('express')
const app=express()
const port=process.env.PORT || 5600
const axios=require('axios')

app.use(express.json())
//{payloadUrl:url,secret:secret}
const webhooks={
    COMMIT:[],
    PUSH:[],
    MERGE:[]
}

app.post('/api/webhooks',(req,res)=>{
  const {payloadUrl,secret,eventTypes}=req.body;
  eventTypes.forEach(eventType => {
        webhooks[eventType].push({payloadUrl,secret})
    });
    //port 201 for resource created
    res.status(201).send({message:"Webhook registered successfully"})
}
)
app.post('/api/event-emulate',(req,res)=>{
    const {type,data}=req.body;
    //business logic go here[it describes what happen when commit or push or merge happen]

    //event trigger or call webhook
    setTimeout(async()=>{
        //here the async code will run
        const webhooklist=webhooks[type]
       for(let i=0;i<webhooklist.length;i++){
           const {payloadUrl,secret}=webhooklist[i]
           console.log(payloadUrl)
         try{
            await axios.post(payloadUrl,data,{
                headers:{
                    'x-secret':secret
                }
               })
         }
         catch(err){
                console.log(err)
         }
       }
    },5000)
    res.sendStatus(200)
})

app.get('/api/db',(req,res)=>{
    res.send(webhooks)
}
)




app.listen(port,(err)=>{
    console.log(`Listening at the PORT ${port}`)
})
