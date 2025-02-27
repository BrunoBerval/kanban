 // Função para formatar a data no formato DD/MM/YYYY h:m
 function formatDate(date) {
    let day = String(date.getDate()).padStart(2, '0'); // Garantir 2 dígitos
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam do 0, por isso o +1
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}