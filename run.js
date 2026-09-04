    function formatTime(decimalHours) {

      let hours = Math.floor(decimalHours);

      let minutes = Math.round(
        (decimalHours - hours) * 60
      );

      // If minutes becomes 60
      if (minutes === 60) {
        hours++;
        minutes = 0;
      }

      return `${hours}h ${minutes}m`;
    }


    function calculate() {

      const totalTasks =
        Number(document.getElementById("totalTasks").value);

      const completedTasks =
        Number(document.getElementById("completedTasks").value);

      const totalHours =
        Number(document.getElementById("totalHours").value);

      const totalMinutes =
        Number(document.getElementById("totalMinutes").value);


      // Validation

      if (
        totalTasks <= 0 ||
        completedTasks < 0 ||
        totalHours < 0 ||
        totalMinutes < 0
      ) {
        alert("Please enter valid numbers.");
        return;
      }


      if (completedTasks > totalTasks) {
        alert("Completed tasks cannot be greater than total tasks.");
        return;
      }


      if (totalHours === 0 && totalMinutes === 0) {
        alert("Please enter the total time.");
        return;
      }


      // Convert total time to hours

      const totalTimeHours =
        totalHours + (totalMinutes / 60);


      // Tasks per hour

      const tasksPerHour =
        totalTasks / totalTimeHours;


      // Completed task time

      const completedTimeHours =
        completedTasks / tasksPerHour;


      // Peer Review tasks

      const peerReviewTasks =
        totalTasks - completedTasks;


      // Peer Review time

      const peerReviewTimeHours =
        peerReviewTasks / tasksPerHour;


      // Display results

      document.getElementById("tasksPerHour").textContent =
        tasksPerHour.toFixed(2);


      document.getElementById("completedResult").textContent =
        completedTasks;


      document.getElementById("peerReviewTasks").textContent =
        peerReviewTasks;


      document.getElementById("completedTime").textContent =
        formatTime(completedTimeHours);


      document.getElementById("peerReviewTime").textContent =
        formatTime(peerReviewTimeHours);


      document.getElementById("totalTime").textContent =
        `${totalHours}h ${totalMinutes}m`;


      // Show results

      document.getElementById("results").style.display =
        "block";
    }
