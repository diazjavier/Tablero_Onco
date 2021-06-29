function chartComEnt(chartElement) {
  // var ctxComEnt = document.getElementById('comXProv').getContext('2d');
  var ctxComEnt = chartElement.getContext('2d');
  var chartComEnt = new Chart(ctxComEnt, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Evolución de precios de comerciales entregados por proveedor'
      },
      legend: {
        position: 'top',
        display: true,
        fontSize: 0.5
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
            maxTicksLimit: 10
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
  return chartComEnt;
};
