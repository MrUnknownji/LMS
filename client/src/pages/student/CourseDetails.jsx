import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
  } = useContext(AppContext);
  
  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };
  
  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  
  return courseData ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">{courseData.courseTitle}</h1>
          <div 
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200) + "...",
            }}
          ></div>
          
          {/* Review and Ratings */}
          <div className="flex items-center space-x-4">
            <p className="text-xl font-medium text-amber-500">{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="Star"
                  className="w-4 h-4"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {courseData.courseRatings.length}
              {courseData.courseRatings.length > 1 ? " ratings" : " rating"}
            </p>
            <p className="text-sm text-gray-500">
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          
          <p className="text-gray-600">
            Course by <span className="font-medium text-blue-600">Instructor Name</span>
          </p>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <h2 className="text-xl font-medium p-4 bg-gray-50 border-b border-gray-200">Course Structure</h2>
            <div className="divide-y divide-gray-200">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="bg-white">
                  <div 
                    onClick={() => toggleSection(index)}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <img 
                        src={assets.down_arrow_icon} 
                        alt="Down Arrow Icon" 
                        className={`w-4 h-4 transition-transform duration-200 ${openSections[index] ? 'rotate-180' : ''}`}
                      />
                      <p className="font-medium">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="divide-y divide-gray-100 px-4 pb-4">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="py-2 flex items-start space-x-3">
                          <img src={assets.play_icon} alt="play icon" className="w-5 h-5 mt-1" />
                          <div className="flex-1">
                            <p className="text-gray-700">{lecture.lectureTitle}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              {lecture.isPreviewFree && (
                                <button
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  Preview
                                </button>
                              )}
                              <p className="text-xs text-gray-500">
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-800">Course Description</h3>
            <div
              className="text-gray-600 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            ></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {playerData ? (
              <div className="w-full relative pb-[56.25%]">
                <YouTube
                  videoId={playerData.videoId}
                  opts={{ 
                    width: '100%',
                    height: '100%',
                    playerVars: { 
                      autoplay: 1 
                    } 
                  }}
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            ) : (
              <img 
                src={courseData.courseThumbnail} 
                alt="course thumbnail" 
                className="w-full aspect-video object-cover"
              />
            )}
            
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-2 bg-amber-50 p-3 rounded-md">
                <img
                  src={assets.time_left_clock_icon}
                  alt="time left clock icon"
                  className="w-5 h-5"
                />
                <p className="text-sm">
                  <span className="font-medium text-amber-600">5 days</span> left at this price!
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold text-gray-800">
                    {currency}
                    {(
                      courseData.coursePrice -
                      (courseData.discount * courseData.coursePrice) / 100
                    ).toFixed(2)}
                  </p>
                  <p className="text-lg text-gray-500 line-through">
                    {currency}
                    {courseData.coursePrice.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-medium text-green-600">{courseData.discount}% off</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 py-3 border-t border-b border-gray-200">
                <div className="flex items-center space-x-1">
                  <img src={assets.star} alt="star icon" className="w-4 h-4" />
                  <p>{calculateRating(courseData)}</p>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <img src={assets.time_clock_icon} alt="time clock icon" className="w-4 h-4" />
                  <p>{calculateCourseDuration(courseData)}</p>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <img src={assets.lesson_icon} alt="lesson icon" className="w-4 h-4" />
                  <p>{calculateNoOfLectures(courseData)} lessons</p>
                </div>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              <div className="space-y-3">
                <p className="font-medium text-gray-800">What's in the course?</p>
                <ul className="space-y-2">
                  {[
                    "Lifetime access with free updates",
                    "Step-by-step, hands on project guidance",
                    "Downloadable resources and source code",
                    "Interactive quizzes and assessments",
                    "Expert instructor support",
                    "Collaborative learning environment"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
