const express =require('express');
const app = express();
const http = require('http');
const order_server = "192.168.175.249:5128";
const catalog_server = "192.168.56.101:6000";
let search_memory = {}
let info_memory = {}

app.get('/search/:category',async (req,res1) => {  
    if(search_memory[req.params.category]==null){
       await http.get("http://"+catalog_server+"/api/books/category/"+req.params.category, res => {  
 
         let data = "";
    res.on("data", chunk => {
        data += chunk;
});
res.on("end", () => {
    console.log(data);
    search_memory[req.params.category] = data;
    
    let url = JSON.parse(data);
    console.log(url);
    res1.send(url);
});
});
}
else {
    console.log("cache here");
    let url = JSON.parse(search_memory[req.params.category]);
    res1.send(url);
}
});

app.get('/info/:id',async(req,res1) => {  
    if(info_memory[req.params.id]==null) {
        await http.get("http://"+catalog_server+"/api/books/"+req.params.id , res => { 
        
       
        let data = "";
        res.on("data", chunk => {
                data += chunk;
        });
        res.on("end", () => {
            console.log(data);
            info_memory[req.params.id] = data;
            let url = JSON.parse(data);
            console.log(url);
            res1.send(url);
        });
});
}
else{ 
    console.log("cache here");
    let url = JSON.parse(info_memory[req.params.id]);
    res1.send(url);
}
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
app.listen(9000);
