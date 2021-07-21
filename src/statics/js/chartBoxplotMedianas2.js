function chartBoxPlotMedianas2(chartElement){

  var ctx = chartElement.getContext('2d');

  if(window.boxPlotMedianas2 != undefined && window.boxPlotMedianas2 != null){
    window.boxPlotMedianas2.destroy();
  };
  window.boxPlotMedianas2 = new Chart(ctx, {
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
  return boxPlotMedianas2;
};
