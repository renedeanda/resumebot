# Rene DeAnda's Personal Resume Bot

This personal project is a Facebook Messenger bot using Nodejs & the BootBot framework for Messenger bots (https://github.com/Charca/bootbot).

## Getting Started
To get started you need to:

- Set up your Facebook app on Facebook

- Configure your Facebook App

  The `Callback URL` you set when configuring your app on Facebook is your Glitch project's publish URL with '/webhook' appended. The publish URL is what loads when you click 'Show' and has the format 'https://project-name.glitch.me', so for this example we used 'https://messenger-bot.glitch.me/webhook' for the Callback URL.

  The `Verify Token` is a string you make up - it's just used to make sure it is your Facebook app that your server is interacting with. 

- Copy your app credentials into the `.env` file

For more detailed setup instructions, see [Messenger Platform Quick Start](https://developers.facebook.com/docs/messenger-platform/guides/quick-start).