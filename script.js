function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() { document.getElementById('profile-img').src = reader.result; }
    reader.readAsDataURL(event.target.files[0]);
}

function addExperience() {
    const container = document.querySelector('#experience-section .entry-group');
    const html = `<div class="entry">
        <div class="date" contenteditable="true" data-placeholder="Dates"></div>
        <div class="details">
            <strong contenteditable="true" data-placeholder="Job Title"></strong><br>
            <em contenteditable="true" data-placeholder="Company"></em>
            <ul contenteditable="true"><li>Achievement...</li></ul>
        </div>
        <button class="delete-btn no-print" onclick="this.parentElement.remove()">×</button>
    </div>`;
    container.insertAdjacentHTML('beforeend', html);
}

function addEducation() {
    const container = document.querySelector('#education-section .entry-group');
    const html = `<div class="entry">
        <div class="date" contenteditable="true" data-placeholder="Year"></div>
        <div class="details">
            <strong contenteditable="true" data-placeholder="Degree"></strong><br>
            <em contenteditable="true" data-placeholder="Institution"></em>
        </div>
        <button class="delete-btn no-print" onclick="this.parentElement.remove()">×</button>
    </div>`;
    container.insertAdjacentHTML('beforeend', html);
}

function togglePreview() {
    const isPreview = document.body.classList.toggle('preview-mode');
    const btn = document.getElementById('previewBtn');
    btn.innerText = isPreview ? "Back to Edit" : "Preview Mode";
    btn.style.background = isPreview ? "#e67e22" : "#3498db";
}

function downloadPDF() {
    const element = document.getElementById('resume-content');
    
    // Force preview mode for a clean PDF (no buttons/placeholders)
    const wasPreview = document.body.classList.contains('preview-mode');
    document.body.classList.add('preview-mode');

    const opt = {
        margin: 0,
        filename: 'My_Resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
        // Return to the previous view after saving
        if (!wasPreview) document.body.classList.remove('preview-mode');
    });
}

function resetForm() {
    if(confirm("Are you sure you want to clear all data and reset the form?")) {
        window.location.reload();
    }
}
