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

/* CREAZIONE AUTOMATICA DEL CONTENITORE DI SFONDO */
let bgContainer = document.getElementById('bg-container');
if (!bgContainer) {
    bgContainer = document.createElement('div');
    bgContainer.id = 'bg-container';
    document.body.appendChild(bgContainer);
}

/* FUNZIONE PER EMOJI FLUTTUANTI */
function initBackgroundEmojis() {
    const emojis = ['🌷', '🍗', '✨', '💕', '⭐', '🔥', '💥', '🌈', '🍗', '🍗', '🌹'];
    // Creiamo 30 particelle sparse ovunque nello spazio della pagina
    for (let i = 0; i < 200; i++) {
        const span = document.createElement('span');
        span.classList.add('floating-emoji');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Posizione iniziale casuale su tutto lo schermo (X e Y)
        span.style.left = Math.random() * window.innerWidth + 'px';
        span.style.top = Math.random() * window.innerHeight + 'px';
        
        // Durata e ritardo dell'animazione casuali per un effetto naturale e non sincronizzato
        span.style.animationDuration = (Math.random() * 4 + 4) + 's'; // Tra 4 e 8 secondi
        span.style.animationDelay = (Math.random() * 5) + 's';
        
        // Dimensione casuale
        span.style.fontSize = (Math.random() * 12 + 18) + 'px';
        
        bgContainer.appendChild(span);
    }
}

// Avvio lo sfondo dinamico
initBackgroundEmojis();

/* FUNZIONE PER LA PIOGGIA DI CONFETTI */
function createConfetti() {
    const emojis = ['🎉', '🎊'];
    for (let i = 0; i < 40; i++) {
        const div = document.createElement('div');
        div.classList.add('confetti');
        div.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Sparsi su tutta la larghezza dello schermo
        div.style.left = Math.random() * window.innerWidth + 'px';
        
        // Partono da altezze leggermente diverse sopra lo schermo per non formare una riga
        div.style.top = (-20 - Math.random() * 80) + 'px';
        
        // Velocità e ritardo casuali per un effetto "pioggia vera" sfalsata
        div.style.animationDuration = (Math.random() * 2 + 3) + 's';
        div.style.animationDelay = (Math.random() * 0.5) + 's';
        div.style.fontSize = (Math.random() * 15 + 18) + 'px';
        
        document.body.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 5500);
    }
}

/* GESTIONE CLICK SU YES */
btnYes.addEventListener('click', function() {
    screen1.style.display = 'none'; // nascondo la prima scheda
    screenYay.style.display = 'block'; // mostro la scheda Yay
    createConfetti(); // faccio partire la pioggia di emojis
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

/* GESTIONE DEL BOTTONE 'NO' CHE SCAPPA (PER PC E SMARTPHONE) */
function escapeButton(e) {
    if (e) e.preventDefault(); // impedisce il click effettivo su mobile

    const margin = 50;

    const btnWidth = btnNo.offsetWidth > 0 ? btnNo.offsetWidth : 90;
    const btnHeight = btnNo.offsetHeight > 0 ? btnNo.offsetHeight : 40;

    const maxAllowedX = window.innerWidth - btnWidth - margin;
    const maxAllowedY = window.innerHeight - btnHeight - margin;

    const safeMaxX = Math.max(margin, maxAllowedX);
    const safeMaxY = Math.max(margin, maxAllowedY);

    // Genero coordinate casuali all'interno dello schermo
    const randomX = Math.floor(Math.random() * (safeMaxX - margin)) + margin;
    const randomY = Math.floor(Math.random() * (safeMaxY - margin)) + margin;
    
    // Uso 'fixed' per ancorare il bottone alla finestra così non esce
    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.zIndex = '1000';
}

// Funzionamento con il mouse (PC)
btnNo.addEventListener('mouseover', escapeButton);
// Funzionamento con il tocco del dito (Smartphone)
btnNo.addEventListener('touchstart', escapeButton);

/* VARIABILI PER SALVARE LE SCELTE */
let selectedDate = "";
let selectedActivities = [];

// Catturo l'input della data
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
    dateInput.addEventListener('change', function() {
        selectedDate = dateInput.value;
    });
}


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

if (btnGotcha) {
    btnGotcha.addEventListener('click', function() {
        screen3.style.display = 'none';
        screenSummary.style.display = 'block';

        const displayDate = selectedDate ? selectedDate: "To be decided 👀";
        const displayActivities = selectedActivities.length > 0 ? selectedActivities.join(', ') : "We'll see 😏";

        // Formatto il testo del riepilogo
        if (summaryTextDiv) {
            summaryTextDiv.innerHTML = "📅 <strong>When:</strong> " + displayDate + "<br><br>🔥 <strong>The vibe:</strong> " + displayActivities;
        }
    });
}


/* GESTIONE INVIO SU WHATSAPP */
const btnWhatsapp = document.querySelector('.btn_whatsapp');
if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', function() {
        const phoneNumber = "393451187602";
        const finalDate = selectedDate ? selectedDate : "To be decided";
        const finalActivities = selectedActivities.length > 0 ? selectedActivities.join(', ') : "We'll see";

        // Link al sito GitHub + i parametri passati in automatico
        const baseURL = "https://gb02.github.io/date-planner/";
        const shareURL = baseURL + "?date=" + encodeURIComponent(finalDate) + "&activities=" + encodeURIComponent(finalActivities);

        // Messaggio da inviare
        const message = "It's a date! 🔥\n📅 When: " + finalDate + "\n⭐ The vibe: " + finalActivities + "\n\nCheck the plan here: " + shareURL;    
        const whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
        window.open(whatsappUrl, '_blank');
    });
}

/* GESTIONE DELL'APERTURA DEL SITO SE IL LINK HA DEI PARAMETRI */
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramDate = urlParams.get('date');
    const paramActivities = urlParams.get('activities');

    if (paramDate && paramActivities) {
        // Nascondo tutte le schermate iniziali se l'url ha parametri
        document.querySelectorAll('.question_1, .yay, .question_2, .question_3').forEach(el => el.style.display = 'none');

        // Mostro la schermata di riepilogo
        const summaryScreen = document.querySelector('.summary');
        const sumText = document.getElementById('summary_text');

        if (summaryScreen && sumText) {
            summaryScreen.style.display = 'block';
            sumText.innerHTML = "📅 <strong>When:</strong> " + paramDate + "<br><br>🔥 <strong>The vibe:</strong> " + paramActivities;
        }
    }
})

/* GENERAZIONE CALENDARIO PERSONALIZZATO (18-31 DICEMBRE 2026) */
const calendarContainer = document.getElementById('custom-calendar');
const hiddenDateInput = document.getElementById('selected-date');

if (calendarContainer && hiddenDateInput) {
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    
    for (let day = 18; day <= 31; day++) {
        // Calcola il giorno della settimana esatto nel dicembre 2026
        const dateObj = new Date(2026, 11, day); // 11 = Dicembre in JS
        const dayName = daysOfWeek[dateObj.getDay()];
        
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'day-btn';
        btn.innerHTML = `${day}<span>${dayName}</span>`;
        
        btn.addEventListener('click', function() {
            // Rimuove la selezione da eventuali altri giorni
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
            // Seleziona questo giorno
            btn.classList.add('selected');
            // Salva il valore formattato (es. "2026-12-20")
            hiddenDateInput.value = `2026-12-${day}`;
        });
        
        calendarContainer.appendChild(btn);
    }
}

/* CONTROLLO SU BTN NEXT PER LA DATA SELEZIONATA */
btnNext.addEventListener('click', function() {
    const selectedDate = hiddenDateInput ? hiddenDateInput.value : '';
    
    if (!selectedDate) {
        alert("Seleziona prima uno dei giorni disponibili dal 18 al 31 dicembre! 🎄");
        return;
    }

    // Procedi alla schermata delle attività (adatta i nomi delle tue variabili schermo se diversi)
    screen2.style.display = 'none';
    screen3.style.display = 'block';
});