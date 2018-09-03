// Import modules/components/methods
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link }             from 'react-router-dom';
import _                    from 'lodash';

import SurveyField    from './SurveyField.js';
import formFields     from './formFields.js';
import validateEmails from '../../utils/validateEmails.js';

// SurveyForm class component
class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (<Field component={ SurveyField }
                     type     ="text"
                     label    ={ label }
                     name     ={ name }
                     key      ={ name } />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit(this.props.onSurveySubmit) } >
          { this.renderFields() }

          <Link to       ="/surveys"
                className="red btn-flat white-text" >
            Cancel
          </Link>

          <button type     ="submit"
                  className="teal btn-flat right white-text" >
            Next

            <i className="material-icons right" >
              done
            </i>
          </button>
        </form>
      </div>
    );
  }
}

// Validate form input
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if(!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

// Export
export default reduxForm({
  validate,
  form:             'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
