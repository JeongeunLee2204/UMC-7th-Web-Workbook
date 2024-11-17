import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import Card from "./card.jsx";
import Skeleton from "@mui/material/Skeleton";

const fetchUpcomingMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmRmYjljOTIyMzdhY2MwYmNhYWI0ZWU5YjQ3N2YwNiIsIm5iZiI6MTcyODY2MTU1My45OTE0ODYsInN1YiI6IjY3MDkxOGVkMjY1YTVmOGJjNTcwYjY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3bmgGaGA5iwRiNdtYqLeBWYq8aiQGxYRf0hB50CQis`,
      },
    }
  );
  return response.data.results;
};

const UpComing = () => {
  const {
    data: movies = [],
    isLoading,
    isError,
    error,
  } = useQuery("upcomingMovies", fetchUpcomingMovies);

  if (isLoading) {
    return (
      <CardList>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index}>
            <Skeleton variant="rectangular" width={150} height={225} />
            <Skeleton variant="text" width={100} />
          </SkeletonCard>
        ))}
      </CardList>
    );
  }

  if (isError) {
    return <ErrorMessage>에러가 발생했습니다: {error.message}</ErrorMessage>;
  }

  return (
    <CardList>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </CardList>
  );
};

export default UpComing;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 7px;
  padding: 20px;
  background-color: #121212;
  width: 100%;
`;

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
`;
