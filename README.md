# **TheFeedbApp**

## Get feedback. When you need it, we'll provide it.

Web application for getting feedback from multiple users.
Do you own a product? Do you want to hear from your users? Are you tired of sending the same 10,000 mails per month?
Then use TheFeedbApp! You enter your email content, and your users' email addresses, and we'll contact them for you!

## Link to web page

https://stark-caverns-62285.herokuapp.com/

## Installation

1) Clone the repository

2) Install the node modules (NPM required!)
    ```Bash
    npm install
    ```

3) Run the app in the first console
    ```Bash
    npm run dev
    ```
4) Run the SSH connection in the second console
    ```Bash
    npm run webhook
    ```
    
    or
    
    ```Bash
    ssh -R <YOUR_RANDOM_STRING>:80:localhost:5000 serveo.net
    ```
    
## NOTE

- You need the development keys to run the app, and, for security reasons,
  they are not included in this repository. 
  If you are working on this app, ask one of the developers to give you the
  dev keys.

- Some of the features of this app will not work in the development enviroment,
  because some of the features, like SendGrid's click notifications, have to be
  set up first for your personal case.
  
  
