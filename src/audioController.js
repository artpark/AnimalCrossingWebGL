/**
 * Specifies an audio controller for music and sound effects
 *
 * @author Thanut (Art) Parkeenvincha
 * @this {AudioController}
 */
class AudioController {
    /**
     * Constructor for AudioController.
     *
     * @constructor
     * @returns {AudioController} AudioController object created
     */
    constructor() {
        var date = new Date();
        var hour = date.getHours();
        var soundtrackID = "";

        // Getting the right track to play by using the time and date //
        if(hour < 12) // AM 
        {
            // If 12AM
            if(hour == 0) {soundtrackID = "12AM";}
            else {soundtrackID = hour + "AM";}
        }
        else // PM
        {
            // If 12PM
            if(hour == 12) { soundtrackID = "12PM";}
            else {soundtrackID = (hour % 12) + "PM";}
        }

        this.timeMusic = document.getElementById(soundtrackID);
    }

    playTimeMusic()
    {
        this.timeMusic.play();
    }
}
  