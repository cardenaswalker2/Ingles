document.addEventListener('DOMContentLoaded', () => {
    // Solo ejecuta este script si estamos en la página de cursos
    if (!document.getElementById('learn')) return;
    
    // MODIFICACIÓN 1: El array ahora contiene las URLs completas
    const videoData = [
        { topic: 'The Alphabet', icon: 'sort_by_alpha', videoFile: 'https://github.com/cardenaswalker2/Ingles/raw/main/videos/grammar.mp4', level: 'beginner', description: 'Aprende la pronunciación correcta de cada letra del abecedario.' },
        { topic: 'Basic Greetings', icon: 'waving_hand', videoFile: 'https://github.com/cardenaswalker2/Ingles/raw/main/videos/greetings.mp4', level: 'beginner', description: 'Domina los saludos y despedidas más comunes para tus primeras conversaciones.' },
        { topic: 'Past Simple', icon: 'history', videoFile: 'https://github.com/cardenaswalker2/Ingles/raw/main/videos/pass.mp4', level: 'intermediate', description: 'Un video claro y conciso para dominar el Pasado Simple.' },
        { topic: 'Travel Vocabulary', icon: 'flight_takeoff', videoFile: 'https://github.com/cardenaswalker2/Ingles/raw/main/videos/vocabulary.mp4', level: 'intermediate', description: 'Vocabulario esencial que necesitarás en tu próximo viaje.' },
        { topic: 'Conditionals', icon: 'rule', videoFile: 'https://github.com/cardenaswalker2/Ingles/raw/main/videos/conditionals.mp4', level: 'advanced', description: 'Explora los diferentes tipos de condicionales para expresar ideas complejas.' },
        { topic: 'Business Idioms', icon: 'business_center', videoFile: 'https://github.com/cardenaswalker2/Ingles/raw/main/videos/idioms.mp4', level: 'advanced', description: 'Aprende expresiones idiomáticas comunes en el entorno de negocios.' }
    ];

    let currentLevel = 'all';
    let viewedVideos = JSON.parse(localStorage.getItem('viewedVideos')) || [];

    const elements = {
        levelFilters: document.getElementById('level-filters'),
        topicGrid: document.getElementById('topic-grid'),
        noResults: document.getElementById('no-results'),
        videoDisplay: document.getElementById('video-display-area'),
        videoTitle: document.getElementById('video-title'),
        videoPlayer: document.getElementById('video-player'),
        videoSource: document.getElementById('video-source'),
        videoLoader: document.getElementById('video-loader'),
        videoDescription: document.getElementById('video-description')
    };

    const renderTopicCards = () => {
        elements.topicGrid.innerHTML = '';
        const filteredVideos = videoData.filter(v => currentLevel === 'all' || v.level === currentLevel);
        elements.noResults.style.display = filteredVideos.length === 0 ? 'block' : 'none';

        filteredVideos.forEach((video, index) => {
            const card = document.createElement('div');
            card.className = 'topic-card';
            if (viewedVideos.includes(video.topic)) card.classList.add('viewed');
            card.style.animationDelay = `${index * 50}ms`;
            card.innerHTML = `<span class="material-icons topic-icon">${video.icon}</span><span>${video.topic}</span>`;
            card.addEventListener('click', () => loadVideo(video, card));
            elements.topicGrid.appendChild(card);
        });
    };

    const loadVideo = (video, cardElement) => {
        elements.videoDisplay.style.display = 'block';
        elements.videoTitle.textContent = video.topic;
        elements.videoDescription.textContent = video.description;
        elements.videoLoader.style.display = 'block';
        
        // MODIFICACIÓN 2: Asigna directamente la URL completa
        elements.videoSource.src = video.videoFile;
        
        elements.videoPlayer.load();
        elements.videoPlayer.play();
        elements.videoDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        if (!viewedVideos.includes(video.topic)) {
            viewedVideos.push(video.topic);
            localStorage.setItem('viewedVideos', JSON.stringify(viewedVideos));
            cardElement.classList.add('viewed');
        }
    };

    elements.levelFilters.addEventListener('click', (e) => {
        if (e.target.matches('.filter-btn')) {
            currentLevel = e.target.dataset.level;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderTopicCards();
        }
    });

    elements.videoPlayer.addEventListener('canplay', () => {
        elements.videoLoader.style.display = 'none';
    });

    renderTopicCards();
});