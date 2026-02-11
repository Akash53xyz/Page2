function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const img = document.getElementById('profile-img');
        img.src = reader.result;
        // Hide text immediately once image is loaded
        document.getElementById('photo-text').style.display = 'none';
    }
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
}

function downloadPDF() {
    const element = document.getElementById('resume-content');
    const wasPreview = document.body.classList.contains('preview-mode');
    document.body.classList.add('preview-mode');

    html2pdf().from(element).set({
        margin: 0,
        filename: 'resume.pdf',
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).save().then(() => {
        if (!wasPreview) document.body.classList.remove('preview-mode');
    });
}

function resetForm() {
    if(confirm("Reset everything?")) window.location.reload();
}
