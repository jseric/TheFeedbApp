// Import modules/components/methods
import React from 'react';

// Export SurveyField component
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>
        { label }
      </label>

      <input { ...input }
             style={{ marginBottom: '5px' }} />

      <div className="red-text"
           style={{ marginBottom: '20px' }} >
        {/* If touched==true -> show error*/}
        { touched && error }
      </div>

    </div>
  );
};
