import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } =
    useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 8 },
    { lectureCompleted: 5, totalLectures: 9 },
    { lectureCompleted: 10, totalLectures: 10 },
    { lectureCompleted: 7, totalLectures: 11 },
    { lectureCompleted: 8, totalLectures: 12 },
    { lectureCompleted: 9, totalLectures: 13 },
  ]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Enrollments</h1>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrolledCourses.map((course, index) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={course.courseThumbnail} 
                          alt="" 
                          className="h-16 w-24 object-cover rounded"
                        />
                        <div className="flex-1 max-w-md">
                          <p className="text-sm font-medium text-gray-900 mb-1">{course.courseTitle}</p>
                          <Line
                            strokeWidth={2}
                            strokeColor="#3B82F6"
                            trailWidth={2}
                            trailColor="#E5E7EB"
                            percent={
                              (progressArray[index].lectureCompleted /
                                progressArray[index].totalLectures) *
                              100
                            }
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculateCourseDuration(course)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {progressArray[index] &&
                        `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}{" "}
                      <span className="text-xs text-gray-400">Lectures</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => navigate("/player/" + course._id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          progressArray[index] &&
                          progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {progressArray[index] &&
                        progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1
                          ? "Completed"
                          : "Continue Learning"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {enrolledCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No courses enrolled yet</h3>
            <p className="text-gray-600 mb-6">Explore our course catalog and start learning today!</p>
            <button 
              onClick={() => navigate("/course-list")}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
