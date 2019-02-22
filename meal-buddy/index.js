/* eslint-disable  func-names */
/* eslint-disable  no-console */

// Adds modules
const Alexa = require('ask-sdk');
const content = require('./content.js');
const utils = require('./utils.js');

// Handles launch request
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    
    console.log("Inside LaunchRequestHandler");
    console.log(JSON.stringify(request));
    
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechOutput = 'Welcome to Meal Buddy. Who is eating today?';
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt('Who is eating today?')
      .withSimpleCard(content.SKILL_NAME, speechOutput)
      .getResponse();
  },
};

// Gets user's name
const GetNameIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    
    console.log("Inside GetNameIntentHandler");
    console.log(JSON.stringify(request));
    
    return (request.type === 'IntentRequest'
        && request.intent.name === 'getNameIntent');
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const firstName = request.intent.slots.firstname.value;

    const attributes = handlerInput.attributesManager.getSessionAttributes();
    attributes.firstName = firstName;
    // Saves session attributes
    handlerInput.attributesManager.setSessionAttributes(attributes);

    const speechOutput = `Great! For how many minutes is ${firstName} eating?`;
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt('For how many minutes?')
      .withSimpleCard(content.SKILL_NAME, speechOutput)
      .getResponse();
  },
};

// Gets how long the user is eating for
const GetMinutesIntentHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        console.log("Inside GetMinutesIntentHandler");
        console.log(JSON.stringify(request));

        return (request.type === 'IntentRequest'
            && request.intent.name === 'getMinutesIntent');
      },
      handle(handlerInput) {
        var speechMessage;
        var repromptMessage;

        const request = handlerInput.requestEnvelope.request;        
        var feedingMinutes = request.intent.slots.minutes.value;

        if (feedingMinutes > 15 || feedingMinutes < 3) {
          speechMessage = "Say a number between 3 and 15";
          repromptMessage = "Are you still there? Say a number between 3 and 15.";
        }
        else {
          const attributes = handlerInput.attributesManager.getSessionAttributes();
          attributes.feedingMinutes = feedingMinutes;
          // Saves session attributes
          handlerInput.attributesManager.setSessionAttributes(attributes);
          
          speechMessage = `Awesome! Are you ready to start your ${feedingMinutes} minute meal session?`;
          repromptMessage = "Are you ready to begin?";
        }
        
    return handlerInput.responseBuilder
      .speak(speechMessage)
      .reprompt(repromptMessage)
      .withSimpleCard(content.SKILL_NAME, speechMessage)
      .getResponse();
      },
};

// Begins entertainment (calls getEntertainment) if user is ready
const YesIntentHandler =  {
  canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;

      console.log("Inside YesIntentHandler");
      console.log(JSON.stringify(request));

      return (request.type === 'IntentRequest'
          && request.intent.name === 'AMAZON.YesIntent');
    },
    handle(handlerInput) {
      const speechOutput = getEntertainment(handlerInput);

  return handlerInput.responseBuilder
    .speak(speechOutput)
    .withSimpleCard(content.SKILL_NAME, 'Enjoy your meal!')
    .getResponse();
    },
};

// Stops skill if user is not ready
const NoIntentHandler =  {
  canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;

      console.log("Inside NoIntentHandler");
      console.log(JSON.stringify(request));

      return (request.type === 'IntentRequest'
          && request.intent.name === 'AMAZON.NoIntent');
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(content.STOP_MESSAGE)
        .getResponse();
    },
};

// Handles help requests
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(content.HELP_MESSAGE)
      .reprompt(content.HELP_REPROMPT)
      .getResponse();
  },
};

// Handles unexpected utterances
const FallbackHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;

      console.log("Inside FallbackIntentHandler");
      console.log(JSON.stringify(request));

      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(content.FALLBACK_MESSAGE)
        .reprompt(content.FALLBACK_REPROMPT)
        .getResponse();
    },
  };

// Handles stop/cancel requests
const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(content.STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

// Handles errors
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

// Custom functions that I created

// Creates SSML response
function getEntertainment(handlerInput) {

  const attributes = handlerInput.attributesManager.getSessionAttributes();
      
  var feedingMinutes = attributes.feedingMinutes;
  var firstName = attributes.firstName;
  var speechOutput = ' <say-as interpret-as="interjection">bon appetit</say-as>' + utils.addBreak(1) + `Take your first bite! Get ready ${firstName}`;
  var feedingSeconds = feedingMinutes * 60;
  const interjectionDuration = 5;
  const contentBreak = 6;
  const interjectionBreak = 2;
  const musicDuration = 25 + interjectionDuration + contentBreak + interjectionBreak;
  const factDuration = 7 + interjectionDuration + contentBreak + interjectionBreak;
  const jokeDuration = 7 + interjectionDuration + contentBreak + interjectionBreak;
  var audioCounter = 0;

  // Checks whether or not time is up
  while (feedingSeconds > 10) {
  const randomNumber = Math.floor(Math.random() * 3);
  var randomContent = "";  

    switch (randomNumber) {
      case 0 :
        if (audioCounter < 5) {
          randomContent = getMusic(); // Gets the random music
          feedingSeconds = feedingSeconds - musicDuration;
        }
        audioCounter++;
        break;
      case 1 :
        randomContent = getFact(); // Gets the random fact
        feedingSeconds = feedingSeconds - factDuration;
        break;
      case 2 : 
        randomContent = getJoke(); // Gets the random joke
        feedingSeconds = feedingSeconds - jokeDuration;
        break;
      default :
        console.log('Error. Content not found!');
    }
    if(randomContent.length > 0) {
      speechOutput += utils.addBreak(6) + randomContent + utils.addBreak(2) + getInterjection(handlerInput, feedingSeconds);
    }
  }
  
  speechOutput = speechOutput.split("#KID_NAME#").join(firstName);
  
  // For debugging purposes
  console.log("speechOutput: " + speechOutput);

  return speechOutput + " " + content.ENDING_MESSAGE;
}

// This function returns random music from the music array
function getMusic() {
  const musicIndex = Math.floor(Math.random() * content.music.length);
  return content.music[musicIndex];
}

// This function returns a random fact from the facts array
function getFact() {
  const factIndex = Math.floor(Math.random() * content.facts.length);
  return content.facts[factIndex];
}

// This function returns a random joke from the jokes array
function getJoke() {
  const jokeIndex = Math.floor(Math.random() * content.jokes.length);
  return content.jokes[jokeIndex];
}

// This function returns a random interjection from the interjections array
function getInterjection(handlerInput, feedingSeconds) {
  const attributes = handlerInput.attributesManager.getSessionAttributes();
  var totalFeedingSeconds = attributes.feedingMinutes * 60;
  var secondsPassed = totalFeedingSeconds - feedingSeconds;

  if (secondsPassed >= (totalFeedingSeconds/4) && secondsPassed < (totalFeedingSeconds/2)) {
      getInterjection.interjectionIndex = Math.floor(Math.random() * content.interjections25Percent.length);
      console.log("25% to 50%!!!");
      return content.interjections25Percent[getInterjection.interjectionIndex];
  }
  else if (secondsPassed >= (totalFeedingSeconds/2) && secondsPassed < (totalFeedingSeconds * 0.75)) {
      getInterjection.interjectionIndex = Math.floor(Math.random() * content.interjections50Percent.length);
      console.log("50% to 75%!!!");
      return content.interjections50Percent[getInterjection.interjectionIndex];
  }
  else if (secondsPassed >= (totalFeedingSeconds * 3/4) && (secondsPassed < totalFeedingSeconds)) {
      getInterjection.interjectionIndex = Math.floor(Math.random() * content.interjections75Percent.length);
      console.log("75% to 100%!!!");
      return content.interjections75Percent[getInterjection.interjectionIndex];
  }
  else {
      getInterjection.interjectionIndex = Math.floor(Math.random() * content.interjectionsAnytime.length);
      console.log("Anytime : " + secondsPassed);
      return content.interjectionsAnytime[getInterjection.interjectionIndex];
  }
}

const skillBuilder = Alexa.SkillBuilders.standard();

// Exports all handlers so the Lambda can use them
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
    FallbackHandler,
    GetMinutesIntentHandler,
    GetNameIntentHandler,
    YesIntentHandler,
    NoIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();