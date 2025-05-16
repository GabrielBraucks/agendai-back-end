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
async function carregarServicos() {
  const token = getCookie("token");
  const res = await fetch(`/api/servicos/listarPelaEmpresa/${localStorage.getItem('id')}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dados = await res.json();
  const slt = document.getElementById("serviceSelect");
  slt.innerHTML = "";

  dados.forEach(f => {
    const op = document.createElement("option");
    op.value = f.id
    op.innerText = `${f.nome}(R$${f.preco}) - ${f.funcionario.nome}`
    slt.appendChild(op);
  });
}
document.addEventListener('DOMContentLoaded', async function () {
    // Estado da aplicação
    const state = {
        selectedDate: null,
        selectedTime: null,
        selectedService: null,
        clientEmail: null,
        currentMonth: new Date(),
        bookedSlots: {} // Simulação de horários já agendados
    };

    // Elementos DOM
    const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const timeSlotContainer = document.getElementById('timeSlotContainer');
    const timeSlotsElement = document.getElementById('timeSlots');
    const clientInfoContainer = document.getElementById('clientInfoContainer');
    const clientEmailInput = document.getElementById('clientEmail');
    const serviceSelect = document.getElementById('serviceSelect');
    const bookButton = document.getElementById('bookButton');


    await carregarServicos()
    // Simular alguns horários já agendados
    function generateBookedSlots() {
        const bookedSlots = {};
        // Datas dos próximos 60 dias
        const today = new Date();
        for (let i = 0; i < 60; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            const dateStr = formatDate(date);

            // 30% de chance de ter horários agendados
            if (Math.random() < 0.3) {
                bookedSlots[dateStr] = [];
                // Adicionar 1-3 horários agendados aleatoriamente
                const numBookings = Math.floor(Math.random() * 3) + 1;
                for (let j = 0; j < numBookings; j++) {
                    const hour = Math.floor(Math.random() * 8) + 9; // 9h às 17h
                    const timeStr = `${hour}:00`;
                    bookedSlots[dateStr].push(timeStr);
                }
            }
        }
        return bookedSlots;
    }

    // Inicializar horários agendados simulados
    state.bookedSlots = generateBookedSlots();

    // Formatar data YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Formatar mês e ano para exibição
    function formatMonthYear(date) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    // Render do calendário
    function renderCalendar() {
        calendar.innerHTML = '';
        currentMonthElement.textContent = formatMonthYear(state.currentMonth);

        const year = state.currentMonth.getFullYear();
        const month = state.currentMonth.getMonth();

        // Primeiro dia do mês
        const firstDay = new Date(year, month, 1);
        // Último dia do mês
        const lastDay = new Date(year, month + 1, 0);

        // Dias do mês anterior para preencher a primeira semana
        const daysFromPrevMonth = firstDay.getDay();

        // Dias totais a serem exibidos (incluindo dias do mês anterior e próximo)
        const totalDays = daysFromPrevMonth + lastDay.getDate();
        const totalCells = Math.ceil(totalDays / 7) * 7;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Renderizar cada dia do calendário
        for (let i = 0; i < totalCells; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');

            // Calcular a data para esta célula
            const dayOfMonth = i - daysFromPrevMonth + 1;
            const date = new Date(year, month, dayOfMonth);

            // Se a data for válida para este mês
            if (dayOfMonth > 0 && dayOfMonth <= lastDay.getDate()) {
                dayCell.textContent = dayOfMonth;

                // Verificar se a data é no passado
                if (date < today) {
                    dayCell.classList.add('disabled');
                } else {
                    // Data válida para seleção
                    dayCell.setAttribute('data-date', formatDate(date));

                    // Verificar se é a data selecionada
                    if (state.selectedDate === formatDate(date)) {
                        dayCell.classList.add('selected');
                    }

                    // Evento de clique
                    dayCell.addEventListener('click', function () {
                        const selectedDate = this.getAttribute('data-date');
                        selectDate(selectedDate);
                    });
                }
            } else {
                // Dias do mês anterior ou próximo (células vazias)
                dayCell.classList.add('disabled');
            }

            calendar.appendChild(dayCell);
        }
    }

    // Gerar horários disponíveis
    function generateTimeSlots() {
        timeSlotsElement.innerHTML = '';
        timeSlotContainer.classList.remove('hidden');

        // Horários disponíveis (9h às 17h)
        const timeSlots = [
            '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
        ];

        // Verificar horários já agendados para a data selecionada
        const bookedTimesForDate = state.bookedSlots[state.selectedDate] || [];

        timeSlots.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.classList.add('time-slot');
            timeSlot.textContent = time;

            // Verificar se o horário já está agendado
            if (bookedTimesForDate.includes(time)) {
                timeSlot.classList.add('booked');
            } else {
                // Horário disponível
                timeSlot.setAttribute('data-time', time);

                // Verificar se é o horário selecionado
                if (state.selectedTime === time) {
                    timeSlot.classList.add('selected');
                }

                // Evento de clique
                timeSlot.addEventListener('click', function () {
                    const selectedTime = this.getAttribute('data-time');
                    selectTime(selectedTime);
                });
            }

            timeSlotsElement.appendChild(timeSlot);
        });
    }

    // Selecionar data
    function selectDate(date) {
        // Remover seleção anterior
        const prevSelected = document.querySelector('.calendar-day.selected');
        if (prevSelected) {
            prevSelected.classList.remove('selected');
        }

        // Atualizar seleção atual
        state.selectedDate = date;
        const newSelected = document.querySelector(`.calendar-day[data-date="${date}"]`);
        if (newSelected) {
            newSelected.classList.add('selected');
        }

        // Redefinir horário selecionado
        state.selectedTime = null;

        // Gerar horários para a data selecionada
        generateTimeSlots();

        // Verificar se devemos exibir o formulário de email
        updateClientInfoVisibility();
    }

    // Selecionar horário
    function selectTime(time) {
        // Remover seleção anterior
        const prevSelected = document.querySelector('.time-slot.selected');
        if (prevSelected) {
            prevSelected.classList.remove('selected');
        }

        // Atualizar seleção atual
        state.selectedTime = time;
        const newSelected = document.querySelector(`.time-slot[data-time="${time}"]`);
        if (newSelected) {
            newSelected.classList.add('selected');
        }

        // Verificar se devemos exibir o formulário de email
        updateClientInfoVisibility();
    }

    // Verificar e atualizar visibilidade do formulário de email
    function updateClientInfoVisibility() {
        if (state.selectedDate && state.selectedTime && state.selectedService) {
            clientInfoContainer.classList.remove('hidden');
            bookButton.classList.remove('hidden');
        } else {
            clientInfoContainer.classList.add('hidden');
            bookButton.classList.add('hidden');
        }
    }

    // Eventos para navegação do calendário
    prevMonthButton.addEventListener('click', function () {
        state.currentMonth.setMonth(state.currentMonth.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', function () {
        state.currentMonth.setMonth(state.currentMonth.getMonth() + 1);
        renderCalendar();
    });

    // Evento para seleção de serviço
    serviceSelect.addEventListener('change', function () {
        state.selectedService = this.value;
        updateClientInfoVisibility();
    });

    // Evento para campo de email
    clientEmailInput.addEventListener('input', function () {
        state.clientEmail = this.value;
    });

    // Evento para botão de agendamento
    bookButton.addEventListener('click', function () {
        if (!validateEmail(state.clientEmail)) {
            showToast('Por favor, insira um email válido', 'error');
            return;
        }

        // Simular agendamento
        const booking = {
            date: state.selectedDate,
            time: state.selectedTime,
            service: state.selectedService,
            email: state.clientEmail
        };

        // Em um cenário real, enviaríamos para o servidor
        console.log('Agendamento:', booking);

        // Adicionar à lista de agendados
        if (!state.bookedSlots[state.selectedDate]) {
            state.bookedSlots[state.selectedDate] = [];
        }
        state.bookedSlots[state.selectedDate].push(state.selectedTime);

        // Mostrar confirmação
        showToast('Agendamento realizado com sucesso!', 'success');

        // Resetar formulário
        resetForm();
    });

    // Validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Mostrar toast de notificação
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');

        const toast = document.createElement('div');
        toast.classList.add('alert', 'mb-2');

        if (type === 'success') {
            toast.classList.add('alert-success');
        } else if (type === 'error') {
            toast.classList.add('alert-error');
        } else {
            toast.classList.add('alert-info');
        }

        toast.innerHTML = `
                    <span>${message}</span>
                `;

        toastContainer.appendChild(toast);

        // Remover após 3 segundos
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Resetar formulário após agendamento
    function resetForm() {
        state.selectedDate = null;
        state.selectedTime = null;
        state.clientEmail = null;
        serviceSelect.value = "";
        clientEmailInput.value = "";

        // Atualizar UI
        renderCalendar();
        timeSlotContainer.classList.add('hidden');
        clientInfoContainer.classList.add('hidden');
        bookButton.classList.add('hidden');
    }

    // Inicialização
    renderCalendar();
});