import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState();

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-medium mb-6 text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <img src={assets.patients_icon} alt="patients_icon" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-medium text-gray-800">{dashboardData.enrolledStudents.length}</p>
            <p className="text-sm text-gray-500">Enrolled Students</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <img src={assets.appointments_icon} alt="appointments_icon" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-medium text-gray-800">{dashboardData.totalCourses}</p>
            <p className="text-sm text-gray-500">Total Courses</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
          <div className="bg-amber-100 p-3 rounded-full">
            <img src={assets.earning_icon} alt="earning_icon" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-medium text-gray-800">
              {currency} {dashboardData.totalEarnings}
            </p>
            <p className="text-sm text-gray-500">Total Earning</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-medium mb-4 text-gray-800">Latest Enrollments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={item.student.imageUrl} 
                        alt="profile" 
                        className="h-8 w-8 rounded-full mr-3"
                      />
                      <span className="text-sm text-gray-900">{item.student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
