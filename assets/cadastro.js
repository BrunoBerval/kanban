document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    let novaTarefa = {
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        status: document.getElementById("status").value,
        urgencia: document.getElementById("urgencia").value,
        responsavel: document.getElementById("responsavel").value,
        data_de_criacao: formatDate(new Date())
    };


    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    alert("Tarefa adicionada!");
    this.reset();
});