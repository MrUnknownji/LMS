import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  return (
    <Link 
      to={"/course/" + course._id} 
      onClick={() => scrollTo(0, 0)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img 
        src={course.courseThumbnail} 
        alt={course.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-medium text-gray-800 line-clamp-2">{course.courseTitle}</h3>
        <p className="text-sm text-gray-600">Educator name</p>
        <div className="flex items-center space-x-2">
          <p className="font-medium text-amber-500">{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt="Star"
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">({course.courseRatings.length})</p>
        </div>
        <p className="font-bold text-gray-800">
          {currency}{" "}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
