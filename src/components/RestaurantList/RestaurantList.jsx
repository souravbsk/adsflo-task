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
    <div className="">
      {Object.keys(restaurantData).map((state) => (
        <div key={state}>
          <ul className="list-inside mb-5 list-disc">
            <li className="font-medium mb-4 text-xl">{state}:</li>

            <ul className="list-inside ps-10 list-disc">
              {restaurantData[state].map((restaurant, index) => (
                <li key={index}>{restaurant}</li>
              ))}
            </ul>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
