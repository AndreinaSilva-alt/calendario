const calendar = document.getElementById('calendar');
const modal = document.getElementById('noteModal');
const noteInput = document.getElementById('noteInput');
const modalDateTitle = document.getElementById('modalDateTitle');
const monthYearLabel = document.getElementById('monthYear');

let currentDate = new Date();
let selectedDay = null;

function updateMonthLabel() {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  monthYearLabel.textContent = `${monthNames[month]} ${year}`;
}

function generateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  calendar.innerHTML = "";
  updateMonthLabel();

  for (let i = 0; i < startDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${year}-${month + 1}-${day}`;
    const note = localStorage.getItem(key) || "";
    calendar.innerHTML += `
      <div class="day" onclick="openModal('${key}', ${day})">
        <strong>${day}</strong>
        <div class="note">${note}</div>
      </div>`;
  }
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  generateCalendar();
}

function openModal(dateKey, day) {
  selectedDay = dateKey;
  modalDateTitle.innerText = `Dia ${day}`;
  noteInput.value = localStorage.getItem(dateKey) || "";
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  selectedDay = null;
}

function saveNote() {
  const note = noteInput.value.trim();
  if (selectedDay) {
    localStorage.setItem(selectedDay, note);
    generateCalendar();
  }
  closeModal();
}

window.onclick = function(e) {
  if (e.target === modal) {
    closeModal();
  }
}

generateCalendar();
