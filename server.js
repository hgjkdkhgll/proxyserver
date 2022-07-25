const express =require('express');
const app = express();
const http = require('http');
const order_server = "192.168.1.78";
const port ="5128";
const catalog_server = "192.168.1.28:5000";


app.get('/search/:category',(req,res1) => {  
    http.get("http://"+catalog_server+"/api/books/catgory/"+req.params.category, res => {  
        
        //res1.send(res.statusCode);
        //res1.send("\n"); 
         let data = "";
    res.on("data", chunk => {
        data += chunk;
});
res.on("end", () => {

    //data.replace(/[[]']+/g,'');
    //let url = JSON.parse(data);
    console.log(data);
    res1.send(data);
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
            try {
            data.replace(/[[]']+/g,'');
            let url = JSON.parse(data);
            console.log(url);
            res1.send(url);
            }catch(err){
                console.log("potato");
            } 
        });
});
});
app.post('/purchase/:id',(req,res1) => {  
    http.request({method:'POST',path:"/api/purchase/"+req.params.id,port:port,host:order_server} , res => {  
        
        //res1.send(res.statusCode);
        //res1.send("\n"); 
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
process.on("uncaughtException",function(err){
    console.log(err);
});