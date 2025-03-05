import React from "react";

const SingleEvent = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-2xl lg:max-w-4xl mx-4 md:mx-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 truncate">
            {event?.eventName || "Event Name"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition duration-200"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-base text-gray-700">
            <span className="font-medium">Host:</span> {event?.eventHost || "N/A"}
          </p>
          <p className="text-base text-gray-700">
            <span className="font-medium">Date:</span>{" "}
            {event?.eventDate?.length > 0
              ? new Date(event.eventDate[0]).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-base text-gray-700">
            <span className="font-medium">Time:</span>{" "}
            {event?.eventTime?.length > 0 ? event.eventTime[0] : "N/A"}
          </p>

          {/* Theatre & Location */}
          <div className="text-base text-gray-700">
            <span className="font-medium">Theatre:</span>{" "}
            {event?.theatre?.theatreName || "N/A"}
          </div>
          {/* <div className="text-base text-gray-700">
            <span className="font-medium">Location:</span>
            {event?.theatre?.location ? (
              <div className="mt-2">
                <p className="font-medium text-gray-800">
                  {event.theatre.location.state || "No state available"}
                </p>
                {event.theatre.location.cities?.length > 0 ? (
                  <ul className="list-disc pl-6 text-gray-600">
                    {event.theatre.location.cities.map((city, cityIndex) => (
                      <li key={cityIndex}>
                        <p>
                          <span className="font-medium">City:</span> {city.city}
                        </p>
                        <p>
                          <span className="font-medium">Street:</span> {city.street}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No cities available.</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No location available.</p>
            )}
          </div> */}

          {/* Flyer Image */}
          {event?.flyerImage && (
            <div className="rounded-lg overflow-hidden shadow-md max-w-50">
              <img
                src={event.flyerImage}
                alt="Event flyer"
                className="w-full object-contain max-h-48"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-8 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
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
