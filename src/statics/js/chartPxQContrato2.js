function getChartPxQContrato2(chartElement) {
  var ctx = chartElement.getContext('2d');

  if(window.chartChartPxQContrato2 != undefined && window.chartChartPxQContrato2 != null){
    window.chartChartPxQContrato2.destroy();
  };
  window.chartChartPxQContrato2 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'PxQ Basal Acumulado',
          data: [],
          borderColor: 'rgba(101, 153, 213, 0.7)',
          backgroundColor: 'rgba(101, 153, 213, 0.7)',
          type: 'line',
          yAxisID: 'lineAxis'
        },
        {
          label: 'PxQ Actuallizado Acumulado',
          data: [],
          borderColor: 'rgba(255, 25, 25, 0.6)',
          backgroundColor: 'rgba(255, 25, 25, 0.6)',
          type: 'line',
          yAxisID: 'lineAxis'
        },
        {
          label: 'PxQ Basal',
          data: [],
          backgroundColor: 'rgba(101, 153, 213, 0.5)',
          yAxisID: 'barAxis'
        },
        {
          label: 'PxQ Actualizado',
          data: [],
          backgroundColor: 'rgba(236, 120, 63, 0.5)',
          yAxisID: 'barAxis'
        }
      ]
    },
    options: {
      // responsive:true,
      // maintainAspectRatio:false,
      legend:{
        display:true
      },
      title: {
        display: false,
        text: 'Evolución del Presupuesto - PxQ'
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          id: 'barAxis',
          position:'left',
          display:true,
          ticks: {
                beginAtZero: true,
                min: 0,
                max: 300,
                callback: function (value, index, values){
                  return value.toLocaleString("es-AR");
                }
            }
        },{
          id: 'lineAxis',
          position:'right',
          display:false,
          ticks: {
                beginAtZero: true,
                min: 0,
                max: 300
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
  return chartChartPxQContrato2;
};
