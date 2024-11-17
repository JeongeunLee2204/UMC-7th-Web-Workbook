import styled from "styled-components";
import Card from "./card.jsx";
import useCustomFetch from "../../hooks/useCustomFetch.js";
import Skeleton from "@mui/material/Skeleton";

const NowPlaying = () => {
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useCustomFetch(`movie/now_playing?language=ko-KR&page=1`, "nowPlaying");

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
    return (
      <ErrorMessage>
        에러가 발생했습니다. 잠시 후 다시 시도해주세요.
      </ErrorMessage>
    );
  }

  return (
    <CardList>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </CardList>
  );
};

export default NowPlaying;

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
