import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSection = () => {
  return (
    <div className="py-16 px-4 md:px-40 bg-gray-50">
      <h2 className="text-3xl font-medium text-gray-800 mb-4">Testimonials</h2>
      <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">
        Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their
        lives.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-medium text-gray-800">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt={`Rating ${i + 1}`}
                    className="w-4 h-4 mr-1"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 line-clamp-4">{testimonial.feedback}</p>
            </div>
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
