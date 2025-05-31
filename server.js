const http = require('http')
const path = require('path')
const fs  = require ('fs')
const url  = require ('url')

let apiKey = "5dc26b3c12d147a199d110155251005"

 const indexHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'index.html'))
 const scriptFile = fs.readFileSync(path.join(__dirname, 'static', 'script.js'))
  const cssFile = fs.readFileSync(path.join(__dirname, 'static', 'style.css'))

let server = http.createServer(function(req, res) {
    if (req.method == 'GET') {
        switch(req.url) {
            case '/': 
             return res.end(indexHtmlFile)
            case '/style.css':
             res.writeHead(200, { 'Content-Type': 'text/css'});
             return res.end(cssFile)
          case '/script.js': 
            return res.end(scriptFile)
        }
    }
    if (req.method == 'POST') {
            switch(req.url) {
                case '/api/city': 
                  return getWeather(req, res)
            }
    }

    res.statusCode = 404
      return res.end('Error 404')
})

server.listen(process.env.PORT || 3000)


function getWeather(req, res) {
    let body = '';
 req.on('data', chunk => {
    body += chunk;
 });
      req.on('end', async () => {
        try {
            const { city } = JSON.parse(body);

            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=uk&days=3`);
            const weatherData = await response.json();
            console.log(weatherData)
            
            res.writeHead(200, {'Content-Type': 'application/json' });
            res.end(JSON.stringify(weatherData));
        } catch (err) {
           console.error(err);
           res.writeHead(500, {'Content-Type': 'application/json' });
           res.end(JSON.stringify({ error: err.message || 'Помилка сервера'}));
        }     
     });
}