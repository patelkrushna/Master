const http=require("http");
console.log("object");
const server= http.createServer((req, res) => {
    console.log(req.url);
    res.end("Hello, world!");
});
server.listen(4000,()=>{
    console.log("server is running on port 4000");
})