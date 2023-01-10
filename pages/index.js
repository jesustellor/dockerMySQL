// import Head from 'next/head'
// import Image from 'next/image'
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Axios from "axios";

export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [moviList, setMovieList] = useState([]);
  const [newUpdate, setNewUpdate] = useState('')

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    // alert('success on insert');
    setMovieList([...moviList, { movie_title: movieName, movie_data: review }]);
  };

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        // Update the list of movies here
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateReview = (id) => {
    console.log(id);
    Axios.put('http://localhost:3001/api/update/', {
      movieName: id,
      movieReview: newUpdate,
    });
    setNewUpdate("");
  }

  return (
    <div className={`${styles.container} ${styles.main}`}>
      <h1>Crud Application</h1>
      <label>Movie Title</label>
      <input
        type="text"
        name="movieName"
        onChange={(e) => {
          setMovieName(e.target.value);
        }}
      ></input>
      <label>Movie Review</label>
      <input
        type="text"
        name="movieReview"
        onChange={(e) => {
          setReview(e.target.value);
        }}
      ></input>

      <button onClick={submitReview}>Submit</button>

      <>
        {moviList.map((item, index) => {
          return (
            <div className={styles.card} key={index}>
              <h1>{item.movie_title}</h1>
              <p>{item.movie_data}</p>
              <button
                onClick={() => {
                  deleteReview(item.id);
                }}
              >
                Delete
              </button>
              <input type="text" onChange={(e) => {
                setNewUpdate(e.target.value)
              }}/>
              <button onClick={() => {
                updateReview(item.id)
              }}>Update</button>
            </div>
          );
        })}
      </>
    </div>
  );
}
