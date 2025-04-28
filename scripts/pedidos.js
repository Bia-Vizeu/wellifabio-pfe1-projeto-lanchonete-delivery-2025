const completedOrdersTable = document.getElementById('completedOrdersTable');

function loadCompletedOrders() {
  const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
  completedOrdersTable.innerHTML = '';

  if (completedOrders.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="9" style="text-align: center;">Nenhum pedido finalizado</td>`;
    completedOrdersTable.appendChild(tr);
    return;
  }

  completedOrders.forEach((order, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${order.id || index + 1}</td>
      <td>${order.cliente || '-'}</td>
      <td>${order.endereco || '-'}</td>
      <td>${order.produto || '-'}</td>
      <td>${order.dataPedido || '-'}</td>
      <td>${order.horaPedido || '-'}</td>
      <td>${order.horaSaida || '-'}</td>
      <td>${order.horaEntrega || '-'}</td>
      <td><button class="btn-excluir" data-index="${index}">Excluir</button></td>
    `;
    completedOrdersTable.appendChild(tr);
  });

  document.querySelectorAll('.btn-excluir').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      excluirPedido(index);
    });
  });
}

function excluirPedido(index) {
  if (confirm('Tem certeza que deseja excluir este pedido?')) {
    const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    completedOrders.splice(index, 1);
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
    loadCompletedOrders();
  }
}

loadCompletedOrders();
