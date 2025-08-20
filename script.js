// Seleciona o elemento <ul> dentro do elemento com id "app"
let listElement = document.querySelector('#app ul');

// Seleciona o input dentro do elemento com id "app"
let inputElement = document.querySelector('#app input');

// Seleciona o botão dentro do elemento com id "app"
let buttonElement = document.querySelector('#app button');

// Recupera as tarefas salvas no localStorage, se existirem, ou cria um array vazio
let tarefas = JSON.parse(localStorage.getItem('@listaTarefas')) || [];

// Função para renderizar (mostrar) as tarefas na tela
function renderTarefas() {
    // Limpa o conteúdo atual da lista para evitar duplicação
    listElement.innerHTML = '';

    // Percorre o array de tarefas e cria um <li> para cada uma
    tarefas.map((mostrar)=>{
        let liElement = document.createElement('li'); // Cria um elemento <li>
        let tarefaText = document.createTextNode(mostrar); // Cria um texto com o nome da tarefa

        // Cria um link <a> para excluir a tarefa
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#'); // Define o atributo href do link

        let linkText = document.createTextNode(' Excluir'); // Cria o texto do link
        linkElement.appendChild(linkText); // Adiciona o texto ao link

        let posicao = tarefas.indexOf(mostrar); // Encontra a posição da tarefa no array

        // Define a ação ao clicar no link: chama a função deletarTarefa passando a posição da tarefa
        linkElement.setAttribute('onclick', `deletarTarefa(${posicao})`);

        liElement.appendChild(tarefaText); // Adiciona o texto ao <li>
        liElement.appendChild(linkElement); // Adiciona o link de exclusão ao <li>
        listElement.appendChild(liElement); // Adiciona o <li> à lista (<ul>)
    })
}

// Chama a função para mostrar as tarefas ao carregar a página
renderTarefas();

// Função para adicionar uma nova tarefa
function adicionarTarefas(){
    // Verifica se o input está vazio
    if(inputElement.value === '') {
        alert('Por favor, digite uma tarefa!'); // Alerta o usuário
        return false; // Sai da função
    }else {
        let novaTarefa = inputElement.value; // Pega o valor digitado

        tarefas.push(novaTarefa); // Adiciona a nova tarefa ao array
        inputElement.value = ''; // Limpa o input

        renderTarefas(); // Atualiza a lista na tela
        salvarDados(); // Salva as tarefas no localStorage
    }
}

// Define que ao clicar no botão, a função adicionarTarefas será executada
buttonElement.onclick = adicionarTarefas

// Função para deletar uma tarefa, recebendo a posição dela no array
function deletarTarefa(posicao){
    tarefas.splice(posicao, 1); // Remove a tarefa da posição especificada
    renderTarefas(); // Atualiza a lista na tela
    salvarDados(); // Salva as alterações no localStorage
}

// Função para salvar as tarefas no localStorage
function salvarDados(){
    localStorage.setItem('@listaTarefas', JSON.stringify(tarefas)); // Salva as tarefas no localStorage
}