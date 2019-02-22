module.exports = {
    SKILL_NAME : 'Meal Buddy',
    HELP_MESSAGE : 'This skill helps parents with mealtimes by entertaining younger ones.',
    HELP_REPROMPT : 'What can I help you with?',
    STOP_MESSAGE : 'Goodbye!',
    FALLBACK_MESSAGE : 'Sorry, I didn\'t catch that. Can you please repeat that?',
    FALLBACK_REPROMPT : 'You can say help to get instructions, or stop to quit.',
    ENDING_MESSAGE : "I hope you had a fun meal! See you next time!",

    facts : [
        " Did you know?" + " A crocodile cannot stick its tongue out. Isn't that funny?",
        " Here's a fact:" + " An ostrich's eye is bigger than its brain. Whoa! That is really cool!",
        " Fun fact:" + " Tigers have striped skin, not just striped fur. Did you know that?",
        " Here's a cool fact:" + " A cat has 32 muscles in each ear. That's a lot!",
        " I found a fact:" + " The giant squid has the largest eyes in the world. That's weird!",
        " Wow!" + " A shrimp's heart is in its head. That's strange!",
        " Did you know?" + " Elephants have four knees. So do camels. You only have two!",
        " I can't believe it!" + " Armadillos can walk under water. Can you?",
        " Whoa!" + " Sharks don't have any bones. I didn't know that!",
        " Awesome!" + " Lots of starfish have two tummies. That means they can eat more food than humans!"
    ],

    music : [
        " #KID_NAME# You might enjoy some music. Your bite should be done by the end of it." + '<audio src="https://s3.amazonaws.com/feed-my-kid-music/happy-music.mp3"/>',
        " I've got some music for you. Keep chewing while it plays." +'<audio src="https://s3.amazonaws.com/feed-my-kid-music/joy-to-the-world.mp3"/>',
        " Here is some music. Your bite should be done by the end of it." +'<audio src="https://s3.amazonaws.com/feed-my-kid-music/little-waltz.mp3"/>',
        " Here is some music. Your bite should be done by the end of it." +'<audio src="https://s3.amazonaws.com/feed-my-kid-music/marimba.mp3"/>',
        " Here is some music. Your bite should be done by the end of it." +'<audio src="https://s3.amazonaws.com/feed-my-kid-music/positive-upbeat.mp3"/>'
    ],

    jokes : [
        " Wanna hear a joke?"  + " What do you call a dinosaur that is sleeping? A diyno-snore!",
        " #KID_NAME# here's a joke:" + " Why did the student eat his homework? Because the teacher told him it was a piece of cake!",
        " This'll make you laugh #KID_NAME#!" + " What did one plate say to the other plate? Dinner is on me!",
        " This is funny #KID_NAME#!" + " Why was 6 afraid of 7? Because 7, 8, 9",
        " I found a joke!" + " What is a witch’s favorite subject in school? Spelling!",
        " I've got a joke for you!" + " Why did the cookie go to the hospital? Because he felt crummy.",
        " Let me tell you a joke!" + " How do we know that the ocean is friendly? It waves!",
        " So silly!" + " What is a computer's favorite snack? Computer chips!",
        " Will this joke make you laugh?" + " What did the nose say to the finger? Quit picking on me!",
        " Let's hear a joke!" + " Why didn’t the skeleton go to the dance? He had no body to dance with."
    ],

    interjectionsAnytime : [
        " Keep chewing #KID_NAME#!",
        " Are you still eating? Great!",
        " Don't stop #KID_NAME#",
        " You can do it!",
        " Take your next bite! #KID_NAME#",
        " Put your food in your tummy!"
    ],

    interjections75Percent : [
        " You're nearly done #KID_NAME#",
        " Is your plate empty yet? If not, then keep eating!",
        " Just a little left #KID_NAME#",
        " You done yet? You should be close!",
        " You can do it #KID_NAME#!",
        " Finish strong!"
    ],

    interjections50Percent : [
        " You're halfway there #KID_NAME#!",
        " Your plate should be half empty!",
        " I know you're almost done #KID_NAME#!",
        " Your tummy should be filling up!",
        " Don't tell me your belly's full #KID_NAME#!",
        " You're going good!"
    ],

    interjections25Percent : [
        " You're a quarter of the way there #KID_NAME#!",
        " 25 percent done!",
        " Your plate should be almost half empty #KID_NAME#!",
        " You're starting out strong!",
        " Don't give up! You just started #KID_NAME#!",
        " The starting is the toughest!"
    ]
 };