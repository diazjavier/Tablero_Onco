function chartComercialUnico(chartElement){
  var ctxComU = chartElement.getContext('2d');
  // var grafComJuntos = new Chart(ctxComJ, {
  if(window.chartComUnico != undefined && window.chartComUnico != null)
    window.chartComUnico.destroy();
  window.chartComUnico = new Chart(ctxComU, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Evolución de precios al público por unidad'
      },
      legend: {
        position: 'top',
        display: true,
        labels:{
          defaultFontSize: 5
        }
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
            labelString: 'Fecha',
            display: false
          },
          ticks: {
            minRotation: 80, // angle in degrees
            fontSize: 10,
            autoSkip: true,
            maxTicksLimit:10
          }
        }]
      },
      elements: {
        line: {
        fill: false
        }
      }
    }
  });
  return chartComUnico;
};
