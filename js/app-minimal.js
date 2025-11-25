/**
 * InfoAHKY - Minimal News Application
 * Clean, news-focused JavaScript
 */

// Application state
const App = {
    messages: [],
    editingId: null,
    currentFilter: 'all'
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
    setupEventListeners();
    renderNewsList();
});

// Load messages from localStorage
function loadMessages() {
    const stored = localStorage.getItem('infoahky_messages');
    if (stored) {
        App.messages = JSON.parse(stored);
    } else {
        // Add sample messages for first visit
        App.messages = [
            {
                id: generateId(),
                title: 'Tervetuloa InfoAHKY:yn',
                content: 'Tämä on organisaatiosi tiedotuskanava. Napauta viestiä lukeaksesi sen. Lisää uusi viesti + -painikkeella.',
                category: 'tuotekehitys',
                created: new Date().toISOString(),
                updated: new Date().toISOString()
            },
            {
                id: generateId(),
                title: 'Järjestelmä käytössä',
                content: 'InfoAHKY on nyt aktiivisessa käytössä. Viestit tallentuvat selaimen muistiin.',
                category: 'uutiset',
                created: new Date(Date.now() - 3600000).toISOString(),
                updated: new Date(Date.now() - 3600000).toISOString()
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
    const timeStr = now.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric' });
    
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('current-date');
    
    if (timeEl) timeEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
}

// Setup event listeners
function setupEventListeners() {
    // FAB button
    document.getElementById('fab-add').addEventListener('click', () => openModal());

    // Form submission
    document.getElementById('message-form').addEventListener('submit', handleFormSubmit);
    
    // Cancel and close buttons
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);

    // Close modal on backdrop click
    document.getElementById('message-modal').addEventListener('click', (e) => {
        if (e.target.id === 'message-modal') {
            closeModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

// Handle keyboard
function handleKeyboard(e) {
    const modal = document.getElementById('message-modal');
    if (modal.style.display !== 'none') {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
}

// Render news list - the main view
function renderNewsList() {
    const container = document.getElementById('main-content');
    
    // Filter messages
    let filtered = [...App.messages];
    if (App.currentFilter !== 'all') {
        filtered = filtered.filter(m => m.category === App.currentFilter);
    }
    
    // Sort by date, newest first
    filtered.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Build HTML
    let html = `
        <div class="filter-tabs">
            <button class="filter-tab ${App.currentFilter === 'all' ? 'active' : ''}" data-filter="all">Kaikki</button>
            <button class="filter-tab ${App.currentFilter === 'uutiset' ? 'active' : ''}" data-filter="uutiset">Uutiset</button>
            <button class="filter-tab ${App.currentFilter === 'tuotekehitys' ? 'active' : ''}" data-filter="tuotekehitys">Tuotekehitys</button>
            <button class="filter-tab ${App.currentFilter === 'it-tuki' ? 'active' : ''}" data-filter="it-tuki">IT-tuki</button>
            <button class="filter-tab ${App.currentFilter === 'turvallisuus' ? 'active' : ''}" data-filter="turvallisuus">Turvallisuus</button>
            <button class="filter-tab ${App.currentFilter === 'hr' ? 'active' : ''}" data-filter="hr">HR</button>
        </div>
    `;

    if (filtered.length > 0) {
        html += '<ul class="news-list">';
        filtered.forEach(msg => {
            const categoryLabel = getCategoryLabel(msg.category);
            html += `
                <li class="news-item" data-id="${msg.id}">
                    <div class="news-header">
                        <div class="news-title">${escapeHtml(msg.title)}</div>
                        <div class="news-right">
                            <span class="news-category ${msg.category}">${categoryLabel}</span>
                            <div class="news-meta">${formatDate(msg.created)}</div>
                        </div>
                    </div>
                    <div class="news-content">${escapeHtml(msg.content)}</div>
                    <div class="news-actions">
                        <button class="btn-action btn-edit" data-action="edit">Muokkaa</button>
                        <button class="btn-action btn-delete" data-action="delete">Poista</button>
                    </div>
                </li>
            `;
        });
        html += '</ul>';
    } else {
        html += `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <div class="empty-state-text">Ei viestejä</div>
            </div>
        `;
    }

    // Add stats at bottom
    const uutisCount = App.messages.filter(m => m.category === 'uutiset').length;
    const tuotekehitysCount = App.messages.filter(m => m.category === 'tuotekehitys').length;
    
    html += `
        <div class="stats-bar">
            <div class="stat-item">
                <div class="stat-value">${uutisCount}</div>
                <div class="stat-label">Uutista</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${tuotekehitysCount}</div>
                <div class="stat-label">Tuotekehitys</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${App.messages.length}</div>
                <div class="stat-label">Yhteensä</div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Add event listeners for news items
    container.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // If clicking on action buttons, don't toggle
            if (e.target.closest('.news-actions')) {
                const action = e.target.dataset.action;
                const id = item.dataset.id;
                if (action === 'edit') {
                    editMessage(id);
                } else if (action === 'delete') {
                    deleteMessage(id);
                }
                return;
            }
            // Toggle expanded state
            item.classList.toggle('expanded');
        });
    });

    // Add event listeners for filter tabs
    container.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            App.currentFilter = tab.dataset.filter;
            renderNewsList();
        });
    });
}

// Open modal for adding/editing
function openModal(message = null) {
    App.editingId = message ? message.id : null;
    
    document.getElementById('message-id').value = message ? message.id : '';
    document.getElementById('message-title').value = message ? message.title : '';
    document.getElementById('message-content').value = message ? message.content : '';
    document.getElementById('message-category').value = message ? message.category : 'uutiset';
    
    document.querySelector('.modal-title').textContent = message ? 'Muokkaa viestiä' : 'Lisää viesti';
    document.getElementById('message-modal').style.display = 'flex';
    document.getElementById('message-title').focus();
}

// Close modal
function closeModal() {
    document.getElementById('message-modal').style.display = 'none';
    document.getElementById('message-form').reset();
    App.editingId = null;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('message-title').value.trim();
    const content = document.getElementById('message-content').value.trim();
    const category = document.getElementById('message-category').value;
    
    if (!title || !content) {
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
    renderNewsList();
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
    if (confirm('Haluatko poistaa tämän viestin?')) {
        App.messages = App.messages.filter(m => m.id !== id);
        saveMessages();
        renderNewsList();
    }
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    // If less than 24 hours, show relative time
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) {
            const mins = Math.floor(diff / 60000);
            return mins < 1 ? 'Juuri nyt' : `${mins} min sitten`;
        }
        return `${hours} h sitten`;
    }
    
    // Otherwise show date
    return date.toLocaleDateString('fi-FI', {
        day: 'numeric',
        month: 'numeric'
    });
}

// Get category display label
function getCategoryLabel(category) {
    const labels = {
        'uutiset': 'Uutinen',
        'tuotekehitys': 'Tuotekehitys',
        'it-tuki': 'IT-tuki',
        'turvallisuus': 'Turvallisuus',
        'hr': 'HR'
    };
    return labels[category] || category;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
