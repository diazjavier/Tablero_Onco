window.addEventListener('load', function() {

  let $tblUsuarios = $('#tblUsuarios');
  // let $tblComerciales = $('#tblComerciales');
  // let $tblMedianas = $('#tblMedianas');
  // let $tblComercialesXMediana = $('#tblComercialesXMediana')

  let table = document.getElementById("tblUsuarios");

  let buscador = document.getElementById("txtBuscador6");
  buscador.addEventListener("keyup", buscaTxt);

  let btnBuscador = document.getElementById("btnSearch6");
  btnBuscador.addEventListener("click", buscaTxt);

  let btnRefresh = document.getElementById("btnClear6");
  btnRefresh.addEventListener("click", function(){
    buscador.value = "";
    buscaTxt();
  });

  function buscaTxt(){
    // let input, filter, table, tr, td, i, txtValue;
    let criterio = buscador.value.toUpperCase();
    let tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      let row = tr[i].getElementsByTagName("td");
      for (j = 0; j < row.length; j++) {
        let td = row[j];
        if (td) {
          let txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(criterio) > -1) {
            tr[i].style.display = "";
            break;
          } else {
            tr[i].style.display = "none";
          };
        };
      };
    };
  };

  function initTable() {

    limpiaTabla($tblUsuarios);

    $tblUsuarios.bootstrapTable('destroy').bootstrapTable(
      construyeTablaUsuarios()
    );
    // Configuro los botones de la tabla
  };


  initTable();
  buscador.focus();

});
