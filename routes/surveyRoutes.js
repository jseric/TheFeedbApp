// Import modules
const mongoose = require('mongoose');
const _        = require('lodash');
const Path     = require('path-parser');
const { URL }  = require('url');

const requireLogin   = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');

const Mailer         = require('../services/Mailer.js');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');

const Survey = mongoose.model('surveys');

// Export routes
module.exports = app => {
  // Route handler to fetch all surveys by user
  // Path: /api/surveys
  // Type: GET
  app.get(
    '/api/surveys',
    requireLogin,
    async (req, res) => {
      // Find surveys by user
      const surveys = await Survey.find({
        _user: req.user.id
      }).select({
        // Exclude recipient list
        recipients: false
      });

      // Send response with surveys
      res.send(surveys);
    }
  );


  // Route handler for fetching survey answer data
  // Path: /api/surveys/webhooks
  // Type: POST
  app.post(
    '/api/surveys/webhooks',
    (req, res) => {
      const parserObj = new Path('/api/surveys/:surveyId/:choice');

      _.chain(req.body)
        .map(({ email, url }) => {
          // Parse path and get survey ID and answer
          const match = parserObj.test(new URL(url).pathname);
          if (match) {
            return {
              email,
              surveyId: match.surveyId,
              choice:   match.choice
            };
          }
        })
        // Remove undefined events
        .compact()
        // Remove double events
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
          // Update database records
          Survey.updateOne({
            _id:         surveyId,
            recipients: {
              $elemMatch: {
                email:     email,
                responded: false
              }
            }
          }, {
            $inc: {
              [choice]: 1
            },
            $set: {
              'recipients.$.responded': true
            },
            lastResponded: new Date()
          })
          .exec();
        })
        .value();

      res.send({});
    }
  );

  // Route handler for survey answer feedback
  // Path: /api/surveys/<surveyId>/<choice>
  // Type: GET
  app.get(
    '/api/surveys/:surveyId/:choice',
    (req, res) => {
      res.send('Thanks for voting!');
    }
  );

  // Route handler for creating a survey
  // Path: /api/surveys
  // Type: POST
  app.post(
    '/api/surveys',
    requireLogin,
    requireCredits,
    async (req, res) => {
      // Fetch data from request
      const {title, subject, body, recipients } = req.body;

      // Create new survey
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients
                      .split(',')
                      .map(email => ({
                        email:     email.trim(),
                      })),
        _user: req.user.id,
        dateSent: Date.now()
      });

      // Send survey email
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();

        // Save survey to database
        await survey.save();

        // Charge the user (deduct credits)
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
      }
      catch (err) {
        // Send error status 422 (Unprocessable entity)
        res.status(422).send(err);
      }
    }
  );
};
