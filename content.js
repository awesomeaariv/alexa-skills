module.exports = {
    
    SKILL_NAME : 'Wheel of Fun',
    HELP_MESSAGE : 'You can say spin the wheel of fun, or, you can say exit... What can I help you with?',
    HELP_REPROMPT : 'What can I help you with?',
    STOP_MESSAGE : 'Goodbye!',
    FALLBACK_MESSAGE : 'Sorry, I didn\'t catch that. Would you like to spin the wheel?',
    FALLBACK_REPROMPT : 'You can say yes to have more fun or no to stop.',

    advice : [
        "Never trust a dog to watch your food.",
        "When your dad is mad and asks you 'Do I look stupid?', don't answer.",
        "Never tell your mom her diet's not working.",
        "Never pee on an electric fence.",
        "Don't pull Dad's finger when he tells you to.",
        "When your mom is mad at your dad, don't let her brush your hair.",
        "Never let your three-year old brother in the same room as your school assignment.",
        "Don't sneeze in front of mom when you're eating crackers.",
        "A puppy always has bad breath - even after eating a Tic-Tac.",
        "You can't hide a piece of broccoli in a glass of milk.",
        "Don't wear polka-dot underwear under white shorts.",
        "If you want a kitten, start out by asking for a horse.",
        "Felt-tip markers are not good to use as lipstick.",
        "Don't pick on your sister when she's holding a baseball bat.",
        "When you get a bad grade in school, show it to your mom when she's on the phone."

    ],

    facts : [
    " A crocodile cannot stick its tongue out.",
    " An ostrich's eye is bigger than its brain. Whoa! That is really cool!",
    " Tigers have striped skin, not just striped fur.",
    " A cat has 32 muscles in each ear. That's a lot!",
    " The giant squid has the largest eyes in the world. That's weird!",
    " A shrimp's heart is in its head. That's strange!",
    " Elephants have four knees. So do camels. You only have two!",
    " Armadillos can walk under water. Can you?",
    " Sharks don't have any bones. I didn't know that!",
    " Lots of starfish have two tummies. That means they can eat more food than humans!"
    ],

    wheelSounds : [
        '<audio src = "https://s3.amazonaws.com/wheel-of-fun/wheel-spin-1.mp3"/>',
        '<audio src = "https://s3.amazonaws.com/wheel-of-fun/wheel-spin-2.mp3"/>'
    ],

    morePrompt : [
        " Would you like to spin the wheel again?",
        " Would you like to spin the wheel once more?",
        " Want to spin again?",
        " Should I keep going?",
        " Should I keep the fun going?",
        " Do you want to continue the fun?"
    ],

    beginPrompts : [
        `The Wheel of Fun has decided to give you `,
        `The wheel has given you `,
        `The Wheel has thought hard, and will give you `,
        `Let's see what the wheel of fun suggests. It says to give you `,
        `Wow, I spun the wheel of random fun for you, and you're going to enjoy `,
        `Okie doke, I spun the wheel of random fun, and you got `,
        `I asked the wheel of fun for its fun-times wisdom, and it landed on `,
        `Alright, let me spin the wheel of fun. It says give `,
        `Alrighty, I asked the wheel of fun for an idea, and it says you should get `,
        `Let's see, I spun the wheel of fun, and it says it's time for `
    ],

    yesSpeechcons : [
        ' <say-as interpret-as = "interjection">as you wish</say-as>',
        ' <say-as interpret-as = "interjection">okey dokey</say-as>'
    ],

    noSpeechcons : [
        ' <say-as interpret-as = "interjection">bummer</say-as>',
        ' <say-as interpret-as = "interjection">darn</say-as>'
    ],

    sfx : [
        '<audio src="https://s3.amazonaws.com/alexa-sound-effects/toing-jelly-effect.mp3"/>',
        '<audio src="https://s3.amazonaws.com/alexa-sound-effects/jokesoundeffect.mp3"/>',
        '<audio src="https://s3.amazonaws.com/alexa-sound-effects/failsoundeffect.mp3"/>',
        '<audio src="https://s3.amazonaws.com/alexa-sound-effects/whawha.mp3"/>'
    ]
};