/* CATTURO I BUTTONS E LE SCHERMATE */
const btnYes = document.getElementById('btn_yes');
const screen1 = document.querySelector('.question_1');
const screenYay = document.querySelector('.yay');

const btnContinue = document.querySelector('.btn_continue');
const screen2 = document.querySelector('.question_2');

const btnNext = document.querySelector('.btn_next');
const screen3 = document.querySelector('.question_3');
const screen4 = document.querySelector('.summary');

const btnBackToYay = document.querySelector('.btn_back_to_yay');
const btnBackToDate = document.querySelector('.btn_back_to_date');
const btnBackToActivities = document.querySelector('.btn_back_to_activities');

const btnNo = document.getElementById('btn_no');

/* GESTIONE CLICK SU YES */
btnYes.addEventListener('click', function() {
    screen1.style.display = 'none'; // nascondo la prima scheda
    screenYay.style.display = 'block'; // mostro la scheda Yay
});

/* GESTIONE CLICK SU CONTINUE */
btnContinue.addEventListener('click', function() {
    screenYay.style.display = 'none';
    screen2.style.display = 'block';
});

/* GESTIONE CLICK SU NEXT */
btnNext.addEventListener('click', function() {
    screen2.style.display = 'none';
    screen3.style.display = 'block';
});

/* GESTIONE CLICK SU BACK */
btnBackToYay.addEventListener('click', function() {
    screen2.style.display = 'none';
    screenYay.style.display = "block";
});

btnBackToDate.addEventListener('click', function() {
    screen3.style.display = 'none';
    screen2.style.display = 'block';
});

btnBackToActivities.addEventListener('click', function() {
    screen4.style.display = 'none';
    screen3.style.display = 'block';
});

/* GESTIONE DEL BOTTONE 'NO' CHE SCAPPA */
btnNo.addEventListener('mouseover', function() {
    // Definisco un margine di sicurezza dai bordi
    const margin = 80;

    const maxX = (window.innerWidth - btnNo.offsetWidth) - margin;
    const maxY = (window.innerHeight - btnNo.offsetHeight) - margin;

    // Genero coordinate casuali all'interno dello schermo
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Rendiamo il bottone "assoluto" così può muoversi liberamente sullo schermo
    btnNo.style.position = 'absolute';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
});

/* VARIABILI PER SALVARE LE SCELTE */
let selectedDate = "";
let selectedActivities = [];

// Catturo l'input della data
const dateInput = document.querySelector('input[type="date"]');
dateInput.addEventListener('change', function() {
    selectedDate = dateInput.value;
});

// Catturo le attività selezionate
const activityButtons = document.querySelectorAll('.question_3 button:not(.btn_back_to_date):not(.btn_gotcha)');

activityButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Aggiungo o rimuovo un effetto visivo
        button.classList.toggle('selected');

        const activityText = button.textContent;

        //Se l'attività non è già nella lista, la aggiungo, altrimenti la rimuovo
        if (selectedActivities.includes(activityText)) {
            selectedActivities = selectedActivities.filter(item => item !== activityText);
        } else {
            selectedActivities.push(activityText);
        }
    });
});

/* GESTIONE CLICK SU GOTCHA */
const btnGotcha = document.querySelector('.btn_gotcha');
const screenSummary = document.querySelector('.summary');
const summaryTextDiv = document.getElementById('summary_text');

btnGotcha.addEventListener('click', function() {
    screen3.style.display = 'none';
    screenSummary.style.display = 'block';

    const displayDate = selectedDate ? selectedDate: "Whenever you're free 👀";
    const displayActivities = selectedActivities.length > 0 ? selectedActivities.join(', ') : "We'll see 😏";

    // Formatto il testo del riepilogo
    summaryTextDiv.innerHTML = "📅 <strong>When:</strong> " + displayDate + "<br><br>🔥 <strong>The vibe:</strong> " + displayActivities;
});

/* GESTIONE INVIO SU WHATSAPP */
const btnWhatsapp = document.querySelector('.btn_whatsapp');
btnWhatsapp.addEventListener('click', function() {
    const phoneNumber = "393451187602";
    const finalDate = selectedDate ? selectedDate : "Whenever I'm free";
    const finalActivities = selectedActivities.length > 0 ? selectedActivities.join(', ') : "JWe'll see";

    // Usiamo il '+' per unire testo e variabili in modo sicuro al 100%
    const message = "it's a date! 🔥\n📅 When: " + finalDate + "\n⭐ The vibe: " + finalActivities + "\n\nCheck the details here: " + "https://gb02.github.io/date-planner/";    
    const whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank');
});