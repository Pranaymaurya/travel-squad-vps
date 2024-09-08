// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlane,
//   faMapMarkerAlt,
//   faUsers,
//   faClock,
// } from "@fortawesome/free-solid-svg-icons";
import "boxicons/css/boxicons.min.css";

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-16 w-full">
      <div className="w-[90%] mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Box 1 */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <i className="bx bx-support text-3xl mb-4 text-blue-500"></i>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>

            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          {/* Box 2 */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <i className="bx bx-support text-3xl mb-4 text-blue-500"></i>

            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>

            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          {/* Box 3 */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <i className="bx bx-support text-3xl mb-4 text-blue-500"></i>

            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>

            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          {/* Box 4 */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
            <i className="bx bx-support text-3xl mb-4 text-blue-500"></i>

            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
