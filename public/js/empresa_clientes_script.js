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

function abrirModalCriar() {
  document.getElementById("modal-titulo").innerText = "Novo Cliente";
  document.getElementById("form-cliente").reset();
  document.getElementById("cliente-id").value = "";
  document.getElementById("modal-cliente").showModal();
}

function abrirModalEditar(cliente) {
  memory=cliente
  document.getElementById("modal-titulo").innerText = "Editar Cliente";
  document.getElementById("cliente-id").value = cliente.id;
  document.getElementById("nome").value = cliente.nome;
  document.getElementById("cpf").value = cliente.cpf;
  document.getElementById("email").value = cliente.email;
  document.getElementById("telefone").value = cliente.telefone;
  document.getElementById("modal-cliente").showModal();
}

function fecharModal() {
  document.getElementById("modal-cliente").close();
}

async function carregarClientes() {
  const token = getCookie("token");
  const res = await fetch('/api/cliente/interno', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dados = await res.json();
  const tbody = document.getElementById("tabela-body");
  tbody.innerHTML = "";

  dados.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.nome}</td>
      <td>${c.cpf}</td>
      <td>${c.email}</td>
      <td>${c.telefone}</td>
      <td class="space-x-1">
        <button class="btn btn-xs btn-info" onclick='abrirModalEditar(${JSON.stringify(c)})'>Editar</button>
        <button class="btn btn-xs btn-error" onclick="deletarCliente(${c.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function deletarCliente(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;
  const token = getCookie("token");
  await fetch(`/api/cliente/interno/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  await carregarClientes();
}

// Enviar form (create/update)
document.getElementById("form-cliente").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("cliente-id").value;
  const token = getCookie("token");

  const formData = new FormData();
  formData.append("nome", document.getElementById("nome").value);
  formData.append("cpf", document.getElementById("cpf").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("telefone", document.getElementById("telefone").value);

  if (id) {
    await fetch(`/api/cliente/interno/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        "nome": formData.get('nome'),
        "cpf": formData.get('cpf'),
        "email": formData.get('email'),
        "telefone": formData.get('telefone'),
      })
    });
  } else {
    await fetch('/api/cliente/register/interno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        "nome": formData.get('nome'),
        "cpf": formData.get('cpf'),
        "email": formData.get('email'),
        "telefone": formData.get('telefone')
      })
    });
  }

  fecharModal();
  await carregarClientes();
});


window.addEventListener("DOMContentLoaded", carregarClientes);
