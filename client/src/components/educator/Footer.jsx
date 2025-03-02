import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <img src={assets.logo} alt="logo" className="h-8 mb-2" />
          <p className="text-gray-500 text-sm">Copyright {new Date().getFullYear()} All Rights Reserved</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
            <img src={assets.facebook_icon} alt="facebook" className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
            <img src={assets.twitter_icon} alt="twitter" className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
            <img src={assets.instagram_icon} alt="instagram" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
