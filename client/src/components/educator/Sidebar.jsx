import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const {isEducator} = useContext(AppContext);
  const menuItems = [
    {name: "Dashboard", path: '/educator', icon: assets.home_icon},
    {name: "Add Course", path: '/educator/add-course', icon: assets.add_icon},
    {name: "My Course", path: '/educator/my-course', icon: assets.my_course_icon},
    {name: "Student Enrolled", path: '/educator/student-enrolled', icon: assets.person_tick_icon},
  ];
  
  return isEducator && (
    <div className="bg-white shadow-sm h-screen w-64 fixed left-0 top-16 p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <NavLink 
            to={item.path} 
            key={item.name} 
            end={item.path === '/educator'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5" />
            <p>{item.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
