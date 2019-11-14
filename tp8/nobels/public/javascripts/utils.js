function pesquisarListaNobelsPorCategoria() {
    var categoria = document.getElementById('categoria').value
    if(categoria != '') {
        window.location.replace("http://localhost:3008/api/premios?categoria="+categoria);
    }
}

function pesquisarListaNobelsPorCategoriaEAno() {
    var categoria = document.getElementById('categoria2').value
    var ano       = document.getElementById('ano2').value
    if(categoria != '' && ano != '') {
        window.location.replace("http://localhost:3008/api/premios?categoria="+categoria+"&data="+ano);
    }
}

function pesquisarNobelPorId() {
    var id        = document.getElementById('id').value
    if(id != '') {
        window.location.replace("http://localhost:3008/api/premios/"+id);
    }
}