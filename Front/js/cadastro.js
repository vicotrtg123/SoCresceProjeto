function desativarCampo() {
    if (document.getElementById("checkboxCadastro").checked == true) {
        document.getElementById("labelCREF").hidden = false;
        document.getElementById("campoCREF").hidden = false;
        document.getElementById("labelLimitacoes").hidden = true;
        document.getElementById("textoLimitacoes").hidden = true;
    } else {
        document.getElementById("labelLimitacoes").hidden = false;
        document.getElementById("textoLimitacoes").hidden = false;
        document.getElementById("labelCREF").hidden = true;
        document.getElementById("campoCREF").hidden = true;
    }
}