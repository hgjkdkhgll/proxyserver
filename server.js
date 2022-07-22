const express =require('express');
const app = express();
const http = require('http');
const order_server = "192.168.1.5:5000";
const catalog_server = "192.168.1.6";
const port ="5000";


app.get('/search/:category',(req,res1) => {  
    http.get("http://"+catalog_server+"/books?filter="+req.params.category, res => {  
        
        res1.send(res.statusCode);
        res1.send("\n"); 
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

app.get('/info/:id',(req,res1) => {  
    get("http://"+catalog_server+"/books/"+req.params.id , res => {  
        
        res1.send(res.statusCode);
        res1.send("\n"); 
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
    request({method:'POST',path:"/purchase/"+req.params.id,port:port,host:order_server} , res => {  
        
        res1.send(res.statusCode);
        res1.send("\n"); 
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
app.listen(5000);