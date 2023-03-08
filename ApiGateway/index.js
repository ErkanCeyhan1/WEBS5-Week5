const express = require('express');
const http = require('http');
const proxy = require('axios-express-proxy');

const BLOGSERVICE = 'http://localhost:3015';
const COMMENTSERVICE = 'http://localhost:3014';

let app = express();
app.use(express.json()); //json 

const CircuitBreaker = require('opossum');

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000 // After 30 seconds, try again.
};


const breaker = new CircuitBreaker(proxy.Proxy, options);
breaker.fallback(() => 'Sorry, out of service right now');
breaker.on('fallback', (result) => { 
    console.log('Circuit-breaker fallback: ', result)
    throw result;
});

app.post('/posts', forward(BLOGSERVICE)); 
app.post('/comment', forward(COMMENTSERVICE));

app.listen(3000, () => {
    console.log('API Gateway started on port 3000')
});

function forward(service) {
    return (req, res) => {
        console.log(`Forwarding to service: ${service}${req.originalUrl}`);
        breaker.fire(service + req.originalUrl, req, res).catch(err => {
            console.log(`Service failure: ${service}, sending failure response to user`);
            res.status(500).send(err);
        });
    }
}