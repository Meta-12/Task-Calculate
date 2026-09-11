function formatDuration(decimalHours) {
  let hours = Math.floor(decimalHours);

  let minutes = Math.round((decimalHours - hours) * 60);

  if (minutes === 60) {
    hours++;
    minutes = 0;
  }

  return `${hours}h ${minutes}m`;
}

function formatTime(totalMinutes) {
  // Handle time going past midnight
  totalMinutes = totalMinutes % (24 * 60);

  let hours = Math.floor(totalMinutes / 60);

  let minutes = Math.round(totalMinutes % 60);

  let period = hours >= 12 ? "PM" : "AM";

  let displayHours = hours % 12;

  if (displayHours === 0) {
    displayHours = 12;
  }

  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

function calculate() {
  const totalTasks = Number(document.getElementById("totalTasks").value);

  const completedTasks = Number(
    document.getElementById("completedTasks").value,
  );

  const totalHours = Number(document.getElementById("totalHours").value);

  const totalMinutes = Number(document.getElementById("totalMinutes").value);

  const breakHours = Number(document.getElementById("breakHours").value);

  const startTime = document.getElementById("startTime").value;

  // -------------------------
  // VALIDATION
  // -------------------------

  if (
    totalTasks <= 0 ||
    completedTasks < 0 ||
    totalHours < 0 ||
    totalMinutes < 0 ||
    breakHours < 0 ||
    !startTime
  ) {
    alert("Please enter all information.");
    return;
  }

  if (completedTasks > totalTasks) {
    alert("Completed tasks cannot be greater than total tasks.");

    return;
  }

  if (totalHours === 0 && totalMinutes === 0) {
    alert("Please enter the total work time.");

    return;
  }

  // -------------------------
  // TOTAL PRODUCTIVE TIME
  // -------------------------

  const totalTimeHours = totalHours + totalMinutes / 60;

  // -------------------------
  // TASKS PER HOUR
  // -------------------------

  const tasksPerHour = totalTasks / totalTimeHours;

  // -------------------------
  // COMPLETED TASK TIME
  // -------------------------

  const completedTimeHours = completedTasks / tasksPerHour;

  // -------------------------
  // PEER REVIEW TASKS
  // -------------------------

  const peerReviewTasks = totalTasks - completedTasks;

  // -------------------------
  // PEER REVIEW TIME
  // -------------------------

  const peerReviewTimeHours = peerReviewTasks / tasksPerHour;

  // -------------------------
  // START TIME
  // -------------------------

  const [startHour, startMinute] = startTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;

  // -------------------------
  // TASK END
  // -------------------------

  const taskDurationMinutes = completedTimeHours * 60;

  const taskEndMinutes = startTotalMinutes + taskDurationMinutes;

  // -------------------------
  // PEER REVIEW
  // -------------------------

  const peerReviewStartMinutes = taskEndMinutes;

  const peerReviewDurationMinutes = peerReviewTimeHours * 60;

  const peerReviewEndMinutes =
    peerReviewStartMinutes + peerReviewDurationMinutes;

  // -------------------------
  // BREAK
  // -------------------------

  // Break starts after peer review

  const breakStartMinutes = peerReviewEndMinutes;

  const breakDurationMinutes = breakHours * 60;

  const breakEndMinutes = breakStartMinutes + breakDurationMinutes;

  // -------------------------
  // WORK DAY END
  // -------------------------

  const workEndMinutes = breakEndMinutes;

  // -------------------------
  // DISPLAY RESULTS
  // -------------------------

  document.getElementById("tasksPerHour").textContent = tasksPerHour.toFixed(2);

  document.getElementById("completedResult").textContent = completedTasks;

  document.getElementById("peerReviewTasks").textContent = peerReviewTasks;

  document.getElementById("completedTime").textContent =
    formatDuration(completedTimeHours);

  document.getElementById("peerReviewTime").textContent =
    formatDuration(peerReviewTimeHours);

  document.getElementById("breakTimeResult").textContent =
    formatDuration(breakHours);

  document.getElementById("totalTime").textContent =
    `${totalHours}h ${totalMinutes}m`;

  const totalDayHours = totalTimeHours + breakHours;

  document.getElementById("totalDayTime").textContent =
    formatDuration(totalDayHours);

  // -------------------------
  // TIMELINE
  // -------------------------

  document.getElementById("workStart").textContent =
    formatTime(startTotalMinutes);

  document.getElementById("taskPeriod").textContent =
    `${formatTime(startTotalMinutes)} → ${formatTime(taskEndMinutes)}`;

  document.getElementById("reviewPeriod").textContent =
    `${formatTime(peerReviewStartMinutes)} → ${formatTime(peerReviewEndMinutes)}`;

  document.getElementById("breakPeriod").textContent =
    `${formatTime(breakStartMinutes)} → ${formatTime(breakEndMinutes)}`;

  document.getElementById("workEnd").textContent = formatTime(workEndMinutes);

  // -------------------------
  // SHOW RESULTS
  // -------------------------

  document.getElementById("results").style.display = "block";
}
