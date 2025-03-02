import Companies from "../../components/student/Companies";
import CoursesSection from "../../components/student/CoursesSection";
import Hero from "../../components/student/Hero";
import TestimonialSection from "../../components/student/TestimonialSection";
import CallToAction from "../../components/student/CallToAction";
import Footer from "../../components/student/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
