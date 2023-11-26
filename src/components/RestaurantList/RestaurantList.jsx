import React, { useEffect, useState } from "react";

const RestaurantList = () => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("/data.json")
          .then((res) => res.json())
          .then((jsonData) => {
            const organizedData = jsonData.reduce((acc, restaurant) => {
              const { state, restaurant_name } = restaurant;
              if (!acc[state]) {
                acc[state] = [];
              }
              acc[state].push(restaurant_name);
              return acc;
            }, {});

            setRestaurantData(organizedData);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(restaurantData);

  return (
    <div className="flex flex-wrap items-start justify-between gap-6">
      {Object.keys(restaurantData).map((state) => (
        <div key={state}>
          <h3 className="font-medium mb-5 text-xl">{state}:</h3>
          <ul className="list-inside list-decimal">
            {restaurantData[state].map((restaurant, index) => (
              <li key={index}>{restaurant}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
