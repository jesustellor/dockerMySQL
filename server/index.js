const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
  
const app = express();
const PORT = 3001;

// app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'godpower',
    database: 'reviews',
});
// sending data to the front end.
app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM movie_data"
    db.query(sqlGet, (err, result) => {
    res.send(result)        
});
})
// receiving data from the front end.
app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_data (movie_title, movie_data) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
})

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM movie_data WHERE (id = ?);"
    db.query(sqlDelete, id, (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        res.send({ message: `Successfully deleted movie with id: ${id}` });
      }
    });
  });
  
app.listen(PORT, () =>{
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    }
);