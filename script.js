
// ========================================
// LOAD SAVED VALUES
// ========================================

window.addEventListener("DOMContentLoaded", function () {

  const savedBreakTime =
    localStorage.getItem("breakTime");

  if (savedBreakTime !== null) {

    document.getElementById("breakHours").value =
      savedBreakTime;

  }


  const savedEndTime =
    localStorage.getItem("endTime");

  if (savedEndTime !== null) {

    document.getElementById("endTime").value =
      savedEndTime;

  }

});


// ========================================
// FORMAT DURATION
// ========================================

function formatDuration(decimalHours) {

  let hours =
    Math.floor(decimalHours);

  let minutes =
    Math.round(
      (decimalHours - hours) * 60
    );

  if (minutes === 60) {

    hours++;
    minutes = 0;

  }

  return `${hours}h ${minutes}m`;
}


// ========================================
// FORMAT TIME
// ========================================

function formatTime(totalMinutes) {

  totalMinutes =
    totalMinutes % (24 * 60);

  let hours =
    Math.floor(totalMinutes / 60);

  let minutes =
    Math.round(totalMinutes % 60);

  let period =
    hours >= 12 ? "PM" : "AM";

  let displayHours =
    hours % 12;

  if (displayHours === 0) {
    displayHours = 12;
  }

  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}


// ========================================
// CONVERT TIME TO MINUTES
// ========================================

function timeToMinutes(time) {

  const [hours, minutes] =
    time.split(":").map(Number);

  return (hours * 60) + minutes;
}


// ========================================
// CALCULATE
// ========================================

function calculate() {

  const totalTasks =
    Number(
      document.getElementById("totalTasks").value
    );


  const completedTasks =
    Number(
      document.getElementById("completedTasks").value
    );


  const adhocTasks =
    Number(
      document.getElementById("adhocTasks").value
    );


  const breakHours =
    Number(
      document.getElementById("breakHours").value
    );


  const meetingMinutes =
    Number(
      document.getElementById("meetingMinutes").value
    );


  const startTime =
    document.getElementById("startTime").value;


  const endTime =
    document.getElementById("endTime").value;


  // ========================================
  // VALIDATION
  // ========================================

  if (
    totalTasks <= 0 ||
    completedTasks < 0 ||
    adhocTasks < 0 ||
    breakHours < 0 ||
    meetingMinutes < 0 ||
    !startTime ||
    !endTime
  ) {

    alert("Please enter all required information.");

    return;
  }


  // ========================================
  // CHECK TASK TOTAL
  // ========================================

  const usedTasks =
    completedTasks +
    adhocTasks;


  if (usedTasks > totalTasks) {

    alert(
      "Main Tasks + Adhoc Tasks cannot be greater than Total Tasks."
    );

    return;
  }


  // ========================================
  // PEER REVIEW
  // ========================================

  const peerReviewTasks =
    totalTasks -
    completedTasks -
    adhocTasks;


  // ========================================
  // WORK TIME
  // ========================================

  let startTotalMinutes =
    timeToMinutes(startTime);


  let endTotalMinutes =
    timeToMinutes(endTime);


  if (endTotalMinutes <= startTotalMinutes) {

    endTotalMinutes += 24 * 60;

  }


  // ========================================
  // TOTAL DAY TIME
  // ========================================

  const totalDayMinutes =
    endTotalMinutes -
    startTotalMinutes;


  // ========================================
  // BREAK
  // ========================================

  const breakMinutes =
    breakHours * 60;


  // ========================================
  // PRODUCTIVE WORK TIME
  //
  // Example:
  // 9h total
  // - 1h break
  // - 1h meeting
  // = 7h productive
  // ========================================

  const productiveMinutes =
    totalDayMinutes -
    breakMinutes -
    meetingMinutes;


  if (productiveMinutes <= 0) {

    alert(
      "Break time + Meeting time cannot be greater than the total work period."
    );

    return;
  }


  const totalTimeHours =
    productiveMinutes / 60;


  // ========================================
  // TASK RATE
  // ========================================

  const tasksPerHour =
    totalTasks /
    totalTimeHours;


  // ========================================
  // TASK DURATIONS
  // ========================================

  const completedTimeHours =
    completedTasks /
    tasksPerHour;


  const adhocTimeHours =
    adhocTasks /
    tasksPerHour;


  const peerReviewTimeHours =
    peerReviewTasks /
    tasksPerHour;


  // ========================================
  // SAVE SETTINGS
  // ========================================

  localStorage.setItem(
    "breakTime",
    breakHours
  );


  localStorage.setItem(
    "endTime",
    endTime
  );


  // ========================================
  // TIMELINE
  // ========================================

  const taskDurationMinutes =
    completedTimeHours * 60;


  const taskStartMinutes =
    startTotalMinutes;


  const taskEndMinutes =
    taskStartMinutes +
    taskDurationMinutes;


  const adhocStartMinutes =
    taskEndMinutes;


  const adhocDurationMinutes =
    adhocTimeHours * 60;


  const adhocEndMinutes =
    adhocStartMinutes +
    adhocDurationMinutes;


  const reviewStartMinutes =
    adhocEndMinutes;


  const reviewDurationMinutes =
    peerReviewTimeHours * 60;


  const reviewEndMinutes =
    reviewStartMinutes +
    reviewDurationMinutes;


  const meetingStartTimeline =
    reviewEndMinutes;


  const meetingEndTimeline =
    meetingStartTimeline +
    meetingMinutes;


  const breakStartMinutes =
    meetingEndTimeline;


  const breakEndMinutes =
    breakStartMinutes +
    breakMinutes;


  // ========================================
  // RESULTS
  // ========================================

  document.getElementById(
    "tasksPerHour"
  ).textContent =
    tasksPerHour.toFixed(2);


  document.getElementById(
    "completedResult"
  ).textContent =
    completedTasks;


  document.getElementById(
    "peerReviewTasks"
  ).textContent =
    peerReviewTasks;


  document.getElementById(
    "completedTime"
  ).textContent =
    formatDuration(
      completedTimeHours
    );


  document.getElementById(
    "peerReviewTime"
  ).textContent =
    formatDuration(
      peerReviewTimeHours
    );


  document.getElementById(
    "breakTimeResult"
  ).textContent =
    formatDuration(
      breakHours
    );


  document.getElementById(
    "totalTime"
  ).textContent =
    formatDuration(
      totalTimeHours
    );


  document.getElementById(
    "totalDayTime"
  ).textContent =
    formatDuration(
      totalDayMinutes / 60
    );


  // ========================================
  // SHOW / HIDE ADHOC
  // ========================================

  const adhocResultCard =
    document.getElementById("adhocResultCard");

  const adhocTimeCard =
    document.getElementById("adhocTimeCard");

  const adhocTimeline =
    document.getElementById("adhocTimeline");


  if (adhocTasks > 0) {

    adhocResultCard.style.display = "block";

    adhocTimeCard.style.display = "block";

    adhocTimeline.style.display = "flex";


    document.getElementById(
      "adhocResult"
    ).textContent =
      adhocTasks;


    document.getElementById(
      "adhocTime"
    ).textContent =
      formatDuration(
        adhocTimeHours
      );

  } else {

    adhocResultCard.style.display = "none";

    adhocTimeCard.style.display = "none";

    adhocTimeline.style.display = "none";

  }


  // ========================================
  // SHOW / HIDE MEETING
  // ========================================

  const meetingResultCard =
    document.getElementById("meetingResultCard");

  const meetingTimeline =
    document.getElementById("meetingTimeline");


  if (meetingMinutes > 0) {

    meetingResultCard.style.display = "block";

    meetingTimeline.style.display = "flex";


    document.getElementById(
      "meetingTimeResult"
    ).textContent =
      formatDuration(
        meetingMinutes / 60
      );


    document.getElementById(
      "meetingPeriod"
    ).textContent =
      `${formatTime(meetingStartTimeline)} → ${formatTime(meetingEndTimeline)}`;

  } else {

    meetingResultCard.style.display = "none";

    meetingTimeline.style.display = "none";

  }


  // ========================================
  // TIMELINE
  // ========================================

  document.getElementById(
    "workStart"
  ).textContent =
    formatTime(
      startTotalMinutes
    );


  document.getElementById(
    "taskPeriod"
  ).textContent =
    `${formatTime(taskStartMinutes)} → ${formatTime(taskEndMinutes)}`;


  if (adhocTasks > 0) {

    document.getElementById(
      "adhocPeriod"
    ).textContent =
      `${formatTime(adhocStartMinutes)} → ${formatTime(adhocEndMinutes)}`;

  }


  document.getElementById(
    "reviewPeriod"
  ).textContent =
    `${formatTime(reviewStartMinutes)} → ${formatTime(reviewEndMinutes)}`;


  document.getElementById(
    "breakPeriod"
  ).textContent =
    `${formatTime(breakStartMinutes)} → ${formatTime(breakEndMinutes)}`;


  document.getElementById(
    "workEnd"
  ).textContent =
    formatTime(
      endTotalMinutes
    );


  // ========================================
  // SHOW RESULTS
  // ========================================

  document.getElementById(
    "results"
  ).style.display =
    "block";
}

