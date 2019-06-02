/**
 * Specifies a dialogue generator used for generating sentences for the villagers
 *
 * @author Thanut (Art) Parkeenvincha
 * @this {DialogueGenerator}
 */
class DialogueGenerator {
    /**
     * Constructor for DialogueGenerator.
     *
     * @constructor
     * @returns {DialogueGenerator} DialogueGenerator object created
     */
    constructor() {
        this.dialogueCommon = [ 
            "[greeting]! How can I help, \n[catchphrase]?",
            "[greeting], James Davis. \nNeed to chat about something, [catchphrase]?",
            "[greeting], James Davis! \nWhat's going on, [catchphrase]?",
            "Hi there, James Davis! \nIt's nice to see so much \nof you today, [catchphrase].",
            "[greeting]. Doing all right, [catchphrase]?",
            "James Davis again! What can\n I do for you, [catchphrase]?",
            "[greeting], James Davis! \nWhat can I do for you, [catchphrase]?",
            "Wow! I can't seem to bump \ninto anyone else \ntoday, James Davis!",
            "[greeting]! It's nice to \nsee so much of you today, [catchphrase].",
            "[greeting]! You've been \nfollowing me around so much, \nyou're like my shadow!",
            "Mmm, weather like this calls \nfor making banana bread later.",
            "On a day like today, it's \nhard not to think of one of my \nfavorite books: \nHide-and-Seek: A Memoir.",
            "So we meet again. \nWhat can I do for you, [catchphrase]?" ,
            "[greeting]. Seems quiet today, huh? \nLike, too quiet. [catchphrase]." ,
            "You again, James Davis? \nWell, that makes this a good day! \nA great day even! [catchphrase]!",
            "[greeting]. Nothing like a \nchat with me to brighten \nyour day, yeah?", 
            "[greeting]. I knew you couldn't \nstay away! I can't blame \nyou, [catchphrase]!", 
            "[greeting]! Need something, \nJames Davis?",
            "Hello, James Davis! \nYou have something else to \ntalk about today?",
            "Can I help you, James Davis?",
            "Can I do something else for you, \nJames Davis, [catchphrase]?",
            "What can I do for you, \nJames Davis, [catchphrase]?", 
            "What, you again, James Davis? \nHow many times has it BEEN today, [catchphrase]?"
        ]; 

        this.greetings = [
            "Hey",
            "Hi",
            "Howdy",
            "Well hello",
            "Sup",
            "Hi there",
            "Hello"
        ];

        this.catchphrase = [
            "yup yup",
            "yessiree",
            "you know",
            "right",
            "uh-huh",
            "oh yup"
        ];
    }

    generate()
    {
        var randDialogue = this.dialogueCommon[Math.floor(Math.random() * this.dialogueCommon.length)];
        randDialogue = randDialogue.replace("[greeting]", this.greetings[Math.floor(Math.random() * this.greetings.length)]);
        randDialogue = randDialogue.replace("[catchphrase]", this.catchphrase[Math.floor(Math.random() * this.catchphrase.length)]);
        return randDialogue;
    }
}
  