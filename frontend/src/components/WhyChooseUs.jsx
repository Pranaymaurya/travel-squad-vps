
import PropTypes from "prop-types";
import {
  faFileAlt,
  faHandHoldingDollar,
  faHandshake,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
const contents = [
  {
    icon: faFileAlt,
    title: "Log in",
    text: "The challenge facing online banks is to meet the needs.",
  },
  {
    icon: faHandshake,
    title: "Select Service",
    text: "The challenge facing online banks is to meet the needs.",
  },
  {
    icon: faHandHoldingDollar,
    title: "Select Amount",
    text: "The challenge facing online banks is to meet the needs.",
  },
  {
    icon: faThumbsUp,
    title: "Get Service",
    text: "The challenge facing online banks is to meet the needs.",
  },
];
 
const ContentItem = ({ item, index }) => (
  <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl flex flex-col justify-center items-center text-center pb-10 px-6 h-full">
    <div className="w-20 h-20 rounded-full bg-blue-600 bg-opacity-90 flex items-center justify-center -translate-y-10">
      <h1 className="font-medium text-[40px] text-white">{index}</h1>
    </div>
    <h2 className="text-2xl font-medium">{item.title}</h2>
    <div className="text-[95px] font-medium">
      <FontAwesomeIcon icon={item.icon} />
      <i className="far fa-file-alt"></i>
    </div>
  </div>
);
 
ContentItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
 
const WhyChooseUs = () => {
  return (
    <section className="  py-14 md:py-24 bg-gray-100 dark:bg-[#]  dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col max-w-xl justify-center items-center text-center mx-auto text-black">
          <h2 className="text-3xl font-bold md:text-[45px] mb-4 mt-4">
            Why Choose US
          </h2>
          <p className="text-lg opacity-80">
            We provide the highest level of customer support and build long
            lasting relationships with our clients.
          </p>
        </div>
 
        <div className="grid grid-cols-4 gap-6 gap-y-16 mt-16 lg:gap-y-0 lg:mt-12 mb-8">
          {contents.map((item, i) => (
            <div className="col-span-4 sm:col-span-2 lg:col-span-1" key={i}>
              <ContentItem index={i + 1} item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default WhyChooseUs;
 