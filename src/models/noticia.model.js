function Noticia(conteudo, titulo, status){

    this.conteudo = conteudo;
    this.titulo = titulo;
    this.status = status;

    return {
        conteudo: conteudo,
        titulo: titulo,
        status: status
    };

}

export default Noticia;