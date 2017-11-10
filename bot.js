'use strict';
//const express = require('express');
const BootBot = require('bootbot');
const config = require('config');
const fetch = require('node-fetch');
const GIPHY_URL = process.env.GIPHY;
var bodyParser = require('body-parser')
var Botmetrics = require('botmetrics')
var badwordsList = require('badwords-list'),
    badwordsArray = badwordsList.array,
    badwordsObject = badwordsList.object,
    badwordsRegex = badwordsList.regex;

//const echoModule = require('./modules/echo');
//const helpModule = require('./modules/help');

const bot = new BootBot({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET
});

const disableInput = false;

//bot.module(echoModule);
//bot.module(helpModule);

bot.setGreetingText([
  {
    locale:'default',
    text:`Hello {{user_first_name}}~ I'm the personal bot of René, a marketing dev based in Vietnam!`
  }, {
    locale:'vi_VN',
    text:`Xin Chào {{user_first_name}}~ I'm the personal bot of René, a marketing dev based in Vietnam!`
  }
]);

bot.setGetStartedButton((payload, chat) => {
  chat.getUserProfile().then((user) => {
    chat.conversation(convo => {
      convo.ask({
        text: `Hi ${user.first_name}! Are you excited to learn more about René?`,
        quickReplies: [{
          content_type:'text',
          title:'Sure.. why not 🤔',
          payload:'quick_reply1'
        }]
    }, (payload, convo) => {
      convo.say(`Just say 'Hello' to get started 👋`).then(() => {
        convo.say(`Or say 'Help' anytime for more tips 💡`)
        convo.end()
        })
      })
    })
  })
});

bot.setPersistentMenu([
  {
    title: 'Random René fact 😆',
    type: 'postback',
    payload: 'PERSISTENT_MENU_RANDOM'
  },
  {
    title: 'What do I type? 💡',
    type: 'postback',
    payload: 'PERSISTENT_MENU_HELP'
  },
  {
    title: 'Iowadev.com',
    type: 'web_url', 
    url: 'http://iowadev.com'
  }
], disableInput);

const askRandomFact = (chat) => {
  var randomFacts = [`I love to travel. I've been to Mexico, France, Spain, Italy, Japan, South Korea, Singapore, Vietnam, and Cambodia.`,
                     `I'm addicted to podcasts. My favorite currently is NPR's How I Built This https://www.npr.org/podcasts/510313/how-i-built-this. Tell me your favorite! 🎙`,
                     `I love a good cup of coffee, how about you? ☕`,
                     `I try to spend a lot of time reading 📖. Got any book recommendations? Here's what I've read so far https://goodreads.com/reneian`,
                     `I love to create things! My favorites are programming 💻, writing 📝, & photography 📸.  Try typing 'create', 'writing', 'photography' to find out more about my creative work.`,
                     `I'm really passionate about mental health & practicing gratitude. I have an Android app you should check out sometime: https://delightful.today/ 🙏`,
                     `I'm an engineer/marketer. I have an undergrad engineering degree & MBA in marketing. If you need support with your marketing or mobile development learn more about my qualifications by typing 'resume', 'career', 'connect', 'contact'.🎓`]
  var randomFact = randomFacts[Math.floor(Math.random()*randomFacts.length)];
  chat.getUserProfile().then((user) => {
    //Put array of facts here along with image assets
       chat.say(`Here is a random fact about René...`).then(() => {
         chat.say(randomFact).then(() => {
           chat.say(`Type 'Another' for another random fact about René or 'Help' to get more tips 💡`)
         })
       });              
  }
)};

bot.hear(['hello', 'hi', 'hey'], (payload, chat, data) => {
  chat.getUserProfile().then((user) => {
    chat.say(`I appreciate you stopping by my page ${user.first_name}!`)
    askRandomFact(chat);
  })
});

bot.hear(['another','one more','random','random fact'], (payload, chat, data) => {
  chat.getUserProfile().then((user) => {
    askRandomFact(chat);
  })
});

bot.hear(['I love you'], (payload, chat, data) => {
  chat.say('Aww, I love you too my friend!').then(() => {
    chat.say('🤗🤗🤗', {typing: true});
  });
});

bot.hear(['Thank you'], (payload, chat, data) => {
  chat.say(`You're very welcome 😏`).then(() => {
    chat.say(`Thank you for being you 😉`, {typing: true});
  });
});

bot.hear(['ok','cool','sweet','sounds good'], (payload, chat, data) => {
  chat.say(`😆`);
});

var badwordsArrayFu = badwordsArray.concat('fuck you');

bot.hear(badwordsArrayFu, (payload, chat, data) => {
  chat.say(`Ohh no.. that's not very nice to say 🙊`).then(() => {
    chat.say(`Please try something PG & professional 👔`, {typing: true});
  });
});

bot.hear(['marketing','digital marketing','bot','bots','chatbot','chatbots','mobile','android','development','mobile development'], (payload, chat, data) => {
  chat.getUserProfile().then((user) => {
  chat.say(`Do you really want to talk about that ${user.first_name}!? I think we're gonna be great friends 😍`, {typing:true}).then(() => {
      chat.say(`What do you want to discuss first? 😜`);
    });
  });
});

bot.hear(['social','work','follow','create','reflect','writing','photos','photography','creative','photo','write'], (payload, chat,data) => {
  chat.say('I love writing about my life 📝').then(() => {
      chat.say('& capturing photos that tell a story 📸').then(() => {
        chat.say({
		      text: 'Find my creative work here:',
		      buttons: [
            { type: 'web_url', url: 'https://medium.com/@reneian', title: 'Medium'},
            { type: 'web_url', url: 'https://unsplash.com/@reneian', title: 'Unsplash' },
            { type: 'web_url', url: 'https://www.instagram.com/reneian/', title:'Instagram'}
		        ]
      });
    });
	});
});

bot.hear(['career','resume','programming','connect','contact'], (payload, chat,data) => {
  chat.say({
		text: 'Find my work, I love helping & connecting with new people',
		buttons: [
      { type: 'web_url', url: 'http://iowadev.com', title: 'Iowadev.com'},
      { type: 'web_url', url: 'https://github.com/renedeanda', title: 'GitHub' },
			{ type: 'web_url', url: 'https://www.linkedin.com/in/renedeanda/', title:'LinkedIn'}
		]
	});
});



bot.hear(['delightful','happiness','happy','funny','hilarious'], (payload, chat, data) => {
  var positiveItems = ['delightful','happiness','happy','funny','cute pet','puppies','puppy', 'kitten','kittens','hilarious'];
  var positiveItem = positiveItems[Math.floor(Math.random()*positiveItems.length)];
  chat.say('Finding a delightful gif...');
  fetch(GIPHY_URL + positiveItem)
    .then(res => res.json())
    .then(json => {
      chat.say({
        attachment: 'image',
        url: json.data.image_url
      }, {
        typing: true
      });
    });
});

bot.on('message', (payload, chat, data) => {
  if (!data.captured) {
	chat.say(`Your message will require a human response, if I don't respond on FB right away please do drop me a note: rene@iowadev.com 📧`);
  }
});

bot.hear(['help','what','what do I type','what do I say','are you there'], (payload, chat) => {
	chat.say({
		text: 'What do you need help with?',
		buttons: [
			{ type: 'postback', title: 'What do I type? 💡', payload: 'HELP_TYPEWHAT' },
			{ type: 'postback', title: 'Talk to René 📧' , payload: 'HELP_HUMAN' }
		]
	});
});

bot.on('postback:HELP_TYPEWHAT', (payload, chat) => {
  chat.say(`Type 'delightful' or 'happy' for a fun gif.`).then(() => {
    chat.say(`Type 'resume', 'career', 'connect', or 'contact' to learn about my professional qualifications.`).then(() => {
      chat.say(`Type 'create', 'writing', or 'photography' to find out more about my creative work.`).then(() => {
        chat.say(`Type 'random' for a random fact about me.`).then(() => {
          chat.say('😎😎😎')
        });
      });
    });
  });                      
});

bot.on('postback:PERSISTENT_MENU_HELP', (payload, chat) => {
  chat.say(`Type 'delightful' or 'happy' for a fun gif.`).then(() => {
    chat.say(`Type 'resume', 'career', 'connect', or 'contact' to learn about my professional qualifications.`).then(() => {
      chat.say(`Type 'create', 'writing', or 'photography' to find out more about my creative work.`).then(() => {
        chat.say(`Type 'random' for a random fact about me.`).then(() => {
          chat.say('😆😆😆')
        });
      });
    });
  });                       
});

bot.on('postback:HELP_HUMAN', (payload, chat) => {
  chat.say(`Drop me a note: rene@iowadev.com 📧`);                  
});

bot.on('postback:PERSISTENT_MENU_RANDOM', (payload, chat) => {
  askRandomFact(chat);                 
});


bot.start();