const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
  
const app = express();
const PORT = 3306;

// app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'databases.000webhost.com/index.php',
    user: 'id19564409_phlegathetic',
    password: '!$k09}^&6g!-E\\Q',
    database: 'id19564409_reviews',
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

  app.put('/api/update', (req, res) => {
    const id = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE reviews.movie_data SET movie_data = ? WHERE (id = ?);"

    db.query(sqlUpdate, [review, id], (err, result) => {
      console.log(`${id} and ${review}`);

    })
  })
  
app.listen(PORT, () =>{
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    }
);