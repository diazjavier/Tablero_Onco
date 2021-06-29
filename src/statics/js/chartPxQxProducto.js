function chartComparativaPxQxProd(chartElement){
  var ctxPxQxProd = chartElement.getContext('2d');
  var chartComparativaPxQxProd = new Chart(ctxPxQxProd, {
    type: 'line',
    data: {
      datasets: []
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Evolución de PxQ acumulado total y por proveedor'
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
            maxTicksLimit:10
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
  return chartComparativaPxQxProd;

};
