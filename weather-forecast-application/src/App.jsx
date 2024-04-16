import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CityTable from './CityTable';
import WeatherPage from './WeatherPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={CityTable} />
          <Route path="/weather/:cityName" component={WeatherPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
