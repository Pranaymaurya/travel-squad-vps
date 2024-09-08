import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <section className="bg-whiteborder border border-black shadow-lg   text-gray-800 py-16 flex flex-col justify-center items-center">
      <div className=" mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 text-center md:text-left mb-12">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-bold text-2xl">Travel Squads</h2>
            <p className="opacity-50 mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <h5 className="mt-8 mb-3">Follow Us</h5>
            <ul className="flex justify-center md:justify-start space-x-3 mb-4">
              <li>
                <a
                  href="#"
                  className="bg-gray-200 text-gray-800 shadow rounded-full px-3 py-2 hover:bg-blue-600 hover:text-white transition-opacity duration-300"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-gray-200 text-gray-800 shadow rounded-full px-3 py-2 hover:bg-blue-600 hover:text-white transition-opacity duration-300"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="bg-gray-200 text-gray-800 shadow rounded-full px-3 py-2 hover:bg-blue-600 hover:text-white transition-opacity duration-300"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-gray-200 text-gray-800 shadow rounded-full px-3 py-2 hover:bg-blue-600 hover:text-white transition-opacity duration-300"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3">Menu</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  Hotels
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  Tours
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  Cab
                </a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3">Blog</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3">Company</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3">Services</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center text-center lg:text-left mt-4">
          <div className="md:col-span-1">
            <p className="opacity-50 mb-0 mt-1">
              &copy; Travel Squads, All rights reserved
            </p>
          </div>
          <div className="md:col-span-1">
            <ul className="flex justify-center md:justify-end space-x-4 mt-1">
              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  Privacy
                </a>
              </li>

              <li>
                <a
                  href="#!"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
