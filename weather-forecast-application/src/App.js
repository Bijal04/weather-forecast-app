import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityTable from './CityTable';

function App() {
  const [cityData, setCityData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCityData();
  }, [page]);

  const fetchCityData = async () => {
    try {
      const response = await axios.get(`https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name&_page=${page}`);
      if (response && response.data && response.data.records) {
        setCityData([...cityData, ...response.data.records]);
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  return (
    <div>
      <h1>City Data</h1>
      <CityTable cities={cityData} fetchMoreData={() => setPage(page + 1)} />
    </div>
  );
}

export default App;