import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";

const Modal = ({ open, onClose, title, description, img }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay fixed w-[100vw] h-[100vh] flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-container bg-white p-8 rounded-md w-[90%] max-w-[600px] relative overflow-hidden">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="close-icon absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
        />
        <div className="modal-content overflow-y-auto max-h-[80vh]">
          <h2 className="modal-title text-2xl font-bold mb-4">{title}</h2>
          <img src={img} alt={title} className="modal-image mb-4 w-full" />
          {Array.isArray(description) ? (
            <ul className="list-disc pl-4">
              {description.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;