function apagaFilme(id) {
    if(window.confirm('Tem a certeza que pretende eliminar o filme?')){
        $.ajax({
            url: '/filmes/' + id,
            type: 'DELETE',
            success: function(result) {
                window.location.assign("/filmes");
                console.log("Filme com id: " + id + " apagado com sucesso!")
            }
        });    
    }
}