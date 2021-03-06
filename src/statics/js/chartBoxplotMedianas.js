function chartBoxPlotMedianas(chartElement){

  var ctx = chartElement.getContext('2d');

  if(window.boxPlotMedianas != undefined && window.boxPlotMedianas != null){
    window.boxPlotMedianas.destroy();
  };
  window.boxPlotMedianas = new Chart(ctx, {
    type: 'boxplot',
    data: {
      // define label tree
      labels: [],
      datasets: [{
        label: 'Boxplot',
        backgroundColor: 'rgba(255,0,0,0.5)',
        borderColor: 'red',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: []
      }, {
        type: 'line',
        label: 'Mediana',
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        lineTension: 0,
        data: []
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolución de la Mediana - NNE: '
      },
      elements: {
        line: {
          fill: false
        }
      }
    }
  });
  return boxPlotMedianas;
};
