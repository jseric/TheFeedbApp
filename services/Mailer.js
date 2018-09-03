// Import modules
const sendgrid = require('sendgrid');

const helper = sendgrid.mail;

const keys = require('../config/keys.js');

// Mailer class
class Mailer extends helper.Mail {
  // Mailer class constructor
  constructor({ subject, recipients },
              content) {
    // Access and call methods of object's parent
    super();

    // Define and init class properties
    this.sendgridAPI = sendgrid(keys.sendGridKey);
    this.from_email  = new helper.Email('no-reply@thefeedbapp.com');
    this.subject     = subject;
    this.body        = new helper.Content('text/html', content);
    this.recipients  = this.formatAddresses(recipients);

    // Add body to Mailer obj
    this.addContent(this.body);

    // Enable click tracking in Mailer obj
    this.addClickTracking();

    // Process list of recipients
    this.addRecipients();
  }

  // Format email addresses from list of recipients
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // Enable click tracking in Mailer obj
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking    = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  // Process list of recipients
  addRecipients() {
    const personalize = new helper.Personalization();

    // Add recipients to personalize object
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    // Add personalize object to Mailer
    this.addPersonalization(personalize);
  }

  // Send object to SendGrid
  async send() {
    const request = this.sendgridAPI.emptyRequest({
      method: 'POST',
      path:   '/v3/mail/send',
      body:   this.toJSON()
    });

    const response = await this.sendgridAPI.API(request);
    return response;
  }
}

// Export Mailer class
module.exports = Mailer;
