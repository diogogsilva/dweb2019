function apagaMusica(id){
    axios.delete('/' + id)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}

//filter songs in table by title
function filterFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filterTable");
    filter = input.value.toUpperCase();
    table = document.getElementById("songsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
    if(input.value == '') {
        $('#nav').remove();
        $('#songsTable').after('<div id="nav"></div>');
        var rowsShown = 6;
        var rowsTotal = $('#songsTable tbody tr').length;
        var numPages = rowsTotal/rowsShown;
        for(i = 0;i < numPages;i++) {
            var pageNum = i + 1;
            $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
        }
        $('#songsTable tbody tr').hide();
        $('#songsTable tbody tr').slice(0, rowsShown).show();
        $('#nav a:first').addClass('active');
        $('#nav a').bind('click', function(){

            $('#nav a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('#songsTable tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
            css('display','table-row').animate({opacity:1}, 300);
        });
    }
}

$(document).ready(function(){
    $('#songsTable').after('<div id="nav"></div>');
    var rowsShown = 6;
    var rowsTotal = $('#songsTable tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
    }
    $('#songsTable tbody tr').hide();
    $('#songsTable tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function(){

        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#songsTable tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
});