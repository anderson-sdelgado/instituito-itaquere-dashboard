function Documento(descricao, secao, posicao){

    this.descricao = descricao;
    this.secao = secao;
    this.posicao = posicao;

    return {
        descricao: descricao,
        secao: secao,
        posicao: posicao
    };

}

export default Documento;