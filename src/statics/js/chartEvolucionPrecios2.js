function chartEvolucionPrecios2(chartElement){
  // var ctx = document.getElementById('evolucionDePrecios').getContext('2d');
  var ctx = chartElement.getContext('2d');

  if(window.chartChartPrecios2 != undefined && window.chartChartPrecios2 != null){
    window.chartChartPrecios2.destroy();
  };
  window.chartChartPrecios2 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
          label: 'Mediana Kairos',
          data: [],
          lineTension: 0,
          borderColor: 'rgba(252, 170, 10, 0.7)',
          backgroundColor: 'rgba(252, 170, 10, 1)'
        },
        {
          label: 'Comarsa',
          data: [],
          lineTension: 0,
          borderColor: 'rgba(47, 75, 193, 0.7)',
          backgroundColor: 'rgba(47, 75, 193, 1)'
        },
        {
          label: 'Varadero',
          data: [],
          lineTension: 0,
          borderColor: 'rgba(50, 193, 47, 0.7)',
          backgroundColor: 'rgba(50, 193, 47, 1)'
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Evolución de Precios'
      },
      scales: {
        xAxes: [{
          type: 'time',
          distribution: 'serie',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'DD/MM/YYYY'
            },
            format: 'DD/MM/YYYY',
            tooltipFormat: 'DD/MM/YYYY'
          },
          scaleLabel: {
            display: false,
            labelString: 'Fecha'
          },
          ticks: {
            minRotation: 80, // angle in degrees
            // fontSize: 10,
            autoSkip: true,
            maxTicksLimit:10
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Precio'
          }
        }]
      },
      elements: {
        line: {
        fill: false
        }
      },
      tooltips: {
        mode: 'x'
      }
    }
  });
  return chartChartPrecios2;
};
