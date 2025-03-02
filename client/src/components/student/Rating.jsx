import { useEffect, useState } from "react";

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-2xl cursor-pointer ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            } hover:text-yellow-400 transition-colors`}
            onClick={() => handleRating(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
