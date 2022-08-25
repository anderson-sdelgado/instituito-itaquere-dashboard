function Secao(codparente, descricao, nivel, posicao){

    this.codparente = codparente;
    this.descricao = descricao;
    this.nivel = nivel;
    this.posicao = posicao;

    return {
        codparente: codparente,
        descricao: descricao,
        nivel: nivel,
        posicao: posicao
    };

}

export default Secao;