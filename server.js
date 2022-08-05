const express =require('express');
const app = express();
const http = require('http');
const order_server = "192.168.175.249:5128";
const port ="5128";
const catalog_server = "192.168.175.49:5000";
const port_out = proccess.env.PORT || 5000;


app.get('/search/:category',(req,res1) => {  
    http.get("http://"+catalog_server+"/api/books/category/"+req.params.category, res => {  
        
        //res1.send(res.statusCode);
        //res1.send("\n"); 
         let data = "";
    res.on("data", chunk => {
        data += chunk;
});
res.on("end", () => {
console.log(data);
    
    let url = JSON.parse(data);
    console.log(url);
    res1.send(url);
});
});
});

app.get('/info/:id',(req,res1) => {  
    http.get("http://"+catalog_server+"/api/books/"+req.params.id , res => { 
        
        //res1.sendStatus(res.statusCode);
        let data = "";
        res.on("data", chunk => {
                data += chunk;
        });
        res.on("end", () => {
            let url = JSON.parse(data);
            console.log(url);
            res1.send(url);
        });
});
});


app.post('/purchase/:id',(req,res1) => {  
    const url = '/api/purchase/' + req.params.id;
    const axios= require('axios');
    axios.post('http://'+order_server+url).then((res)=>{
    res1.send(res.data);
}).catch((err)=>{
    res1.status(404).json(err.response.data);
});
});
app.listen(5555);
