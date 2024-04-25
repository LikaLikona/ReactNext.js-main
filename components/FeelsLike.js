// FeelsLike.js
import React from "react";

const FeelsLike = ({ actualTemperature, feelsLikeTemperature }) => {
  // Calculate the temperature difference
  const temperatureDifference = feelsLikeTemperature - actualTemperature;

  // Determine the description based on the temperature difference
  let description = "";
  if (temperatureDifference < 0) {
    description = "Feels colder than the actual temperature.";
  } else if (temperatureDifference > 0) {
    description = "Feels warmer than the actual temperature.";
  } else {
    description = "Feels the same as the actual temperature.";
  }

  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-3">
      <h2 className="text-2xl font-bold mb-4">Feels Like</h2>
      <p className="text-xl mb-2 font-bold">{feelsLikeTemperature}Â°C</p>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default FeelsLike;