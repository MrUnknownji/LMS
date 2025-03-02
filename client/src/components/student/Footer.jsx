import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <img src={assets.logo_dark} alt="logo" className="h-8" />
          <p className="text-gray-400 max-w-xs">
            Empowering learners worldwide with quality education and skills for the future.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Company</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Subscribe to our newsletter</h2>
          <p className="text-gray-400">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-200 border border-gray-400"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-gray-800">
        <p className="text-center text-gray-400">Copyright © {new Date().getFullYear()} Edemy - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

