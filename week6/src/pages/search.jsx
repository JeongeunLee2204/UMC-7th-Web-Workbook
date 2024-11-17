import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axios-instance";
import Card from "./movies/Card";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #121212;
  color: white;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 10px;
  margin: 20px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
`;

const SkeletonAnimation = keyframes`
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #c0c0c0;
  }
  100% {
    background-color: #e0e0e0;
  }
`;

const SkeletonCard = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  animation: ${SkeletonAnimation} 1.5s infinite;
`;

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let debounceTimeout;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      fetchMovies(searchQuery);
    } else {
      setMovies([]);
      setHasSearched(false);
    }
  }, [location.search]);

  const fetchMovies = async (query) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axiosInstance.get(`/search/movie`, {
        params: { query },
      });
      setMovies(response.data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      navigate(`?query=${newQuery}`);
      fetchMovies(newQuery);
    }, 500);
  };

  const handleMovieClick = (movieID) => {
    navigate(`/movie/${movieID}`);
  };

  return (
    <Container>
      <div>
        <SearchInput
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="영화 제목을 입력하세요"
        />
      </div>
      {loading ? (
        <CardGrid>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </CardGrid>
      ) : (
        <CardGrid>
          {movies && movies.length > 0
            ? movies.map((movie) => (
                <Card
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))
            : hasSearched && <p>검색 결과가 없습니다.</p>}
        </CardGrid>
      )}
    </Container>
  );
};

export default Search;
