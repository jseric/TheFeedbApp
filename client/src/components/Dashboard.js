// Import modules/components/methods
import React    from 'react';
import { Link } from 'react-router-dom';

import SurveyList from './surveys/SurveyList.js';

// Dasboard component
const Dashboard = () => {
  return (
    <div>
      <SurveyList />

      {/* Add survey button */}
      <div className="fixed-action-btn" >
        <Link to       ="/surveys/new"
              className="btn-floating btn-large red" >
          <i className ="material-icons" >
            add
          </i>
        </Link>
      </div>
    </div>
  );
};

// Export
export default Dashboard;
