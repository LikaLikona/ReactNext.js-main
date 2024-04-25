
import React from "react";
import { FaCloudShowersHeavy } from "react-icons/fa";

const RainInfo = ({ rainVolume }) => {
  const getDescription = () => {
    if (rainVolume > 0 && rainVolume <= 2.5) {
      return "Light rain. Grab an umbrella!";
    } else if (rainVolume > 2.5 && rainVolume <= 7.6) {
      return "Moderate rain. You might need a raincoat.";
    } else if (rainVolume > 7.6) {
      return "Heavy rain. Consider staying indoors.";
    } else {
      return "No rain expected. Enjoy the weather!";
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Rainfall</h2>
      <div className="flex items-center justify-center">
        <FaCloudShowersHeavy className="mr-2" />
        <p className="text-lg mb-2">Rainfall: {rainVolume} mm</p>
      </div>
      <p className="text-lg">{getDescription()}</p>
    </div>
  );
};

export default RainInfo;