import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Learn anything, anytime, anywhere
        </h1>
        <p className="text-gray-600 md:text-lg">
          With our platform, you can access a vast library of courses from top
          universities and institutions around the world. Whether you're a
          beginner or an advanced learner, we have something for everyone. Join
          our community today and start your journey towards a brighter future!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Get started
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            Learn more
            <img src={assets.arrow_icon} alt="arrow icon" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
