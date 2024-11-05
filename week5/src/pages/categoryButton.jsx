import "./categoryButton.css";
import { useNavigate } from "react-router-dom";

const CategoryButton = ({ text, image, destination }) => {
  const navigate = useNavigate();
  return (
    <button
      className="button-container"
      onClick={() => navigate("/" + destination)}
    >
      <img src={image} alt="error" className="button-image" />
      <span className="button-text">{text}</span>
    </button>
  );
};

export default CategoryButton;
