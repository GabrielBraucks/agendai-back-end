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
  document.getElementById("modal-titulo").innerText = "Novo Funcionário";
  document.getElementById("form-funcionario").reset();
  document.getElementById("func-id").value = "";
  document.getElementById("senha").style.display = 'block'
  document.getElementById("modal-funcionario").showModal();
}

function abrirModalEditar(func) {
  memory=func
  document.getElementById("modal-titulo").innerText = "Editar Funcionário";
  document.getElementById("func-id").value = func.id;
  document.getElementById("senha").style.display = 'none'
  document.getElementById("nome").value = func.nome;
  document.getElementById("cpf").value = func.cpf;
  document.getElementById("email").value = func.email;
  document.getElementById("telefone").value = func.telefone;
  document.getElementById("data_nasc").value = func.data_nasc;
  document.getElementById("cargo").value = func.cargo;
  document.getElementById("modal-funcionario").showModal();
}

function fecharModal() {
  document.getElementById("modal-funcionario").close();
}

async function carregarFuncionarios() {
  const token = getCookie("token");
  const res = await fetch(`/api/funcionarios/listarPelaEmpresa/${localStorage.getItem('id')}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dados = await res.json();
  const tbody = document.getElementById("tabela-body");
  tbody.innerHTML = "";

  dados.forEach(f => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="/${f.perfil}" class="w-fit h-fit rounded-full" /></td>
      <td>${f.nome}</td>
      <td>${f.cpf}</td>
      <td>${f.email}</td>
      <td>${f.telefone}</td>
      <td>${new Date(f.data_nasc).toLocaleDateString('pt-BR')}</td>
      <td>${f.cargo}</td>
      <td>${f.empresa}</td>
      <td class="space-x-1">
        <button class="btn btn-xs btn-info" onclick='abrirModalEditar(${JSON.stringify(f)})'>Editar</button>
        ${f.cargo == 'Proprietario' ? '' : '<button class="btn btn-xs btn-error" onclick="deletarFuncionario(${f.id})">Excluir</button>'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function deletarFuncionario(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;
  const token = getCookie("token");
  await fetch(`/api/funcionarios/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  await carregarFuncionarios();
}

// Enviar form (create/update)
document.getElementById("form-funcionario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("func-id").value;
  const token = getCookie("token");

  const formData = new FormData();
  formData.append("nome", document.getElementById("nome").value);
  formData.append("senha", document.getElementById("senha").value);
  formData.append("cpf", document.getElementById("cpf").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("telefone", document.getElementById("telefone").value);
  formData.append("data_nasc", document.getElementById("data_nasc").value);
  formData.append("cargo", document.getElementById("cargo").value);

  const fileInput = document.getElementById("perfil");
  if (fileInput.files.length > 0) {
    const imagemFormData = new FormData();
    imagemFormData.append('file', fileInput.files[0]);

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: imagemFormData
    });

    if (!uploadResponse.ok) {
      throw new Error('Falha ao enviar a imagem');
    }

    const uploadResult = await uploadResponse.json();
    formData.append('perfil', uploadResult.path);
  }else{
    formData.append('perfil', memory.perfil);
  }

  if (id) {
    await fetch(`/api/funcionarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        "perfil": formData.get('perfil'), 
        "nome": formData.get('nome'),
        "cpf": formData.get('cpf'),
        "cargo": formData.get('cargo'),
        "email": formData.get('email'),
        "telefone": formData.get('telefone'),
        "data_nasc": formData.get('data_nasc')
      })
    });
  } else {
    await fetch('/api/funcionarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        "perfil": formData.get('perfil'), 
        "nome": formData.get('nome'),
        "cpf": formData.get('cpf'),
        "cargo": formData.get('cargo'),
        "email": formData.get('email'),
        "senha": formData.get('senha'),
        "telefone": formData.get('telefone'),
        "data_nasc": formData.get('data_nasc')
      })
    });
  }

  fecharModal();
  await carregarFuncionarios();
});


window.addEventListener("DOMContentLoaded", carregarFuncionarios);
