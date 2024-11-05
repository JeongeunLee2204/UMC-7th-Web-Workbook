import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar.jsx";
import Sidebar from "./sidebar.jsx";
import Outlet from "./outlet.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import styled from "styled-components";
import Movies from "./pages/movies.jsx";
import Search from "./pages/search.jsx";
import NowPlaying from "./pages/movies/now-playing.jsx";
import Popular from "./pages/movies/popular.jsx";
import TopRated from "./pages/movies/top-rated.jsx";
import UpComing from "./pages/movies/up-coming.jsx";
import MovieInfo from "./pages/movies/movieInfo.jsx";

const StyledNavbar = styled(Navbar)`
  width: 100%;
  height: 60px;
`;

const ContentContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

function App() {
  return (
    <Router>
      <StyledNavbar />
      <ContentContainer>
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/now-playing" element={<NowPlaying />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/upcoming" element={<UpComing />} />
          <Route path="/movies/:movieID" element={<MovieInfo />} />
          <Route path="/*" element={<Outlet />} />
        </Routes>
      </ContentContainer>
    </Router>
  );
}

export default App;
