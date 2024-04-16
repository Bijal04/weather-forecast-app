import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CityTable({ cities, weatherData }) {
  const [filterCriteria, setFilterCriteria] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleContextMenu = (event, cityName) => {
    event.preventDefault();
    window.open(`/weather/${cityName}`, '_blank');
  };

  const filteredCities = cities.filter(city => {
    if (!filterCriteria) return true;
    return city.fields.name.toLowerCase().includes(filterCriteria.toLowerCase()) ||
           city.fields.country.toLowerCase().includes(filterCriteria.toLowerCase()) ||
           city.fields.timezone.toLowerCase().includes(filterCriteria.toLowerCase());
  });

  const sortedCities = sortCriteria ? [...filteredCities].sort((a, b) => {
    if (a.fields[sortCriteria] < b.fields[sortCriteria]) return -1;
    if (a.fields[sortCriteria] > b.fields[sortCriteria]) return 1;
    return 0;
  }) : filteredCities;

  return (
    <div>
      <h2>City Table</h2>
      <div>
        <label htmlFor="filter">Filter:</label>
        <input
          type="text"
          id="filter"
          value={filterCriteria}
          onChange={handleFilterChange}
          placeholder="Enter filter criteria"
        />
      </div>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="country">Country</option>
          <option value="timezone">Timezone</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
            <th>Day's High</th>
            <th>Day's Low</th>
          </tr>
        </thead>
        <tbody>
          {sortedCities.map((city, index) => (
            <tr key={index}>
            <td>
              <Link to={`/weather/${city.fields.name}`}>
                {city.fields.name}
              </Link>
            </td>
            <td>{city.fields.country}</td>
            <td>{city.fields.timezone}</td>
            {weatherData && (
              <React.Fragment>
                <td>{weatherData[city.fields.name].high} °C</td>
                <td>{weatherData[city.fields.name].low} °C</td>
              </React.Fragment>
            )}
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CityTable;