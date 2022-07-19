const express = require('express');
const app = express();
const order_server = "192.168.1.5:3000";
const catalog_server = "192.168.1.6:3000";
const http = require("http");

app.get('/search/:category',(req) => {  
    http.get("http://"+catalog_server+"/books?filter="+req.params.category , res =>respons(res));
});
function respons(res){
    let data = "";
    res.on("data", chunk => {
        data += chunk;
});
res.on("end", () => {
    let url = JSON.parse(data);
    console.log(url);
});
}