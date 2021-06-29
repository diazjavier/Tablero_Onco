function chartPorcPeriodo(chartElement) {

  // Set new default font family and font color to mimic Bootstrap's default styling
  // Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  // Chart.defaults.global.defaultFontColor = '#858796';

  // Pie Chart Example
  // var ctx = document.getElementById("chartPorcPeriodo");
  var ctx = chartElement.getContext('2d');
  var chartPorcPeriodo = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Transcurrido", "Pendiente"],
      datasets: [{
        data: [90, 10],
        backgroundColor: ['rgba(50, 193, 47, 1)', 'rgba(174, 180, 174, 1)'],
        hoverBackgroundColor: ['#17a673', 'rgba(134, 142, 134, 1)'],
        hoverBorderColor: ['rgba(47, 75, 193, 0.7)', 'rgba(50, 193, 47, 0.7)'],
      }],
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'PROPORCIÓN DEL PERÍODO TRANSCURRIDO: ',
        fontFamily: 'Tahoma',//'Arial',
        fontWeight: 'bold',
        fontColor: 'rgb(129, 129, 129)',
        fontStyle: 'normal',
        fontSize: 20
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      // cutoutPercentage: 80,
    },
  });
  return chartPorcPeriodo;
};
