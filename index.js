/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const utils = require('./utils');
const content = require('./content');

const GetItemIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetItemIntent');
  },
  handle(handlerInput) {
    getContent();
    console.log("inside getitem");
    return handlerInput.responseBuilder
      .speak(getContent.speechOutput)
      .reprompt("Would you like to spin again?")
      .withSimpleCard(content.SKILL_NAME, getContent.cardOutput)
      .getResponse();
  },
};

const YesIntentHandler =  {
    canHandle(handlerInput) {
        console.log("In YesIntent1");
        const request = handlerInput.requestEnvelope.request;

        //console.log("Inside YesIntentHandler");
        //console.log(JSON.stringify(request));

        return (request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.YesIntent');
      },
      handle(handlerInput) {
        var speechOutput = getYesSpeechcon() + utils.addBreak(1) + getContent();
        console.log(`In speechOutput: ${speechOutput}`);
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt("Would you like to spin again?")
      .withSimpleCard(content.SKILL_NAME, getContent.cardOutput)
      .getResponse();
      },
};

const NoIntentHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        //console.log("Inside NoIntentHandler");
        //console.log(JSON.stringify(request));

        return (request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.NoIntent');
      },
      handle(handlerInput) {
        return handlerInput.responseBuilder
          .speak(getNoSpeechcon() + utils.addBreak(1) + content.STOP_MESSAGE)
          .getResponse();
      },
};


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

//Custom functions

function getContent() { 
    var typesOfContent = ['some advice', 'a fact'];
    var randomContent = Math.floor(Math.random() * typesOfContent.length);
    var randomBeginPrompt = Math.floor(Math.random() * content.beginPrompts.length);
    getContent.speechOutput = "I'll spin the wheel of fun for you " + utils.addBreak(0.5) + getWheelSound() + content.beginPrompts[randomBeginPrompt] + typesOfContent[randomContent] + utils.addBreak(2);
    
    var cardContent = "";
    
    if (randomContent === 0) {
      getContent.speechOutput = getContent.speechOutput + getAdvice() + utils.addBreak(1) + getMorePrompt();
      cardContent = getAdvice.cardContent;
    }
    else if (randomContent === 1) {
      getContent.speechOutput = getContent.speechOutput + getFact() + utils.addBreak(1) + getMorePrompt();
      cardContent = getFact();
    }
    else {
      console.log("Sux 2BU!!!");
    }    
    getContent.cardOutput = cardContent;
    return getContent.speechOutput;
}

function getMorePrompt() {
    const morePromptIndex = Math.floor(Math.random() * content.morePrompt.length);
    return content.morePrompt[morePromptIndex];
}

function getYesSpeechcon() {
  const yesSpeechconIndex = Math.floor(Math.random() * content.yesSpeechcons.length);
  return content.yesSpeechcons[yesSpeechconIndex];
}

function getNoSpeechcon() {
  const noSpeechconIndex = Math.floor(Math.random() * content.noSpeechcons.length);
  return content.noSpeechcons[noSpeechconIndex];
}

function getWheelSound() {
  const wheelSoundIndex = Math.floor(Math.random() * content.wheelSounds.length);
  return content.wheelSounds[wheelSoundIndex];
}

function getFact() {
  const factIndex = Math.floor(Math.random() * content.facts.length);
  return content.facts[factIndex];
}

function getAdvice() {
  const adviceIndex = Math.floor(Math.random() * content.advice.length);
  const sfxIndex = Math.floor(Math.random() * content.sfx.length);
  getAdvice.cardContent = content.advice[adviceIndex];
  return content.sfx[sfxIndex];
}


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetItemIntentHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
    YesIntentHandler,
    NoIntentHandler,
    FallbackHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
