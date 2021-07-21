function chartComparativa2(chartElement){

  // var ctx = document.getElementById('comparativa').getContext('2d');
  var ctx = chartElement.getContext('2d');

  if(window.chartChartComparativa2 != undefined && window.chartChartComparativa2 != null){
    window.chartChartComparativa2.destroy();
  };
  window.chartChartComparativa2 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Basal', 'Utima mediana vigente'],
      datasets: [{
          label: 'Mediana basal',
          data: [],
          backgroundColor: 'rgba(101, 153, 213, 0.75)'
        },
        {
          label: 'Diferencia utima mediana vigente',
          data: [],
          backgroundColor: 'rgba(236, 120, 63, 0.75)'
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Comparativa de precios'
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
  return chartChartComparativa2;
};
