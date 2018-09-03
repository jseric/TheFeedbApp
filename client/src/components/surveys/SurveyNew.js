// Import modules/components/methods
import React, { Component } from 'react';
import { reduxForm }        from 'redux-form';

import SurveyForm       from './SurveyForm.js';
import SurveyFormReview from './SurveyFormReview.js';

// SurveyNew class component
class SurveyNew extends Component {
  state = {
    showFormReview: false
  };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={ () => this.setState({ showFormReview: false }) }/>
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={ () => this.setState({ showFormReview: true }) } />
    );
  }

  render() {
    return (
      <div>
        { this.renderContent() }
      </div>
    );
  }
}

// Export
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
