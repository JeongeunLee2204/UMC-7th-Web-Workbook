import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "./card.jsx";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmRmYjljOTIyMzdhY2MwYmNhYWI0ZWU5YjQ3N2YwNiIsIm5iZiI6MTcyODY2MTU1My45OTE0ODYsInN1YiI6IjY3MDkxOGVkMjY1YTVmOGJjNTcwYjY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3bmgGaGA5iwRiNdtYqLeBWYq8aiQGxYRf0hB50CQis`,
            },
          }
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getNowPlayingMovies();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러가 발생했습니다: {error}</p>;

  return (
    <CardList>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </CardList>
  );
};

export default Popular;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 7px;
  padding: 20px;
  background-color: #121212;
  width: 100%;
`;
