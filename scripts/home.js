
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
let pedidosConcluidos = JSON.parse(localStorage.getItem('completedOrders')) || [];

const orderForm = document.getElementById('orderForm');
const orderList = document.getElementById('orderList');
const completedList = document.getElementById('completedList');
const toggleCompleted = document.getElementById('toggleCompleted');
const completedSection = document.getElementById('completedSection');

function formatarDataHora(dataHora) {
    const data = dataHora.toLocaleDateString('pt-BR');
    const hora = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return { data, hora };
}

function salvarPedidos() {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function salvarPedidosConcluidos() {
    localStorage.setItem('completedOrders', JSON.stringify(pedidosConcluidos));
}

function exibirPedidos() {
    orderList.innerHTML = '';
    pedidos.forEach((pedido, index) => {
        if (pedido.status === 'execucao') {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="info">
                    <strong>${pedido.cliente}</strong> - ${pedido.produto}<br>
                    <small>${pedido.endereco}</small><br>
                    <small>Data: ${pedido.dataPedido}</small><br>
                    <small>Hora: ${pedido.horaPedido}</small>
                </div>
                <div class="buttons">
                    <button class="btn-finalizar" onclick="enviarPedido(${index})">Finalizar</button>
                    <button class="btn-excluir" onclick="excluirPedido(${index})">Excluir</button>
                </div>
            `;
            orderList.appendChild(li);
        }
    });
}
function exibirPedidosConcluidos() {
    completedList.innerHTML = '';
    pedidosConcluidos.forEach(pedido => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="info">
                <strong>${pedido.cliente}</strong> - ${pedido.produto}<br>
                <small>${pedido.endereco}</small><br>
                <small>Data Pedido: ${pedido.dataPedido}</small><br>
                <small>Hora Pedido: ${pedido.horaPedido}</small><br>
                <small>Data Entrega: ${pedido.dataEntrega}</small><br>
                <small>Hora Entrega: ${pedido.horaEntrega}</small>
            </div>
        `;
        completedList.appendChild(li);
    });
}

function enviarPedido(index) {
    if (confirm('Tem certeza que deseja finalizar este pedido?')) {
        const { data, hora } = formatarDataHora(new Date());
        pedidos[index].status = 'concluido';
        pedidos[index].dataEntrega = data;
        pedidos[index].horaEntrega = hora;

        pedidosConcluidos.push(pedidos[index]);
        pedidos.splice(index, 1);

        salvarPedidos();
        salvarPedidosConcluidos();

        exibirPedidos();
        exibirPedidosConcluidos();
    }
}

function excluirPedido(index) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
        pedidos.splice(index, 1);
        salvarPedidos();
        exibirPedidos();
    }
}

orderForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const product = document.getElementById('product').value;

    if (name && endereco && product) {
        const { data, hora } = formatarDataHora(new Date());

        const pedido = {
            cliente: name,
            endereco: endereco,
            produto: product,
            dataPedido: data,
            horaPedido: hora,
            status: 'execucao',
            dataEntrega: null,
            horaEntrega: null
        };

        pedidos.push(pedido);
        salvarPedidos();
        orderForm.reset();
        exibirPedidos();
    }
});

toggleCompleted.addEventListener('click', () => {
    if (completedSection.style.display === 'none' || completedSection.style.display === '') {
        completedSection.style.display = 'block';
        toggleCompleted.textContent = 'Ocultar Concluídos';
    } else {
        completedSection.style.display = 'none';
        toggleCompleted.textContent = 'Concluídos';
    }
});

document.getElementById('verPedidos').addEventListener('click', function() {
    window.location.href = 'pedidos.html'; 
  });

exibirPedidos();
exibirPedidosConcluidos();
