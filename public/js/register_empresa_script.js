const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const removeImageBtn = document.getElementById('removeImageBtn');
const cadastroForm = document.getElementById('cadastroForm');

// Formatação de campos
const telefoneInput = document.getElementById('telefone');
const cpfInput = document.getElementById('cpf');
const cepInput = document.getElementById('cep');
document.addEventListener('DOMContentLoaded', function () {

    // Formatação do telefone
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 2) {
            value = '(' + value.substring(0, 2) + ')' + (value.length > 2 ? ' ' + value.substring(2) : '');
        }
        if (value.length > 9) {
            value = value.substring(0, 10) + '-' + value.substring(10);
        }
        e.target.value = value;
    });

    // Formatação do CPF
    cpfInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 3) {
            value = value.substring(0, 3) + '.' + value.substring(3);
        }
        if (value.length > 7) {
            value = value.substring(0, 7) + '.' + value.substring(7);
        }
        if (value.length > 11) {
            value = value.substring(0, 11) + '-' + value.substring(11);
        }
        e.target.value = value;
    });

    // Formatação do CEP
    cepInput?.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);

        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5);
        }
        e.target.value = value;
    });

    // Click on drop zone to trigger file input
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', handleFileSelect);

    // Handle drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-primary');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-primary');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-primary');

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });

    // Remove image button
    removeImageBtn.addEventListener('click', () => {
        fileInput.value = '';
        previewContainer.classList.add('hidden');
        dropZone.classList.remove('hidden');
    });

    // Form submission
    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validação de senha
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha.length < 6) {
            alert('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        // Criar objeto com os dados do formulário
        const formData = new FormData(cadastroForm);
        const dadosJSON = {};

        formData.forEach((value, key) => {
            if (key !== 'confirmarSenha') {
                dadosJSON[key] = value;
            }
        });

        // Adicionar endereço como objeto
        dadosJSON.endereço = {
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        };

        console.log('Dados em formato JSON:', dadosJSON);
        alert('Cadastro realizado com sucesso! Confira o console para ver os dados em formato JSON.');

        try {
            // Primeiro: enviar a imagem, se tiver
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
                dadosJSON.logo_url = uploadResult.path; // Assumindo que o backend retorna { url: '...' }
            }

            // Segundo: enviar dados de cadastro
            const cadastroResponse = await fetch('/api/empresa/register/auto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cnpj: dadosJSON.cnpj,
                    email: dadosJSON.email,
                    nome: dadosJSON.nomeProprietario, 
                    senha: dadosJSON.senha, 
                    endereco: dadosJSON.endereço.cep,
                    cpf: dadosJSON.cpf, 
                    email: dadosJSON.email,
                    telefone: dadosJSON.telefone, 
                    data_nasc: dadosJSON.data_nasc,
                    perfil: dadosJSON.logo_url
                })
            });

            if (!cadastroResponse.ok) {
                throw new Error('Erro ao enviar dados de cadastro');
            }

            const result = await cadastroResponse.json();
            window.location.href = '/empresa/login';
        } catch (error) {
            console.error('Erro no cadastro:', error);
            alert('Ocorreu um erro durante o cadastro.');
        }
    });

    function handleFileSelect() {
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];

            // Check file type
            if (!file.type.match('image.*')) {
                alert('Por favor, selecione um arquivo de imagem');
                return;
            }

            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('O tamanho do arquivo excede o limite de 5MB');
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                previewContainer.classList.remove('hidden');
                dropZone.classList.add('hidden');
            }

            reader.readAsDataURL(file);
        }
    }

    // Busca CEP
    if (cepInput) {
        cepInput.addEventListener('blur', function () {
            const cep = this.value.replace(/\D/g, '');

            if (cep.length !== 8) {
                return;
            }

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('logradouro').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                        document.getElementById('numero').focus();
                    }
                })
                .catch(error => console.error('Erro ao buscar CEP:', error));
        });
    }
});
