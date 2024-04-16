import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

function CitySearch() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    try {
      const response = await axios.get(`https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name&name=${value}`);
      if (response && response.data && response.data.records) {
        return response.data.records.map(city => ({
          name: city.fields.name,
          country: city.fields.country,
          timezone: city.fields.timezone,
          id: city.recordid
        }));
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };

  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}, {suggestion.country}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Search for a city...',
    value,
    onChange: onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}

export default CitySearch;