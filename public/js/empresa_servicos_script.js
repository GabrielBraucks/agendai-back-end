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
  document.getElementById("modal-titulo").innerText = "Novo Serviço";
  document.getElementById("form-servico").reset();
  document.getElementById("serv-id").value = "";
  document.getElementById("modal-servico").showModal();
}

function abrirModalEditar(serv) {
  memory = serv
  document.getElementById("modal-titulo").innerText = "Editar Serviço";
  document.getElementById("serv-id").value = serv.id;
  document.getElementById("nome").value = serv.nome;
  document.getElementById("duracao").value = serv.duracao.split(' ')[0];
  document.getElementById("preco").value = serv.preco;
  document.getElementById("categoria").value = serv.categoria;
  document.getElementById("funcionario").value = serv.funcionario.id;
  document.getElementById("modal-servico").showModal();
}

function fecharModal() {
  document.getElementById("modal-servico").close();
}

async function carregarServicos() {
  const token = getCookie("token");
  const res = await fetch(`/api/servicos/listarPelaEmpresa/${localStorage.getItem('id')}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const dados = await res.json();
  const list = document.getElementById("lista-servicos");
  list.innerHTML = "";

  dados.forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="card w-80 bg-base-100 shadow-xl">
        <figure>
          <img src="/${s.foto}" alt="${s.nome}" class="w-full h-48 object-cover" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${s.nome}</h2>
          <p><span class="font-semibold">Preço:</span> R$ ${s.preco}</p>
          <p><span class="font-semibold">Duração:</span> ${s.duracao}</p>
          <p><span class="font-semibold">Categoria:</span> ${s.categoria}</p>
          <p class="flex items-center"><span class="font-semibold">Encarregado:</span> <img src="/${s.funcionario.perfil}" alt="Foto" class="w-fit h-8 object-cover" /> ${s.funcionario.nome}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm" onclick='abrirModalEditar(${JSON.stringify(s)})'>Editar</button>
            <button class="btn btn-error btn-sm" onclick='deletarServico(${JSON.stringify(s.id)})'>Deletar</button>
          </div>
        </div>
      </div>
    `;
    list.appendChild(li);
  });
}

async function carregarFuncionarios() {
  const token = getCookie("token");
  const res = await fetch(`/api/funcionarios/listarPelaEmpresa/${localStorage.getItem('id')}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dados = await res.json();
  const slt = document.getElementById("funcionario");
  slt.innerHTML = "";

  dados.forEach(f => {
    const op = document.createElement("option");
    op.value = f.id
    op.innerText = `${f.nome}(${f.cargo})`
    slt.appendChild(op);
  });
}

async function deletarServico(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;
  const token = getCookie("token");
  await fetch(`/api/servicos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  await carregarServicos();
}

// Enviar form (create/update)
document.getElementById("form-servico").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("serv-id").value;
  const token = getCookie("token");

  const formData = new FormData();
  formData.append("nome", document.getElementById("nome").value);
  formData.append("categoria", document.getElementById("categoria").value);
  formData.append("preco", document.getElementById("preco").valueAsNumber);
  formData.append("duracao", document.getElementById("duracao").valueAsNumber);
  formData.append("funcionario", document.getElementById("funcionario").value);

  const fileInput = document.getElementById("foto");
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
    formData.append('foto', uploadResult.path);
  } else {
    formData.append('foto', memory.foto);
  }

  if (id) {
    await fetch(`/api/servicos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        "foto": formData.get('foto'),
        "nome": formData.get('nome'),
        "duracao": `${formData.get('duracao')} minutos`,
        "preco": Number(formData.get('preco')),
        "idFuncionario": Number(formData.get('funcionario')),
        "categoria": formData.get('categoria')
      })
    });
  } else {
    await fetch('/api/servicos/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        "foto": formData.get('foto'),
        "nome": formData.get('nome'),
        "duracao": `${formData.get('duracao')} minutos`,
        "preco": Number(formData.get('preco')),
        "idFuncionario": Number(formData.get('funcionario')),
        "categoria": formData.get('categoria')
      })
    });
  }

  fecharModal();
  await carregarServicos();
});


window.addEventListener("DOMContentLoaded", async () => {
  await carregarServicos();
  await carregarFuncionarios();
});
