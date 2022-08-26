function Usuario(nome, senha){

    this.nome = nome;
    this.senha = senha;

    return {
        nome: nome,
        senha: senha
    };

}

export default Usuario;