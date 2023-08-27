const http=require("http");
const fs=require("fs");
const requests=require("requests");
const homeFile=fs.readFileSync("index.html","utf-8");
 const replaceVal=(tempVal,orgVal)=>{
      let temperature=tempVal.replace("{%tempvalue%}",orgVal.main.temp);
      temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
      temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
      temperature=temperature.replace("{%location%}",orgVal.name);
      temperature=temperature.replace("{%country%}",orgVal.sys.country);
      temperature=temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
      return temperature;
 };  
 
 const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=London&appid=829739715b3cc64687d6a902753b7ec1')
          .on('data',  (chunk)=> {
           const objData=JSON.parse(chunk);
           const arrData=[objData];
          // console.log(arrData[0].main.temp);
            const realTimeData=arrData.map((val)=>replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
            // console.log(realTimeData);
    })
   .on('end',  (err)=> {
   if (err) return console.log('connection closed due to errors', err);
   res.end();
   // console.log('end');
});
    }
 });
 server.listen(4000,"127.0.0.1");