// Chinese Character Learning App - JavaScript

class ChineseCharacterApp {
    constructor() {
        this.currentTheme = 'light';
        this.currentSection = 'study';
        this.currentTab = 'characters';
        
        this.studyData = {
            currentCollection: null,
            currentIndex: 0,
            isAnswerShown: false,
            shuffled: false,
            characters: []
        };
        
        this.quizData = {
            currentCollection: null,
            currentQuestion: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            questions: [],
            mode: 'meaning',
            correctAnswerIndex: 0
        };
        
        // Initialize data from JSON
        this.initializeDataFromJSON();
        this.initializeEventListeners();
        this.initializeTheme();
        
        // Render everything after initialization
        setTimeout(() => {
            this.renderStudyCollections();
            this.renderQuizCollections();
            this.renderManageCharacters();
            this.renderManageCollections();
            this.showNotification('Приложение загружено. Нажмите "Загрузить JSON" для импорта ваших данных', 'info');
        }, 100);
    }

    initializeDataFromJSON() {
        // Load HSK1 characters from provided data (all editable now)
        this.allCharacters = [
            {"id": "hsk1_1", "character": "一", "pinyin": "yī", "palladius": "и", "meaning": "один", "examples": ["一个人 (один человек)", "一天 (один день)"], "type": "hsk1"},
            {"id": "hsk1_2", "character": "二", "pinyin": "èr", "palladius": "эр", "meaning": "два", "examples": ["二月 (февраль)", "二十 (двадцать)"], "type": "hsk1"},
            {"id": "hsk1_3", "character": "三", "pinyin": "sān", "palladius": "сань", "meaning": "три", "examples": ["三天 (три дня)", "три месяца (три месяца)"], "type": "hsk1"},
            {"id": "hsk1_4", "character": "四", "pinyin": "sì", "palladius": "сы", "meaning": "четыре", "examples": ["四月 (апрель)", "四十 (сорок)"], "type": "hsk1"},
            {"id": "hsk1_5", "character": "五", "pinyin": "wǔ", "palladius": "у", "meaning": "пять", "examples": ["五月 (май)", "五十 (пятьдесят)"], "type": "hsk1"},
            {"id": "hsk1_6", "character": "六", "pinyin": "liù", "palladius": "лю", "meaning": "шесть", "examples": ["六月 (июнь)", "шестьдесят (шестьдесят)"], "type": "hsk1"},
            {"id": "hsk1_7", "character": "七", "pinyin": "qī", "palladius": "ци", "meaning": "семь", "examples": ["七月 (июль)", "семьдесят (семьдесят)"], "type": "hsk1"},
            {"id": "hsk1_8", "character": "八", "pinyin": "bā", "palladius": "ба", "meaning": "восемь", "examples": ["八月 (август)", "восемьдесят (восемьдесят)"], "type": "hsk1"},
            {"id": "hsk1_9", "character": "九", "pinyin": "jiǔ", "palladius": "цзю", "meaning": "девять", "examples": ["九月 (сентябрь)", "девяносто (девяносто)"], "type": "hsk1"},
            {"id": "hsk1_10", "character": "十", "pinyin": "shí", "palladius": "ши", "meaning": "десять", "examples": ["十月 (октябрь)", "десять штук (десять штук)"], "type": "hsk1"},
            {"id": "hsk1_11", "character": "人", "pinyin": "rén", "palladius": "жэнь", "meaning": "человек, люди", "examples": ["中国人 (китаец)", "好人 (хороший человек)"], "type": "hsk1"},
            {"id": "hsk1_12", "character": "我", "pinyin": "wǒ", "palladius": "во", "meaning": "я", "examples": ["我是 (я есть)", "我的 (мой)"], "type": "hsk1"},
            {"id": "hsk1_13", "character": "你", "pinyin": "nǐ", "palladius": "ни", "meaning": "ты, вы", "examples": ["你好 (привет)", "你的 (твой)"], "type": "hsk1"},
            {"id": "hsk1_14", "character": "他", "pinyin": "tā", "palladius": "та", "meaning": "он", "examples": ["他是 (он есть)", "他的 (его)"], "type": "hsk1"},
            {"id": "hsk1_15", "character": "她", "pinyin": "tā", "palladius": "та", "meaning": "она", "examples": ["她好 (у неё всё хорошо)", "她的 (её)"], "type": "hsk1"},
            {"id": "hsk1_16", "character": "的", "pinyin": "de", "palladius": "дэ", "meaning": "притяжательная частица", "examples": ["我的书 (моя книга)", "他的朋友 (его друг)"], "type": "hsk1"},
            {"id": "hsk1_17", "character": "是", "pinyin": "shì", "palladius": "ши", "meaning": "быть, являться", "examples": ["我是学生 (я студент)", "это书 (это книга)"], "type": "hsk1"},
            {"id": "hsk1_18", "character": "不", "pinyin": "bù", "palladius": "бу", "meaning": "не, нет", "examples": ["不好 (плохо)", "不是 (не является)"], "type": "hsk1"},
            {"id": "hsk1_19", "character": "了", "pinyin": "le", "palladius": "лэ", "meaning": "частица завершённого действия", "examples": ["吃了 (съел)", "看了 (посмотрел)"], "type": "hsk1"},
            {"id": "hsk1_20", "character": "在", "pinyin": "zài", "palladius": "цзай", "meaning": "находиться в/на", "examples": ["在家 (дома)", "在北京 (в Пекине)"], "type": "hsk1"},
            {"id": "kangxi_1", "character": "一", "pinyin": "yī", "palladius": "и", "meaning": "один", "examples": ["Ключ №1 (1 черта)"], "type": "kangxi", "number": 1, "strokes": 1},
            {"id": "kangxi_2", "character": "丨", "pinyin": "gǔn", "palladius": "гунь", "meaning": "линия", "examples": ["Ключ №2 (1 черта)"], "type": "kangxi", "number": 2, "strokes": 1},
            {"id": "kangxi_9", "character": "人", "pinyin": "rén", "palladius": "жэнь", "meaning": "человек", "examples": ["Ключ №9 (2 черты)"], "type": "kangxi", "number": 9, "strokes": 2},
            {"id": "kangxi_30", "character": "口", "pinyin": "kǒu", "palladius": "коу", "meaning": "рот", "examples": ["Ключ №30 (3 черты)"], "type": "kangxi", "number": 30, "strokes": 3},
            {"id": "kangxi_32", "character": "土", "pinyin": "tǔ", "palladius": "ту", "meaning": "земля", "examples": ["Ключ №32 (3 черты)"], "type": "kangxi", "number": 32, "strokes": 3}
        ];

        // Initialize collections
        this.allCollections = {
            "all_hsk1": {
                name: "Все HSK 1",
                description: "Полный набор иероглифов первого уровня HSK",
                characters: this.allCharacters.filter(c => c.type === 'hsk1').map(c => c.character),
                type: "default"
            },
            "numbers": {
                name: "Числа",
                description: "Основные числительные от 1 до 10",
                characters: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
                type: "default"
            },
            "personal_pronouns": {
                name: "Личные местоимения", 
                description: "Я, ты, он, она",
                characters: ["我", "你", "他", "她"],
                type: "default"
            },
            "all_kangxi": {
                name: "Все ключи Kangxi",
                description: "Полный набор ключей Kangxi",
                characters: this.allCharacters.filter(c => c.type === 'kangxi').map(c => c.character),
                type: "default"
            }
        };

        this.editingCharacter = null;
        this.editingCollection = null;
        this.selectedCharactersForCollection = new Set();
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Load JSON functionality - FIXED
        document.getElementById('load-json-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const fileInput = document.getElementById('json-file-input');
            if (fileInput) {
                fileInput.click();
            }
        });
        document.getElementById('json-file-input').addEventListener('change', (e) => this.loadJSON(e));

        // Download JSON
        document.getElementById('download-json-btn').addEventListener('click', () => this.downloadJSON());

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.dataset.section));
        });

        // Study section
        document.getElementById('shuffle-btn').addEventListener('click', () => this.shuffleStudyCards());
        document.getElementById('reset-study').addEventListener('click', () => this.resetStudy());
        document.getElementById('show-answer').addEventListener('click', () => this.showAnswer());
        document.getElementById('next-card').addEventListener('click', () => this.nextCard());
        document.getElementById('prev-card').addEventListener('click', () => this.prevCard());
        document.getElementById('back-to-collections').addEventListener('click', () => this.showStudyCollections());

        // Quiz section
        document.getElementById('quiz-mode').addEventListener('change', (e) => this.quizData.mode = e.target.value);
        document.getElementById('next-question').addEventListener('click', () => this.nextQuestion());
        document.getElementById('restart-quiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('back-to-quiz-collections').addEventListener('click', () => this.showQuizCollections());
        document.getElementById('back-to-quiz-collections-results').addEventListener('click', () => this.showQuizCollections());

        // Answer options (delegated event listener)
        document.getElementById('answer-options').addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-option')) {
                this.selectAnswer(parseInt(e.target.dataset.answer));
            }
        });

        // Management tabs
        document.querySelectorAll('.manage-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchManageTab(e.target.dataset.tab));
        });

        // Character management
        document.getElementById('add-character-btn').addEventListener('click', () => this.showCharacterForm());
        document.getElementById('character-form-element').addEventListener('submit', (e) => this.saveCharacter(e));
        document.getElementById('cancel-character-form').addEventListener('click', () => this.hideCharacterForm());
        document.getElementById('delete-character-btn').addEventListener('click', () => this.deleteCurrentCharacter());
        document.getElementById('manage-search').addEventListener('input', (e) => this.searchManageCharacters(e.target.value));

        // Collection management
        document.getElementById('add-collection-btn').addEventListener('click', () => this.showCollectionForm());
        document.getElementById('collection-form-element').addEventListener('submit', (e) => this.saveCollection(e));
        document.getElementById('cancel-collection-form').addEventListener('click', () => this.hideCollectionForm());
        document.getElementById('characters-search').addEventListener('input', (e) => this.searchAvailableCharacters(e.target.value));

        // Search section
        document.getElementById('search-input').addEventListener('input', (e) => this.performSearch(e.target.value));
        document.getElementById('clear-search').addEventListener('click', () => this.clearSearch());

        // Notification close
        document.getElementById('notification-close').addEventListener('click', () => this.hideNotification());
    }

    initializeTheme() {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme = prefersDark ? 'dark' : 'light';
        this.applyTheme();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        const icon = document.getElementById('theme-icon');
        icon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');

        this.currentSection = section;

        // Show appropriate content for each section
        if (section === 'study') {
            this.showStudyCollections();
        } else if (section === 'quiz') {
            this.showQuizCollections();
        }
    }

    switchManageTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.manage-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.manage-tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tab}-tab`).classList.add('active');

        this.currentTab = tab;

        if (tab === 'collections') {
            this.renderManageCollections();
        }
    }

    // JSON Save/Load functionality
    autoSaveJSON() {
        const data = {
            version: "1.0",
            lastModified: new Date().toISOString(),
            characters: this.allCharacters,
            collections: this.allCollections
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chinese-flashcards-data.json';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('JSON файл автоматически сохранён', 'success');
    }

    downloadJSON() {
        this.autoSaveJSON();
    }

    loadJSON(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.characters && Array.isArray(data.characters)) {
                    this.allCharacters = data.characters;
                }
                
                if (data.collections && typeof data.collections === 'object') {
                    this.allCollections = data.collections;
                }

                // Re-render everything
                this.renderStudyCollections();
                this.renderQuizCollections();
                this.renderManageCharacters();
                this.renderManageCollections();
                
                this.showNotification('Данные успешно загружены из JSON файла', 'success');
            } catch (error) {
                console.error('JSON load error:', error);
                this.showNotification('Ошибка при загрузке JSON файла: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        // Set message and style
        notificationText.textContent = message;
        notification.className = 'notification';
        
        if (type === 'success') {
            notification.style.backgroundColor = 'var(--color-success)';
        } else if (type === 'error') {
            notification.style.backgroundColor = 'var(--color-error)';
        } else {
            notification.style.backgroundColor = 'var(--color-info)';
        }
        
        // Show notification
        notification.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }

    hideNotification() {
        const notification = document.getElementById('notification');
        notification.classList.remove('show');
        notification.classList.add('hidden');
    }

    // Study functionality - FIXED
    renderStudyCollections() {
        const container = document.getElementById('collections-grid');
        if (!container) return;
        
        container.innerHTML = '';

        Object.entries(this.allCollections).forEach(([key, collection]) => {
            const card = document.createElement('div');
            card.className = 'collection-card';
            card.dataset.collection = key;

            const characters = this.getCollectionCharacters(collection);
            const preview = characters.slice(0, 6);

            card.innerHTML = `
                <div class="collection-name">${collection.name}</div>
                <div class="collection-count">${characters.length} иероглифов</div>
                <div class="collection-description">${collection.description || ''}</div>
                <div class="collection-preview">
                    ${preview.map(char => `<span class="preview-char">${char.character}</span>`).join('')}
                    ${characters.length > 6 ? '<span class="preview-char">...</span>' : ''}
                </div>
                <div class="collection-actions">
                    <button class="btn btn--primary btn--sm start-study">Начать изучение</button>
                </div>
            `;

            // FIXED: Event listeners for study buttons
            const startStudyBtn = card.querySelector('.start-study');
            startStudyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Starting study for collection:', key);
                this.selectStudyCollection(key);
            });

            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on the button
                if (!e.target.classList.contains('start-study')) {
                    console.log('Card clicked for collection:', key);
                    this.selectStudyCollection(key);
                }
            });

            container.appendChild(card);
        });
    }

    renderQuizCollections() {
        const container = document.getElementById('quiz-collections-grid');
        if (!container) return;
        
        container.innerHTML = '';

        Object.entries(this.allCollections).forEach(([key, collection]) => {
            const card = document.createElement('div');
            card.className = 'collection-card';
            card.dataset.collection = key;

            const characters = this.getCollectionCharacters(collection);
            const preview = characters.slice(0, 6);

            card.innerHTML = `
                <div class="collection-name">${collection.name}</div>
                <div class="collection-count">${characters.length} иероглифов</div>
                <div class="collection-description">${collection.description || ''}</div>
                <div class="collection-preview">
                    ${preview.map(char => `<span class="preview-char">${char.character}</span>`).join('')}
                    ${characters.length > 6 ? '<span class="preview-char">...</span>' : ''}
                </div>
                <div class="collection-actions">
                    <button class="btn btn--primary btn--sm start-quiz">Начать тест</button>
                </div>
            `;

            // FIXED: Event listeners for quiz buttons  
            const startQuizBtn = card.querySelector('.start-quiz');
            startQuizBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.quizData.currentCollection = key;
                this.startQuiz();
            });

            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on the button
                if (!e.target.classList.contains('start-quiz')) {
                    this.quizData.currentCollection = key;
                    this.startQuiz();
                }
            });

            container.appendChild(card);
        });
    }

    getCollectionCharacters(collection) {
        return collection.characters.map(char => 
            this.allCharacters.find(c => c.character === char)
        ).filter(c => c);
    }

    selectStudyCollection(collectionKey) {
        console.log('Selecting study collection:', collectionKey);
        const collection = this.allCollections[collectionKey];
        
        if (!collection) {
            console.error('Collection not found:', collectionKey);
            return;
        }

        const characters = this.getCollectionCharacters(collection);
        console.log('Collection characters:', characters);
        
        if (!characters || characters.length === 0) {
            alert('В выбранной коллекции нет иероглифов');
            return;
        }
        
        this.studyData.currentCollection = collectionKey;
        this.studyData.characters = characters;
        this.studyData.currentIndex = 0;
        this.studyData.isAnswerShown = false;
        this.studyData.shuffled = false;

        // Hide collections grid and show flashcard container
        this.showFlashcardContainer();
        this.displayCurrentCard();
    }

    showStudyCollections() {
        const collectionsGrid = document.getElementById('collections-grid');
        const flashcardContainer = document.getElementById('flashcard-container');
        
        if (collectionsGrid) collectionsGrid.classList.remove('hidden');
        if (flashcardContainer) flashcardContainer.classList.add('hidden');
    }

    showFlashcardContainer() {
        const collectionsGrid = document.getElementById('collections-grid');
        const flashcardContainer = document.getElementById('flashcard-container');
        
        if (collectionsGrid) collectionsGrid.classList.add('hidden');
        if (flashcardContainer) flashcardContainer.classList.remove('hidden');
    }

    showQuizCollections() {
        const quizCollectionsGrid = document.getElementById('quiz-collections-grid');
        const quizContainer = document.getElementById('quiz-container');
        
        if (quizCollectionsGrid) quizCollectionsGrid.classList.remove('hidden');
        if (quizContainer) quizContainer.classList.add('hidden');
    }

    showQuizContainer() {
        const quizCollectionsGrid = document.getElementById('quiz-collections-grid');
        const quizContainer = document.getElementById('quiz-container');
        
        if (quizCollectionsGrid) quizCollectionsGrid.classList.add('hidden');
        if (quizContainer) quizContainer.classList.remove('hidden');
    }

    displayCurrentCard() {
        if (!this.studyData.characters || !this.studyData.characters.length) {
            console.error('No characters to display');
            return;
        }

        const character = this.studyData.characters[this.studyData.currentIndex];
        console.log('Displaying character:', character);
        
        // Update front
        const cardCharacter = document.getElementById('card-character');
        const cardNumber = document.getElementById('card-number');
        
        if (cardCharacter) cardCharacter.textContent = character.character;
        if (cardNumber) cardNumber.textContent = `${this.studyData.currentIndex + 1} / ${this.studyData.characters.length}`;

        // Update back
        const backCharacter = document.getElementById('back-character');
        const backPinyin = document.getElementById('back-pinyin');
        const backPalladius = document.getElementById('back-palladius');
        const backMeaning = document.getElementById('back-meaning');
        
        if (backCharacter) backCharacter.textContent = character.character;
        if (backPinyin) backPinyin.textContent = character.pinyin;
        if (backPalladius) backPalladius.textContent = character.palladius;
        if (backMeaning) backMeaning.textContent = character.meaning;
        
        // Update examples
        const examplesContainer = document.getElementById('back-examples');
        if (examplesContainer) {
            examplesContainer.innerHTML = '';
            character.examples.forEach(example => {
                const div = document.createElement('div');
                div.className = 'example';
                div.textContent = example;
                examplesContainer.appendChild(div);
            });
        }

        // Reset view to front
        this.studyData.isAnswerShown = false;
        const flashcardFront = document.querySelector('.flashcard-front');
        const flashcardBack = document.querySelector('.flashcard-back');
        const showAnswerBtn = document.getElementById('show-answer');
        
        if (flashcardFront) flashcardFront.classList.remove('hidden');
        if (flashcardBack) flashcardBack.classList.add('hidden');
        if (showAnswerBtn) showAnswerBtn.textContent = 'Показать ответ';

        // Update navigation buttons
        const prevCardBtn = document.getElementById('prev-card');
        const nextCardBtn = document.getElementById('next-card');
        
        if (prevCardBtn) prevCardBtn.disabled = this.studyData.currentIndex === 0;
        if (nextCardBtn) nextCardBtn.disabled = this.studyData.currentIndex === this.studyData.characters.length - 1;
    }

    showAnswer() {
        const flashcardFront = document.querySelector('.flashcard-front');
        const flashcardBack = document.querySelector('.flashcard-back');
        const showAnswerBtn = document.getElementById('show-answer');
        
        if (!this.studyData.isAnswerShown) {
            if (flashcardFront) flashcardFront.classList.add('hidden');
            if (flashcardBack) flashcardBack.classList.remove('hidden');
            if (showAnswerBtn) showAnswerBtn.textContent = 'Скрыть ответ';
            this.studyData.isAnswerShown = true;
        } else {
            if (flashcardFront) flashcardFront.classList.remove('hidden');
            if (flashcardBack) flashcardBack.classList.add('hidden');
            if (showAnswerBtn) showAnswerBtn.textContent = 'Показать ответ';
            this.studyData.isAnswerShown = false;
        }
    }

    nextCard() {
        if (this.studyData.currentIndex < this.studyData.characters.length - 1) {
            this.studyData.currentIndex++;
            this.displayCurrentCard();
        }
    }

    prevCard() {
        if (this.studyData.currentIndex > 0) {
            this.studyData.currentIndex--;
            this.displayCurrentCard();
        }
    }

    shuffleStudyCards() {
        if (!this.studyData.characters.length) return;

        this.studyData.characters = this.shuffleArray([...this.studyData.characters]);
        this.studyData.currentIndex = 0;
        this.studyData.shuffled = true;
        this.displayCurrentCard();
    }

    resetStudy() {
        if (this.studyData.currentCollection) {
            this.selectStudyCollection(this.studyData.currentCollection);
        }
    }

    // Quiz functionality
    startQuiz() {
        if (!this.quizData.currentCollection) {
            alert('Коллекция не выбрана');
            return;
        }

        const collection = this.allCollections[this.quizData.currentCollection];
        
        if (!collection) {
            console.error('Collection not found:', this.quizData.currentCollection);
            return;
        }
        
        const characters = this.getCollectionCharacters(collection);

        if (characters.length < 4) {
            alert('В коллекции должно быть минимум 4 иероглифа для тестирования');
            return;
        }

        this.quizData.questions = this.shuffleArray([...characters]).slice(0, Math.min(10, characters.length));
        this.quizData.currentQuestion = 0;
        this.quizData.correctAnswers = 0;
        this.quizData.incorrectAnswers = 0;

        // Show quiz container and hide collections
        this.showQuizContainer();
        this.displayQuestion();
        
        const quizQuestion = document.getElementById('quiz-question');
        const quizResults = document.getElementById('quiz-results');
        
        if (quizQuestion) quizQuestion.classList.remove('hidden');
        if (quizResults) quizResults.classList.add('hidden');
    }

    displayQuestion() {
        if (!this.quizData.questions || !this.quizData.questions.length) {
            console.error('No questions available');
            return;
        }

        const question = this.quizData.questions[this.quizData.currentQuestion];

        // Update progress
        const quizCurrent = document.getElementById('quiz-current');
        const quizTotal = document.getElementById('quiz-total');
        const correctCount = document.getElementById('correct-count');
        const incorrectCount = document.getElementById('incorrect-count');
        
        if (quizCurrent) quizCurrent.textContent = this.quizData.currentQuestion + 1;
        if (quizTotal) quizTotal.textContent = this.quizData.questions.length;
        if (correctCount) correctCount.textContent = this.quizData.correctAnswers;
        if (incorrectCount) incorrectCount.textContent = this.quizData.incorrectAnswers;

        // Display character
        const questionCharacter = document.getElementById('question-character');
        if (questionCharacter) questionCharacter.textContent = question.character;

        // Create answer options
        const correctAnswer = this.getAnswerByMode(question);
        const wrongAnswers = this.generateWrongAnswers(question, this.allCharacters, 3);
        const allAnswers = this.shuffleArray([correctAnswer, ...wrongAnswers]);

        // Update question text
        const mode = this.quizData.mode;
        const questionTexts = {
            meaning: 'Выберите правильный перевод:',
            pinyin: 'Выберите правильный пиньинь:',
            palladius: 'Выберите правильную палладицу:'
        };
        const questionText = document.getElementById('question-text');
        if (questionText) questionText.textContent = questionTexts[mode];

        // Render options
        const optionsContainer = document.getElementById('answer-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            allAnswers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = 'answer-option';
                button.dataset.answer = index;
                button.textContent = answer;
                button.disabled = false;
                // Clear any previous classes
                button.classList.remove('correct', 'incorrect');
                optionsContainer.appendChild(button);
            });
        }

        this.quizData.correctAnswerIndex = allAnswers.indexOf(correctAnswer);
        
        // Hide feedback
        const quizFeedback = document.getElementById('quiz-feedback');
        if (quizFeedback) quizFeedback.classList.add('hidden');
    }

    getAnswerByMode(character) {
        switch (this.quizData.mode) {
            case 'meaning': return character.meaning;
            case 'pinyin': return character.pinyin;
            case 'palladius': return character.palladius;
            default: return character.meaning;
        }
    }

    generateWrongAnswers(correctCharacter, allCharacters, count) {
        const correctAnswer = this.getAnswerByMode(correctCharacter);
        const otherCharacters = allCharacters.filter(c => 
            c.character !== correctCharacter.character && 
            this.getAnswerByMode(c) !== correctAnswer
        );
        
        const shuffled = this.shuffleArray(otherCharacters);
        return shuffled.slice(0, count).map(c => this.getAnswerByMode(c));
    }

    selectAnswer(selectedIndex) {
        const isCorrect = selectedIndex === this.quizData.correctAnswerIndex;
        const options = document.querySelectorAll('.answer-option');
        
        // Disable all options and show results
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === this.quizData.correctAnswerIndex) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Update score
        if (isCorrect) {
            this.quizData.correctAnswers++;
        } else {
            this.quizData.incorrectAnswers++;
        }

        // Show feedback
        const feedbackContainer = document.getElementById('quiz-feedback');
        const feedbackText = document.getElementById('feedback-text');
        const correctAnswerDisplay = document.getElementById('correct-answer-display');

        if (feedbackText) {
            feedbackText.textContent = isCorrect ? '✅ Правильно!' : '❌ Неправильно';
            feedbackText.style.color = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
        }

        if (correctAnswerDisplay) {
            if (!isCorrect) {
                const question = this.quizData.questions[this.quizData.currentQuestion];
                const correctAnswer = this.getAnswerByMode(question);
                correctAnswerDisplay.textContent = `Правильный ответ: ${correctAnswer}`;
            } else {
                correctAnswerDisplay.textContent = '';
            }
        }

        if (feedbackContainer) feedbackContainer.classList.remove('hidden');

        // Update progress display
        const correctCount = document.getElementById('correct-count');
        const incorrectCount = document.getElementById('incorrect-count');
        
        if (correctCount) correctCount.textContent = this.quizData.correctAnswers;
        if (incorrectCount) incorrectCount.textContent = this.quizData.incorrectAnswers;
    }

    nextQuestion() {
        this.quizData.currentQuestion++;
        
        if (this.quizData.currentQuestion >= this.quizData.questions.length) {
            this.showQuizResults();
        } else {
            this.displayQuestion();
        }
    }

    showQuizResults() {
        const quizQuestion = document.getElementById('quiz-question');
        const quizResults = document.getElementById('quiz-results');
        
        if (quizQuestion) quizQuestion.classList.add('hidden');
        if (quizResults) quizResults.classList.remove('hidden');

        const total = this.quizData.correctAnswers + this.quizData.incorrectAnswers;
        const percentage = total > 0 ? Math.round((this.quizData.correctAnswers / total) * 100) : 0;

        const finalCorrect = document.getElementById('final-correct');
        const finalIncorrect = document.getElementById('final-incorrect');
        const finalPercentage = document.getElementById('final-percentage');
        
        if (finalCorrect) finalCorrect.textContent = this.quizData.correctAnswers;
        if (finalIncorrect) finalIncorrect.textContent = this.quizData.incorrectAnswers;
        if (finalPercentage) finalPercentage.textContent = `${percentage}%`;
    }

    // Character management - ALL characters are now editable
    showCharacterForm(character = null) {
        const form = document.getElementById('character-form');
        const title = document.getElementById('character-form-title');
        const deleteBtn = document.getElementById('delete-character-btn');
        
        if (character) {
            title.textContent = 'Редактировать иероглиф';
            document.getElementById('form-character').value = character.character;
            document.getElementById('form-pinyin').value = character.pinyin;
            document.getElementById('form-palladius').value = character.palladius;
            document.getElementById('form-meaning').value = character.meaning;
            document.getElementById('form-examples').value = character.examples.join('\n');
            this.editingCharacter = character;
            deleteBtn.classList.remove('hidden');
        } else {
            title.textContent = 'Добавить новый иероглиф';
            document.getElementById('character-form-element').reset();
            this.editingCharacter = null;
            deleteBtn.classList.add('hidden');
        }
        
        this.renderCollectionsCheckboxes();
        form.classList.remove('hidden');
    }

    hideCharacterForm() {
        document.getElementById('character-form').classList.add('hidden');
        this.editingCharacter = null;
    }

    renderCollectionsCheckboxes() {
        const container = document.getElementById('collections-checkboxes');
        container.innerHTML = '';

        // Show all collections (both default and custom)
        Object.entries(this.allCollections).forEach(([key, collection]) => {
            if (collection.type !== 'default') {  // Only show custom collections
                const checkbox = this.createCollectionCheckbox(key, collection.name);
                
                // Check if current character is in this collection
                if (this.editingCharacter && collection.characters.includes(this.editingCharacter.character)) {
                    checkbox.querySelector('input').checked = true;
                }
                
                container.appendChild(checkbox);
            }
        });

        if (Object.values(this.allCollections).filter(c => c.type !== 'default').length === 0) {
            container.innerHTML = '<p class="text-secondary">Нет пользовательских коллекций. Создайте коллекцию в разделе "Коллекции".</p>';
        }
    }

    createCollectionCheckbox(collectionKey, collectionName) {
        const wrapper = document.createElement('div');
        wrapper.className = 'collection-checkbox';
        
        wrapper.innerHTML = `
            <input type="checkbox" id="collection-${collectionKey}" value="${collectionKey}">
            <label for="collection-${collectionKey}">${collectionName}</label>
        `;
        
        return wrapper;
    }

    saveCharacter(event) {
        event.preventDefault();
        
        const formData = {
            character: document.getElementById('form-character').value.trim(),
            pinyin: document.getElementById('form-pinyin').value.trim(),
            palladius: document.getElementById('form-palladius').value.trim(),
            meaning: document.getElementById('form-meaning').value.trim(),
            examples: document.getElementById('form-examples').value.trim().split('\n').filter(e => e.trim())
        };

        if (this.editingCharacter) {
            // Update existing character
            Object.assign(this.editingCharacter, formData);
        } else {
            // Add new character
            const newCharacter = {
                id: 'custom_' + Date.now(),
                type: 'custom',
                ...formData
            };
            this.allCharacters.push(newCharacter);
        }

        // Update collections
        const selectedCollections = Array.from(document.querySelectorAll('#collections-checkboxes input[type="checkbox"]:checked'))
            .map(cb => cb.value);

        this.updateCharacterInCollections(formData.character, selectedCollections);

        this.hideCharacterForm();
        this.renderManageCharacters();
        this.renderStudyCollections();
        this.renderQuizCollections();
        
        // Auto-save JSON
        this.autoSaveJSON();
    }

    deleteCurrentCharacter() {
        if (this.editingCharacter && confirm(`Удалить иероглиф "${this.editingCharacter.character}"?`)) {
            const index = this.allCharacters.indexOf(this.editingCharacter);
            if (index > -1) {
                this.allCharacters.splice(index, 1);
                
                // Remove from all collections
                Object.values(this.allCollections).forEach(collection => {
                    if (collection.characters) {
                        collection.characters = collection.characters.filter(c => c !== this.editingCharacter.character);
                    }
                });
                
                this.hideCharacterForm();
                this.renderManageCharacters();
                this.renderManageCollections();
                this.renderStudyCollections();
                this.renderQuizCollections();
                
                // Auto-save JSON
                this.autoSaveJSON();
            }
        }
    }

    updateCharacterInCollections(character, selectedCollections) {
        // Remove character from all collections first
        Object.values(this.allCollections).forEach(collection => {
            if (collection.characters) {
                collection.characters = collection.characters.filter(c => c !== character);
            }
        });

        // Add character to selected collections
        selectedCollections.forEach(collectionKey => {
            if (this.allCollections[collectionKey]) {
                if (!this.allCollections[collectionKey].characters.includes(character)) {
                    this.allCollections[collectionKey].characters.push(character);
                }
            }
        });
    }

    renderManageCharacters(searchQuery = '') {
        const container = document.getElementById('characters-grid');
        if (!container) return;
        
        let filteredCharacters = this.allCharacters;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredCharacters = this.allCharacters.filter(char =>
                char.character.includes(query) ||
                char.pinyin.toLowerCase().includes(query) ||
                char.palladius.toLowerCase().includes(query) ||
                char.meaning.toLowerCase().includes(query)
            );
        }

        container.innerHTML = '';
        
        filteredCharacters.forEach(character => {
            const item = document.createElement('div');
            item.className = 'character-item';
            
            item.innerHTML = `
                <div class="character-info">
                    <div class="char-display">${character.character}</div>
                    <div class="char-pronunciation">
                        <div class="char-pinyin">${character.pinyin}</div>
                        <div class="char-palladius">${character.palladius}</div>
                    </div>
                    <div class="char-meaning">${character.meaning}</div>
                    <div class="char-examples">${character.examples.slice(0, 2).join('; ')}</div>
                </div>
                <div class="character-actions">
                    <button class="action-btn edit-btn" title="Редактировать">✏️</button>
                </div>
            `;

            // All characters are now editable
            item.addEventListener('click', () => this.showCharacterForm(character));
            item.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.showCharacterForm(character);
            });

            container.appendChild(item);
        });
    }

    searchManageCharacters(query) {
        this.renderManageCharacters(query);
    }

    // Collection management
    showCollectionForm(collection = null, collectionKey = null) {
        const form = document.getElementById('collection-form');
        const title = document.getElementById('collection-form-title');
        
        // Reset selected characters
        this.selectedCharactersForCollection.clear();
        
        if (collection) {
            title.textContent = 'Редактировать коллекцию';
            document.getElementById('form-collection-name').value = collection.name;
            document.getElementById('form-collection-description').value = collection.description || '';
            
            // Add current characters to selected set
            if (collection.characters) {
                collection.characters.forEach(char => this.selectedCharactersForCollection.add(char));
            }
            
            this.editingCollection = collectionKey;
        } else {
            title.textContent = 'Создать новую коллекцию';
            document.getElementById('collection-form-element').reset();
            this.editingCollection = null;
        }
        
        this.renderAvailableCharacters();
        this.updateSelectedCharactersDisplay();
        form.classList.remove('hidden');
    }

    hideCollectionForm() {
        document.getElementById('collection-form').classList.add('hidden');
        this.editingCollection = null;
        this.selectedCharactersForCollection.clear();
    }

    renderAvailableCharacters(searchQuery = '') {
        const container = document.getElementById('available-characters');
        if (!container) return;
        
        let filteredCharacters = this.allCharacters;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredCharacters = this.allCharacters.filter(char =>
                char.character.includes(query) ||
                char.pinyin.toLowerCase().includes(query) ||
                char.palladius.toLowerCase().includes(query) ||
                char.meaning.toLowerCase().includes(query)
            );
        }

        container.innerHTML = '';
        
        filteredCharacters.forEach(character => {
            const item = document.createElement('div');
            item.className = 'character-selection-item';
            
            const isSelected = this.selectedCharactersForCollection.has(character.character);
            
            item.innerHTML = `
                <input type="checkbox" ${isSelected ? 'checked' : ''} data-character="${character.character}">
                <div class="character-selection-info">
                    <div class="selection-char">${character.character}</div>
                    <div class="selection-details">
                        <div class="selection-pronunciation">${character.pinyin} / ${character.palladius}</div>
                        <div class="selection-meaning">${character.meaning}</div>
                    </div>
                </div>
            `;

            const checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectedCharactersForCollection.add(character.character);
                } else {
                    this.selectedCharactersForCollection.delete(character.character);
                }
                this.updateSelectedCharactersDisplay();
            });

            item.addEventListener('click', (e) => {
                if (e.target.type !== 'checkbox') {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });

            container.appendChild(item);
        });
    }

    updateSelectedCharactersDisplay() {
        const countElement = document.getElementById('selected-count');
        const listElement = document.getElementById('selected-characters-list');
        
        if (countElement) countElement.textContent = this.selectedCharactersForCollection.size;
        
        if (listElement) {
            listElement.innerHTML = '';
            this.selectedCharactersForCollection.forEach(char => {
                const character = this.allCharacters.find(c => c.character === char);
                
                if (character) {
                    const item = document.createElement('div');
                    item.className = 'selected-char-item';
                    item.innerHTML = `
                        ${character.character} (${character.pinyin})
                        <button class="selected-char-remove" data-character="${char}">×</button>
                    `;
                    
                    item.querySelector('.selected-char-remove').addEventListener('click', () => {
                        this.selectedCharactersForCollection.delete(char);
                        this.renderAvailableCharacters();
                        this.updateSelectedCharactersDisplay();
                    });
                    
                    listElement.appendChild(item);
                }
            });
        }
    }

    searchAvailableCharacters(query) {
        this.renderAvailableCharacters(query);
    }

    saveCollection(event) {
        event.preventDefault();
        
        const name = document.getElementById('form-collection-name').value.trim();
        const description = document.getElementById('form-collection-description').value.trim();
        
        if (!name) {
            alert('Пожалуйста, введите название коллекции');
            return;
        }

        const collectionData = {
            name,
            description,
            characters: Array.from(this.selectedCharactersForCollection),
            type: 'custom'
        };

        if (this.editingCollection) {
            // Update existing collection
            this.allCollections[this.editingCollection] = collectionData;
        } else {
            // Create new collection
            const key = this.generateCollectionKey(name);
            this.allCollections[key] = collectionData;
        }

        this.hideCollectionForm();
        this.renderManageCollections();
        this.renderStudyCollections();
        this.renderQuizCollections();
        
        // Auto-save JSON
        this.autoSaveJSON();
    }

    generateCollectionKey(name) {
        const baseKey = name.toLowerCase()
            .replace(/[^a-zA-Zа-яё0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
        
        let key = baseKey;
        let counter = 1;
        
        while (this.allCollections[key]) {
            key = `${baseKey}_${counter}`;
            counter++;
        }
        
        return key;
    }

    deleteCollection(collectionKey) {
        const collection = this.allCollections[collectionKey];
        if (collection && collection.type === 'custom' && confirm(`Удалить коллекцию "${collection.name}"?`)) {
            delete this.allCollections[collectionKey];
            this.renderManageCollections();
            this.renderStudyCollections();
            this.renderQuizCollections();
            
            // Auto-save JSON
            this.autoSaveJSON();
        }
    }

    renderManageCollections() {
        const container = document.getElementById('collections-manage-list');
        if (!container) return;
        
        container.innerHTML = '';

        // Show custom collections only
        const customCollections = Object.entries(this.allCollections).filter(([key, collection]) => collection.type === 'custom');
        
        customCollections.forEach(([key, collection]) => {
            const item = document.createElement('div');
            item.className = 'collection-manage-item';
            
            item.innerHTML = `
                <div class="collection-manage-header">
                    <div>
                        <div class="collection-manage-title">${collection.name}</div>
                        <div class="collection-manage-count">${collection.characters.length} иероглифов</div>
                    </div>
                    <div class="collection-manage-actions">
                        <button class="btn btn--outline btn--sm edit-collection">Редактировать</button>
                        <button class="btn btn--outline btn--sm delete-collection">Удалить</button>
                    </div>
                </div>
                <div class="collection-manage-body">
                    <div class="collection-manage-description">${collection.description || 'Без описания'}</div>
                    <div class="collection-characters-preview">
                        ${collection.characters.slice(0, 10).map(char => 
                            `<span class="preview-char">${char}</span>`
                        ).join('')}
                        ${collection.characters.length > 10 ? '<span class="preview-char">...</span>' : ''}
                    </div>
                </div>
            `;

            item.querySelector('.edit-collection').addEventListener('click', () => {
                this.showCollectionForm(collection, key);
            });

            item.querySelector('.delete-collection').addEventListener('click', () => {
                this.deleteCollection(key);
            });

            container.appendChild(item);
        });

        if (customCollections.length === 0) {
            container.innerHTML = '<div class="no-content"><p>Нет пользовательских коллекций. Создайте первую коллекцию!</p></div>';
        }
    }

    // Search functionality
    performSearch(query) {
        if (!query.trim()) {
            document.getElementById('search-results').innerHTML = '<div class="no-content"><p>Введите запрос для поиска иероглифов</p></div>';
            return;
        }

        const results = this.allCharacters.filter(char =>
            char.character.includes(query) ||
            char.pinyin.toLowerCase().includes(query.toLowerCase()) ||
            char.palladius.toLowerCase().includes(query.toLowerCase()) ||
            char.meaning.toLowerCase().includes(query.toLowerCase())
        );

        const resultsContainer = document.getElementById('search-results');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="no-content"><p>Ничего не найдено</p></div>';
            return;
        }

        resultsContainer.innerHTML = '<div class="characters-manage-grid"></div>';
        const grid = resultsContainer.querySelector('.characters-manage-grid');

        results.forEach(character => {
            const item = document.createElement('div');
            item.className = 'character-item';
            item.innerHTML = `
                <div class="character-info">
                    <div class="char-display">${character.character}</div>
                    <div class="char-pronunciation">
                        <div class="char-pinyin">${character.pinyin}</div>
                        <div class="char-palladius">${character.palladius}</div>
                    </div>
                    <div class="char-meaning">${character.meaning}</div>
                    <div class="char-examples">${character.examples.slice(0, 2).join('; ')}</div>
                </div>
            `;
            
            // Make search results clickable for editing
            item.addEventListener('click', () => this.showCharacterForm(character));
            item.style.cursor = 'pointer';
            
            grid.appendChild(item);
        });
    }

    clearSearch() {
        document.getElementById('search-input').value = '';
        this.performSearch('');
    }

    // Utility functions
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChineseCharacterApp();
});