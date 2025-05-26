// components/BackButton.tsx
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  onClick?: () => void;
}

const BackButton = ({ to, onClick  }: BackButtonProps) => {
  return (
    <Link
      to={to?? "/"}
      onClick={onClick}
      className="inline-flex w-9 h-9 mb-3 rounded-full border-2 border-blue-500 text-blue-500
                 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-500 
                 hover:text-white transition-colors items-center justify-center"
      aria-label="Back"
    >
      <HiArrowLeft size={18} />
    </Link>
  );
};

export default BackButton;
