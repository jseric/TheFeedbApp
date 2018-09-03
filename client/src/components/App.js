// Import modules/components/methods/styles
import React, { Component }       from 'react';
import { BrowserRouter, Route }   from 'react-router-dom';
import { connect }                from 'react-redux';

// Import all actions and import to obj actions
import * as actions from '../actions';

import Header    from './Header.js';
import Landing   from './Landing.js';
import Dashboard from './Dashboard.js';
import SurveyNew from './surveys/SurveyNew.js';

import './styles/App.css';

// App component class
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container" >
        <BrowserRouter>
          <div>
            <Header />

            <Route exact path="/"
                   component ={ Landing } />

            <Route exact path="/surveys"
                   component ={ Dashboard } />

            <Route path     ="/surveys/new"
                   component={ SurveyNew } />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

// Export App component
export default connect(null, actions)(App);
