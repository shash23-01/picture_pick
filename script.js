// Select DOM elements
const medicineNameInput = document.getElementById('medicineName');
const dosageInput = document.getElementById('dosage');
const timeInput = document.getElementById('time');
const addMedicineBtn = document.getElementById('addMedicine');
const medicineContainer = document.getElementById('medicineContainer');

// Load medicines from localStorage
let medicines = JSON.parse(localStorage.getItem('medicines')) || [];

// Render medicines to the list
function renderMedicines() {
    medicineContainer.innerHTML = '';
    medicines.forEach((medicine, index) => {
        const div = document.createElement('div');
        div.classList.add('medicine-item');
        div.innerHTML = `
            <div>
                <strong>${medicine.name}</strong> - ${medicine.dosage} 
                <small>(${medicine.time})</small>
            </div>
            <button class="delete-btn" onclick="deleteMedicine(${index})">Delete</button>
        `;
        medicineContainer.appendChild(div);
    });
}

// Add new medicine
addMedicineBtn.addEventListener('click', () => {
    const name = medicineNameInput.value.trim();
    const dosage = dosageInput.value.trim();
    const time = timeInput.value.trim();

    if (name && dosage && time) {
        medicines.push({ name, dosage, time });
        localStorage.setItem('medicines', JSON.stringify(medicines));
        renderMedicines();
        // Clear input fields
        medicineNameInput.value = '';
        dosageInput.value = '';
        timeInput.value = '';
        // Set reminder notification
        scheduleNotification(name, time);
    } else {
        alert('Please fill out all fields!');
    }
});

// Delete medicine
function deleteMedicine(index) {
    medicines.splice(index, 1);
    localStorage.setItem('medicines', JSON.stringify(medicines));
    renderMedicines();
}

// Schedule notification
function scheduleNotification(name, time) {
    const now = new Date();
    const reminderTime = new Date(`${now.toDateString()} ${time}`);
    const delay = reminderTime - now;

    if (delay > 0) {
        setTimeout(() => {
            alert(`Time to take your medicine: ${name}`);
        }, delay);
    }
}

// Initial render
renderMedicines();