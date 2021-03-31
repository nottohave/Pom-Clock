var click = new Audio("PikaPika.mp3")
var sessionFinished = new Audio("Dramatic-Pikachu-Voice.mp3")
var breakFinished = new Audio("PikaPi.mp3")
var pause = "";

var breakLength;
var sessionLength;
var minutes_interval;
var seconds_interval;
var statusButton;
var timerMessage;
var minutes; // timer running minutes
var seconds; // timer running seconds

window.onload = function() {
  breakLength = document.getElementById("break-length");
  sessionLength = document.getElementById("session-length");
  statusButton = document.getElementById("start_stop");
  timerMessage = document.getElementById("timerMessage");
  minutes = document.getElementById("minutes");
  seconds = document.getElementById("seconds");
}

// decrease break value by one, break can not be less than 1min
function decrementBreak() {
  if (breakLength.innerText === "1") {
    breakLength.innerText = 1;
  } else {
    breakLength.innerText = parseFloat(breakLength.innerText) - 1;
  }
}

// increase break value by one, can not be over 60 min
function incrementBreak() {
  if (breakLength.innerText === "60") {
    breakLength.innerText = 60;
  } else {
    breakLength.innerText = parseFloat(breakLength.innerText) + 1;
  }
}
// decrease session value by 1, session can not be < 1
function decrementSession() {
  if (sessionLength.innerText === "1") {
    sessionLength.innerText = 1;
  } else {
    sessionLength.innerText = parseFloat(sessionLength.innerText) - 1;
  }
  //update the decrement minutes of session length to the session timer display
  let decrementSessionValue = sessionLength.innerText;
  document.getElementById("minutes").innerText = decrementSessionValue;
}

// increase session value by 1, session cant be > 60;
function incrementSession() {
  if (sessionLength.innerText === "60") {
    sessionLength.innerText = 60;
  } else {
    sessionLength.innerText = parseFloat(sessionLength.innerText) + 1;
  }
  //update the increment minutes of session length to the session timer display
  let incrementSessionValue = sessionLength.innerText;
  document.getElementById("minutes").innerText = incrementSessionValue;
}

// restart timer to the default when window first load
function reset() {
  clearInterval(minutes_interval);
  clearInterval(seconds_interval);
  breakLength.innerText = "5";
  sessionLength.innerText = "25";
  document.getElementById("minutes").innerText = sessionLength.innerText;
  document.getElementById("seconds").innerText = "00";
  document.getElementById("timerMessage").innerHTML = "";
}

// create all the functions for one button. Later do the same when break timer start
function start_stop() {

  // pause condition for the break timer
  if (statusButton.innerText === "Pause-Break") {
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    statusButton.innerText = "Break-continue";
    timerMessage.innerHTML = "Break timer is paused";
    // Apply the current minute and seconds and run the timer from there
  } else if (statusButton.innerText === "Break-continue") {

    let minutes = parseFloat(document.getElementById("minutes").innerHTML);
    let seconds = parseFloat(document.getElementById("seconds").innerHTML);

    minutes_interval = setInterval(minutesTimer, (1000 * 60));
    seconds_interval = setInterval(secondsTimer, (1000));

    function minutesTimer() {
      minutes = minutes - 1;
      document.getElementById("minutes").innerHTML = minutes;
    }

    function secondsTimer() {
      seconds = seconds - 1;
      document.getElementById("seconds").innerHTML = seconds;
      // When break timer is finished, stop the run, restart button to Start, play the audio
      if (seconds <= 0) {
        if (minutes <= 0) {
          clearInterval(minutes_interval);
          clearInterval(seconds_interval);

          statusButton.innerText = "Start";
          timerMessage.innerText = "Break is completed. Should you come back to work?";
          breakFinished.play();
        }
        seconds = 60;
      }
    }
  } else {
    // for Pause condition, pause the session timer
    if (statusButton.innerText === "Paused") {
      clearInterval(minutes_interval);
      clearInterval(seconds_interval);
      statusButton.innerText = "Continue";
      timerMessage.innerHTML = "Timer is paused";
      // for continue condition, the current time display on the timer should resume ticking
    } else if (statusButton.innerText === "Continue") {
      // assign the current session minutes to a variable then run them
      //assign global minutes and seconds, then assign the current minutes and seconds to the variable
      // that i desire to change in continue condition
      let minutes = parseFloat(document.getElementById("minutes").innerText);
      let seconds = parseFloat(document.getElementById("seconds").innerText);

      minutes_interval = setInterval(minutesTimer, (1000 * 60));
      seconds_interval = setInterval(secondsTimer, (1000));

      function minutesTimer() {
        minutes = minutes - 1;
        document.getElementById("minutes").innerHTML = minutes;
      }

      function secondsTimer() {
        seconds = seconds - 1;
        document.getElementById("seconds").innerHTML = seconds;

        if(seconds <= 0) {
          if (minutes <= 0) {
            //when session timer reach 0:0 in the continue state. Start the break timer.
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);

            document.getElementById("timerMessage").innerHTML = "Session completed! Break will start."
            sessionFinished.play();
            breakSession();
          }
          seconds = 60;
        }
        statusButton.innerText = "Start";
        timerMessage.innerHTML = "Timer is continue";
      }
    } else { // run timer under Start condition
      click.play(); // play the audio clip when start button is triggered
      clearInterval(minutes_interval);
      clearInterval(seconds_interval);
      // set button status to the next state, timer message that current timer has started
      timerMessage.innerHTML = "Timer has started";
      statusButton.innerText = "Paused";

      let minutes = parseFloat(sessionLength.innerText) - 1;
      let seconds = 59;

      //link the minutes and seconds from here to the session clock then test
      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;

      // 1000 ms, 60s for 1min. 1000ms for 1s
      minutes_interval = setInterval(minutesTimer, (1000 * 60));
      seconds_interval = setInterval(secondsTimer, (1000));

      function minutesTimer() {
        minutes = minutes - 1;
        document.getElementById("minutes").innerHTML = minutes;
      }

      function secondsTimer() {
        seconds = seconds - 1;
        document.getElementById("seconds").innerHTML = seconds;

        // start timer for the break when work is finished
        if(seconds <= 0) {
          if (minutes <= 0) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);

            document.getElementById("timerMessage").innerHTML = "Break-timer started."
            statusButton.innerText = "Pause-Break";
            sessionFinished.play();
            breakSession();
            //Start the timer for the break session after session is finished on "Start"
          } seconds = 60;
        }
      }
    }
  }
}

function breakSession() {

    // Obtain the break minutes and update it to the variable
    let minutes = parseFloat(breakLength.innerText) - 1;
    let seconds = 59;

    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // 1000 ms, 60s for 1min. 1000ms for 1s
    minutes_interval = setInterval(minutesTimer, (1000 * 60));
    seconds_interval = setInterval(secondsTimer, (1000));

    function minutesTimer() {
      minutes = minutes - 1;
      document.getElementById("minutes").innerHTML = minutes;
    }

    function secondsTimer() {
      seconds = seconds - 1;
      document.getElementById("seconds").innerHTML = seconds;

    // When break timer is finished, stop the run, restart button to Start, play the audio
    if (seconds <= 0) {
      if (minutes <= 0) {
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);

        statusButton.innerText = "Start";
        timerMessage.innerText = "Break is completed. Should you come back to work?";
        breakFinished.play();
      }
      seconds = 60;
    }
  }
}
