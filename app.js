const mysql = require ('mysql2');
const express = require('express');
var app=express();

//const bodyparser = require('body-parser');

//app.use(bodyparser.json);



const pool = mysql.createConnection({
    host: 'localhost',
    database : 'assignment',
    user : 'root',
    password : 'sai6$8pia'
});

pool.connect(function (err) {
      if(err) throw err;
      console.log("connected");
});

app.listen(3000,()=>console.log('Express server is running at port no :3000'));

app.get('/api/v1/longest-duration-movies' , (req,res)=> {
       pool.query('SELECT tconst,primaryTitle, runtimeMinutes, genres FROM movies ORDER BY runtimeMinutes DESC LIMIT 10' , (err,result,fields)=>{
            res.send(JSON.stringify(result));
       });
});

app.get('/api/v1/top-rated-movies', (req,res)=>{
    pool.query('SELECT ratings.averageRating,movies.tconst,movies.primaryTitle,movies.genres FROM ratings JOIN movies ON ratings.tconst = movies.tconst WHERE  ratings.averageRating > 6.0 ORDER BY  ratings.averageRating ' , (err,result,fields)=>{
        res.send(JSON.stringify(result));
   });
});
