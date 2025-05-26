import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const MovieBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className="inline-flex w-9 h-9 mb-3 rounded-full border-2 border-blue-500 text-blue-500
                 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-500 
                 hover:text-white transition-colors items-center justify-center"
      aria-label="Back"
    >
      <HiArrowLeft size={18} />
    </button>
  );
};

export default MovieBackButton;
