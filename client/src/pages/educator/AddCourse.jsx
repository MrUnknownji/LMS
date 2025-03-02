import uniqid from "uniqid";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0
              ? chapters.slice(-1)[0].chapterOrder + 1
              : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-medium mb-6 text-gray-800">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="space-y-2">
          <p className="font-medium text-gray-700">Course Title</p>
          <input
            type="text"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course title"
          />
        </div>
        
        <div className="space-y-2">
          <p className="font-medium text-gray-700">Course Description</p>
          <div ref={editorRef} className="h-48 border border-gray-300 rounded-md"></div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-gray-700">Course Price</p>
          <input
            type="number"
            onChange={(e) => setCoursePrice(e.target.value)}
            value={coursePrice}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course price"
          />
        </div>

        <div className="space-y-2">
          <p className="font-medium text-gray-700">Course Thumbnail</p>
          <label 
            htmlFor="thumbnailImage"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {!image ? (
              <>
                <img src={assets.file_upload_icon} alt="" className="w-8 h-8 mb-2" />
                <p className="text-sm text-gray-500">Click to upload thumbnail</p>
              </>
            ) : (
              <img
                src={image ? URL.createObjectURL(image) : ""}
                alt="file upload"
                className="h-full object-contain"
              />
            )}
            <input
              type="file"
              id="thumbnailImage"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              hidden
            />
          </label>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-gray-700">Discount %</p>
          <input
            type="number"
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter discount percentage"
          />
        </div>

        {/* Adding Chapters and Lectures */}
        <div className="space-y-4 border border-gray-200 rounded-md p-4">
          <h2 className="text-xl font-medium text-gray-800">Course Content</h2>
          
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="border border-gray-200 rounded-md overflow-hidden">
              <div className="flex justify-between items-center bg-gray-50 p-3">
                <div className="flex items-center space-x-2">
                  <img 
                    src={assets.dropdown_icon} 
                    alt="" 
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="font-medium">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{chapter.chapterContent.length} Lectures</span>
                  <img 
                    src={assets.cross_icon} 
                    alt="" 
                    onClick={() => handleChapter("remove", chapter.chapterId)} 
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>
              
              {!chapter.collapsed && (
                <div className="p-3 space-y-2 bg-white">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span className="text-sm">
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} min -{" "}
                        <a href={lecture.lectureUrl} target="_blank" className="text-blue-600 hover:underline">
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img 
                        src={assets.cross_icon} 
                        alt="" 
                        onClick={() => handleLecture("remove", chapter.chapterId, lectureIndex)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  ))}

                  <div 
                    onClick={() => handleLecture("add", chapter.chapterId)}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center space-x-1 text-sm p-2"
                  >
                    <span>+</span>
                    <span>Add Lecture</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div 
            onClick={() => handleChapter("add")}
            className="flex items-center justify-center p-3 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-blue-600 font-medium">+ Add Chapter</span>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <h2 className="text-xl font-medium mb-4">Add Lecture</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Lecture Title</p>
                    <input
                      type="text"
                      value={lectureDetails.lectureTitle}
                      onChange={(e) =>
                        setLectureDetails({
                          ...lectureDetails,
                          lectureTitle: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter lecture title"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Duration (minutes)</p>
                    <input
                      type="number"
                      value={lectureDetails.lectureDuration}
                      onChange={(e) =>
                        setLectureDetails({
                          ...lectureDetails,
                          lectureDuration: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter duration in minutes"
                    />
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 mb-1">Lecture URL</p>
                    <input
                      type="text"
                      value={lectureDetails.lectureUrl}
                      onChange={(e) =>
                        setLectureDetails({
                          ...lectureDetails,
                          lectureUrl: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter YouTube URL"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPreviewFree"
                      checked={lectureDetails.isPreviewFree}
                      onChange={(e) =>
                        setLectureDetails({
                          ...lectureDetails,
                          isPreviewFree: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="isPreviewFree" className="text-sm text-gray-700">
                      Is Preview Free?
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={addLecture}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                <img
                  onClick={() => setShowPopup(false)}
                  src={assets.cross_icon}
                  alt=""
                  className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
        
        <button 
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          ADD COURSE
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
