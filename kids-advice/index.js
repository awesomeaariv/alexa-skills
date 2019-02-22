/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const content = require('./content.js');

function getAdvice() {
    
    console.log("In getAdvice 1"); 
    const randomAdvice = getAdviceFromArray();
    console.log("In getAdvice 2");
    const musicIndex = Math.floor(Math.random() * content.music.length);
    const morePromptIndex = Math.floor(Math.random() * content.morePrompt.length);
    console.log("In getAdvice 3");
    getAdvice.speechOutput = randomAdvice + content.music[musicIndex] + content.morePrompt[morePromptIndex];
    console.log("In getAdvice 4");
    return getAdvice.speechOutput;
}

function getAdviceFromArray() {
   console.log("In fromArray 1");
    getAdviceFromArray.adviceIndex = Math.floor(Math.random() * content.data.length);
    console.log("In fromArray 2");
    return content.data[getAdviceFromArray.adviceIndex];
}

const GetAdviceIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetAdviceIntent');
  },
  handle(handlerInput) {
    console.log("In getAdviceIntent 1");

    getAdvice();

    console.log("In getAdviceIntent 2");
    return handlerInput.responseBuilder
      .speak(getAdvice.speechOutput)
      .reprompt("Would you like to hear more?")
      .withSimpleCard(content.SKILL_NAME, getAdviceFromArray())
      .getResponse();
  },
};

const YesIntentHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        //console.log("Inside YesIntentHandler");
        //console.log(JSON.stringify(request));

        return (request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.YesIntent');
      },
      handle(handlerInput) {
        const speechOutput = getAdvice();

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt("Would you like to hear more?")
      .withSimpleCard(content.SKILL_NAME, getAdviceFromArray())
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
          .speak(content.STOP_MESSAGE)
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

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetAdviceIntentHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
    YesIntentHandler,
    NoIntentHandler,
    FallbackHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
