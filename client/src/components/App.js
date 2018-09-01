// Import modules/components/methods
import React, { Component }       from 'react';
import { BrowserRouter, Route }   from 'react-router-dom';
import { connect }                from 'react-redux';

// Import all actions and import to obj actions
import * as actions from '../actions';

import Header  from './Header.js';
import Landing from './Landing.js';

// React router components
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

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
                   component={ Landing } />

            <Route exact path="/surveys"
                   component={ Dashboard } />

            <Route path="/surveys/new"
                   component={ SurveyNew } />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

// Export App component
export default connect(null, actions)(App);
