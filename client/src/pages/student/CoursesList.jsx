import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import CourseCard from "../../components/student/CourseCard";
import Footer from "../../components/student/Footer";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourses(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase()),
            ),
          )
        : setFilteredCourses(tempCourses);
    }
  }, [allCourses, input]);
  
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">Courses List</h1>
            <p className="text-gray-600">
              <span 
                onClick={() => navigate("/")}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Home
              </span>{" "}
              /{" "}
              <span className="text-gray-800">Course List</span>
            </p>
          </div>
          <div className="max-w-xl mx-auto mt-8">
            <SearchBar data={input} />
          </div>
        </div>
        
        {input && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
              <p className="text-sm text-gray-700">Search results for: <span className="font-medium text-blue-600">{input}</span></p>
              <img
                src={assets.cross_icon}
                alt=""
                className="w-4 h-4 cursor-pointer"
                onClick={() => navigate("/course-list")}
              />
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
