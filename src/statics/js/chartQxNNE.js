function getChartQxNNE(chartElement) {

  var ctx = chartElement.getContext('2d');
  var chartQxNNE = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Comarsa", "Varadero"],
      datasets: [{
        data: [],
        backgroundColor: ['rgba(47, 75, 193, 1)', 'rgba(50, 193, 47, 1)'],
        hoverBackgroundColor: ['#2e59d9', '#17a673'],
        hoverBorderColor: ['rgba(47, 75, 193, 0.7)', 'rgba(50, 193, 47, 0.7)'],
      }],
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Consumo por proveedor'
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
        display: true
      },
      // cutoutPercentage: 80,
    },
  });
  return chartQxNNE;
};
