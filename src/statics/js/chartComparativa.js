function chartComparativa(chartElement){

  // var ctx = document.getElementById('comparativa').getContext('2d');
  var ctx = chartElement.getContext('2d');
  var chartComparativa = new Chart(ctx, {
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

  return chartComparativa;
};
