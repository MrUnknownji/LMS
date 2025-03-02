import { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const toggleSection = (index) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <h2 className="text-xl font-medium p-4 bg-gray-50 border-b border-gray-200">Course Structure</h2>
              <div className="divide-y divide-gray-200">
                {courseData &&
                  courseData.courseContent.map((chapter, index) => (
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
                              <img 
                                src={false ? assets.blue_tick_icon : assets.play_icon} 
                                alt="play icon" 
                                className="w-5 h-5 mt-1"
                              />
                              <div className="flex-1">
                                <p className="text-gray-700">{lecture.lectureTitle}</p>
                                <div className="flex items-center space-x-3 mt-1">
                                  {lecture.lectureUrl && (
                                    <button
                                      onClick={() =>
                                        setPlayerData({
                                          ...lecture,
                                          chapter: index + 1,
                                          lecture: i + 1,
                                        })
                                      }
                                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                      Watch
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
            
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Rate this Course:</h2>
              <Rating initialRating={0} />
            </div>
          </div>

          {/* right column */}
          <div className="lg:col-span-2">
            {playerData ? (
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <YouTube
                  videoId={playerData.lectureUrl.split("/").pop()}
                  opts={{ 
                    width: '100%',
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                  className="aspect-video"
                />
                <div className="p-4 flex justify-between items-center border-t border-gray-200">
                  <p className="font-medium text-gray-800">
                    {playerData.chapter}.{playerData.lecture}{" "}
                    {playerData.lectureTitle}
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                    {false ? "Completed" : "Mark Completed"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={courseData ? courseData.courseThumbnail : ""} 
                  alt="" 
                  className="w-full aspect-video object-cover"
                />
                <div className="p-6 text-center">
                  <h2 className="text-xl font-medium text-gray-800 mb-2">Start Learning</h2>
                  <p className="text-gray-600 mb-4">Select a lecture from the course structure to begin watching</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
