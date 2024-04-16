import React, { useState, useEffect } from 'react';

function CityData() {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCityData(data.records);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>City Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cityData.map((city, index) => (
            <li key={index}>
              {city.fields.name}, {city.fields.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CityData;
