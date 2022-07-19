const express = require('express');
const app = express();
const order_server = "192.168.1.5:3000";
const catalog_server = "192.168.1.6";
const port ="3000";
const http = require("http");
const { url } = require('inspector');

app.get('/search/:category',(req) => {  
    http.get("http://"+catalog_server+"/books?filter="+req.params.category , res => {  
        
        console.log(res.statusCode);
        console.log("\n"); 
         let data = "";
    res.on("data", chunk => {
        data += chunk;
});
res.on("end", () => {
    let url = JSON.parse(data);
    console.log(url);
});
});
});

app.get('/info/:id',(req) => {  
    http.get("http://"+catalog_server+"/books/"+req.params.id , res => {  
        
        console.log(res.statusCode);
        console.log("\n"); 
         let data = "";
    res.on("data", chunk => {
        data += chunk;
});
res.on("end", () => {
    let url = JSON.parse(data);
    console.log(url);
});
});
});
app.post('/purchase/:id',(req) => {  
    http.request({path:"/purchase/"+req.params.id,port:port,host:order_server} , res => {  
        
        console.log(res.statusCode);
        console.log("\n"); 
         let data = "";
    res.on("data", chunk => {
        data += chunk;
});
res.on("end", () => {
    let url = JSON.parse(data);
    console.log(url);
});
});
});
app.listen(3000);