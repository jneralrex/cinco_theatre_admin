import React from "react";

const SingleEvent = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 truncate">
            {event.eventName || "Event Name"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-200"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            <strong className="font-medium">Host:</strong> {event.eventHost || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium">Date:</strong>{" "}
            {event.eventDate ? new Date(event.eventDate[0]).toLocaleDateString() : "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong className="font-medium">Time:</strong> {event.eventTime || "N/A"}
          </p>

          <div className="text-sm text-gray-600">
            <strong className="font-medium">Location:</strong>
            {event.location && event.location.length > 0 ? (
              event.location.map((loc, index) => (
                <div key={index} className="mb-4">
                  <p><strong>State:</strong> {loc.location[0].state}</p>
                  {loc.location[0].cities && loc.location[0].cities.length > 0 ? (
                    <ul className="list-disc pl-6">
                      {loc.location[0].cities.map((city, cityIndex) => (
                        <li key={cityIndex}>
                          <p><strong>City:</strong> {city.city}</p>
                          <p><strong>Street:</strong> {city.street}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No cities available.</p>
                  )}
                </div>
              ))
            ) : (
              <p>No location available.</p>
            )}
          </div>

          {event.flyerImage && (
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={event.flyerImage}
                alt="Event flyer"
                className="w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
