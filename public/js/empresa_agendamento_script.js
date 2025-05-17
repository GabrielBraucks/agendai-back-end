var memory = {}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
async function carregarClientes() {
  const token = getCookie("token");
  const res = await fetch(`/api/cliente/interno`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dados = await res.json();
  const slt = document.getElementById("cliente");
  slt.innerHTML = "";

  dados.forEach(f => {
    const op = document.createElement("option");
    op.value = f.email
    op.innerText = `${f.nome}(${f.cpf})`
    slt.appendChild(op);
  });
}
async function carregarServico() {
  const token = getCookie("token");
  const res = await fetch(`/api/servicos/listarPelaEmpresa/${localStorage.getItem('id')}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dados = await res.json();
  const slt = document.getElementById("servico");
  slt.innerHTML = "";

  dados.forEach(f => {
    const op = document.createElement("option");
    op.value = f.id
    op.innerText = `${f.nome}(R$${f.preco}) - ${f.funcionario.nome}`
    slt.appendChild(op);
  });
}
function carregarEventosLocal() {
  const dados = localStorage.getItem('eventos');
  return dados ? JSON.parse(dados) : [];
}

function salvarEventosLocal(eventos) {
  localStorage.setItem('eventos', JSON.stringify(eventos));
}

function gerarIdUnico() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function abrirModalCriar() {
  document.getElementById("modal-titulo").innerText = "Novo Evento";
  document.getElementById("form-cliente").reset();
  document.getElementById("cliente-id").value = "";
  document.getElementById("modal-cliente").showModal();
}

function fecharModal() {
  document.getElementById("modal-cliente").close();
}

function deletarEvento() {
  const id = document.getElementById("cliente-id").value;
  if (!id) return;
  if (!confirm("Deseja realmente excluir este evento?")) return;

  const eventos = carregarEventosLocal().filter(ev => ev.id !== id);
  salvarEventosLocal(eventos);
  fecharModal();
  calendar.removeAllEvents();
  calendar.addEventSource(eventos);
}

document.getElementById("form-cliente").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("cliente-id").value || gerarIdUnico();
  const cliente = document.getElementById("cliente").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;

  const eventos = carregarEventosLocal().filter(ev => ev.id !== id);

  const novoEvento = {
    id,
    title: `${cliente} - ${servico}`,
    start: `${data}T${hora}`,
    extendedProps: {
      cliente,
      servico
    }
  };

  eventos.push(novoEvento);
  salvarEventosLocal(eventos);

  fecharModal();
  calendar.removeAllEvents();
  calendar.addEventSource(eventos);
});

document.addEventListener("DOMContentLoaded", async function () {
  const calendarEl = document.getElementById('calendar');
  window.calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    events: carregarEventosLocal(),

    dateClick: function (info) {
      document.getElementById("data").value = info.dateStr;
      abrirModalCriar();
    },

    eventClick: function (info) {
      const evento = info.event;

      document.getElementById("cliente-id").value = evento.id;
      document.getElementById("cliente").value = evento.extendedProps.cliente || "";
      document.getElementById("servico").value = evento.extendedProps.servico || "";
      document.getElementById("data").value = evento.startStr.slice(0, 10);
      document.getElementById("hora").value = evento.startStr.slice(11, 16);
      document.getElementById("modal-titulo").innerText = "Editar Evento";
      document.getElementById("modal-cliente").showModal();
    }
  });

  calendar.render();
  await carregarClientes();
  await carregarServico();

});