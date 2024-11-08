import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./card.jsx";
import { axiosInstance } from "../../apis/axios-instance.js";
import useCustomFetch from "../../hooks/useCustomFetch.js";

const NowPlaying = () => {
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useCustomFetch(`movie/now_playing?language=ko-KR&page=1`);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;

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
