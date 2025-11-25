/**
 * InfoAHKY - Teletext-style News Application
 * Main JavaScript Application
 */

// Application state
const App = {
    currentPage: 100,
    messages: [],
    editingId: null
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    setupEventListeners();
    navigateToPage(100);
});

// Load messages from localStorage
function loadMessages() {
    const stored = localStorage.getItem('infoahky_messages');
    if (stored) {
        App.messages = JSON.parse(stored);
    } else {
        // Add some default sample messages
        App.messages = [
            {
                id: generateId(),
                title: 'Tervetuloa InfoAHKY:yn',
                content: 'Tämä on organisaatiosi tiedotuskanava. Voit lisätä omia viestejäsi painamalla "LISÄÄ VIESTI" -nappia.',
                category: 'tiedotteet',
                created: new Date().toISOString(),
                updated: new Date().toISOString()
            },
            {
                id: generateId(),
                title: 'Järjestelmä käytössä',
                content: 'InfoAHKY on nyt aktiivisessa käytössä. Kaikki viestit tallentuvat selaimen muistiin.',
                category: 'uutiset',
                created: new Date().toISOString(),
                updated: new Date().toISOString()
            }
        ];
        saveMessages();
    }
}

// Save messages to localStorage
function saveMessages() {
    localStorage.setItem('infoahky_messages', JSON.stringify(App.messages));
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Update date and time display
function updateDateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' });
    
    document.getElementById('current-time').textContent = timeStr;
    document.getElementById('current-date').textContent = dateStr;
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            navigateToPage(page);
        });
    });

    // Form submission
    document.getElementById('message-form').addEventListener('submit', handleFormSubmit);
    
    // Cancel button
    document.getElementById('cancel-btn').addEventListener('click', closeModal);

    // Close modal on backdrop click
    document.getElementById('message-modal').addEventListener('click', (e) => {
        if (e.target.id === 'message-modal') {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

// Handle keyboard navigation
function handleKeyboard(e) {
    if (document.getElementById('message-modal').style.display !== 'none') {
        if (e.key === 'Escape') {
            closeModal();
        }
        return;
    }

    switch(e.key) {
        case '1':
            navigateToPage(100);
            break;
        case '2':
            navigateToPage(200);
            break;
        case '3':
            navigateToPage(300);
            break;
        case '4':
            navigateToPage(400);
            break;
    }
}

// Navigate to page
function navigateToPage(pageNum) {
    App.currentPage = pageNum;
    
    // Update page number display
    document.querySelector('.page-number').textContent = pageNum;
    
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.page) === pageNum) {
            btn.classList.add('active');
        }
    });

    // Render page content
    const mainContent = document.getElementById('main-content');
    
    switch(pageNum) {
        case 100:
            renderHomePage(mainContent);
            break;
        case 200:
            renderMessagesPage(mainContent, 'uutiset', 'UUTISET');
            break;
        case 300:
            renderMessagesPage(mainContent, 'tiedotteet', 'TIEDOTTEET');
            break;
        case 400:
            openModal();
            break;
    }
}

// Render home page
function renderHomePage(container) {
    const uutisCount = App.messages.filter(m => m.category === 'uutiset').length;
    const tiedoteCount = App.messages.filter(m => m.category === 'tiedotteet').length;
    const recent = [...App.messages].sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 5);

    container.innerHTML = `
        <h2 class="page-title">ETUSIVU</h2>
        
        <div class="recent-section">
            <h3 class="section-title">VIIMEISIMMÄT VIESTIT</h3>
            ${recent.length > 0 ? recent.map(msg => `
                <div class="recent-item">
                    <div class="recent-title">► ${escapeHtml(msg.title)}</div>
                    <div class="recent-date">${formatDate(msg.created)}</div>
                </div>
            `).join('') : '<div class="empty-state"><div class="empty-state-text">Ei viestejä</div></div>'}
        </div>

        <div class="home-stats">
            <div class="stat-box">
                <div class="stat-number">${uutisCount}</div>
                <div class="stat-label">UUTISTA</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">${tiedoteCount}</div>
                <div class="stat-label">TIEDOTETTA</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">${App.messages.length}</div>
                <div class="stat-label">YHTEENSÄ</div>
            </div>
        </div>

        <div class="home-welcome">
            <div class="welcome-title">Tervetuloa InfoAHKY:yn!</div>
            <div class="welcome-text">Organisaatiosi tiedotuskanava</div>
        </div>

        <div class="keyboard-hints">
            Näppäimet: 1=Etusivu | 2=Uutiset | 3=Tiedotteet | 4=Lisää viesti
        </div>
    `;
}

// Render messages page
function renderMessagesPage(container, category, title) {
    const messages = App.messages
        .filter(m => m.category === category)
        .sort((a, b) => new Date(b.created) - new Date(a.created));

    container.innerHTML = `
        <h2 class="page-title">${title}</h2>
        
        ${messages.length > 0 ? messages.map(msg => `
            <div class="message-card" data-id="${msg.id}">
                <div class="message-header">
                    <span class="message-title">${escapeHtml(msg.title)}</span>
                    <span class="message-meta">${formatDate(msg.created)}</span>
                </div>
                <div class="message-content">${escapeHtml(msg.content)}</div>
                <div class="message-actions">
                    <button class="btn-edit" onclick="editMessage('${msg.id}')">MUOKKAA</button>
                    <button class="btn-delete" onclick="deleteMessage('${msg.id}')">POISTA</button>
                </div>
            </div>
        `).join('') : `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <div class="empty-state-text">Ei viestejä tässä kategoriassa</div>
            </div>
        `}
    `;
}

// Open modal for adding new message
function openModal(message = null) {
    App.editingId = message ? message.id : null;
    
    document.getElementById('message-id').value = message ? message.id : '';
    document.getElementById('message-title').value = message ? message.title : '';
    document.getElementById('message-content').value = message ? message.content : '';
    document.getElementById('message-category').value = message ? message.category : 'uutiset';
    
    document.getElementById('message-modal').style.display = 'flex';
    document.getElementById('message-title').focus();
    
    document.querySelector('.modal-content h2').textContent = message ? 'MUOKKAA VIESTIÄ' : 'LISÄÄ VIESTI';
}

// Close modal
function closeModal() {
    document.getElementById('message-modal').style.display = 'none';
    document.getElementById('message-form').reset();
    App.editingId = null;
    
    // If we navigated to page 400 (add message), go back to home
    if (App.currentPage === 400) {
        navigateToPage(100);
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('message-title').value.trim();
    const content = document.getElementById('message-content').value.trim();
    const category = document.getElementById('message-category').value;
    
    if (!title || !content) {
        alert('Täytä kaikki kentät!');
        return;
    }

    if (App.editingId) {
        // Update existing message
        const index = App.messages.findIndex(m => m.id === App.editingId);
        if (index !== -1) {
            App.messages[index].title = title;
            App.messages[index].content = content;
            App.messages[index].category = category;
            App.messages[index].updated = new Date().toISOString();
        }
    } else {
        // Create new message
        const newMessage = {
            id: generateId(),
            title: title,
            content: content,
            category: category,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };
        App.messages.push(newMessage);
    }
    
    saveMessages();
    closeModal();
    
    // Navigate to the category page of the message
    if (category === 'uutiset') {
        navigateToPage(200);
    } else {
        navigateToPage(300);
    }
}

// Edit message
function editMessage(id) {
    const message = App.messages.find(m => m.id === id);
    if (message) {
        openModal(message);
    }
}

// Delete message
function deleteMessage(id) {
    if (confirm('Haluatko varmasti poistaa tämän viestin?')) {
        App.messages = App.messages.filter(m => m.id !== id);
        saveMessages();
        navigateToPage(App.currentPage);
    }
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fi-FI', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
