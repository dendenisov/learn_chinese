// Application State
class ChineseCharacterApp {
    constructor() {
        this.collections = new Map();
        this.currentView = 'collections';
        this.currentCollection = null;
        this.currentStudyCards = [];
        this.currentStudyIndex = 0;
        this.currentQuizCards = [];
        this.currentQuizIndex = 0;
        this.quizCorrect = 0;
        this.quizWrong = 0;
        this.isCardFlipped = false;
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.editingCard = null;

        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.setupTheme();
        this.showCollections();
    }

    async loadData() {
        try {
            // Load HSK 1 vocabulary data
            const hsk1Response = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/b9363a5102e44fb24cbd45a6f3c0b12b/32e4d036-3681-4d02-9b8a-9bbaa5b50a47/a6113636.json');
            const hsk1Data = await hsk1Response.json();

            // Load Kangxi radicals data
            const kangxiResponse = await fetch('https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/b9363a5102e44fb24cbd45a6f3c0b12b/32e4d036-3681-4d02-9b8a-9bbaa5b50a47/82d4a6ed.json');
            const kangxiData = await kangxiResponse.json();

            this.processHSK1Data(hsk1Data);
            this.processKangxiData(kangxiData);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            // If data loading fails, create default collections with sample data
            this.createDefaultCollections();
        }
    }

    processHSK1Data(data) {
        const hsk1Vocab = data.hsk1_vocabulary;
        let allHSK1Cards = [];

        // Create themed collections
        const collectionNames = {
            numbers: 'Числа',
            pronouns: 'Местоимения',
            family: 'Семья',
            time: 'Время',
            places: 'Места',
            people: 'Люди',
            food_drinks: 'Еда и напитки',
            verbs: 'Глаголы',
            adjectives: 'Прилагательные',
            objects: 'Предметы',
            transport_animals: 'Транспорт и животные',
            common_phrases: 'Фразы',
            particles_adverbs: 'Частицы и наречия',
            measure_words: 'Счётные слова'
        };

        for (const [key, name] of Object.entries(collectionNames)) {
            if (hsk1Vocab[key] && hsk1Vocab[key].length > 0) {
                const cards = hsk1Vocab[key].map(item => ({
                    id: this.generateId(),
                    character: item.character,
                    pinyin: item.pinyin,
                    palladius: item.palladius,
                    translation: item.translation
                }));

                const collectionId = this.generateId();
                this.collections.set(collectionId, {
                    id: collectionId,
                    name: name,
                    description: `HSK 1: ${name}`,
                    cards: cards,
                    type: 'hsk1',
                    isEditable: true
                });

                allHSK1Cards.push(...cards);
            }
        }

        // Create "All HSK 1" collection
        if (allHSK1Cards.length > 0) {
            const allHSK1Id = this.generateId();
            this.collections.set(allHSK1Id, {
                id: allHSK1Id,
                name: 'Все HSK 1',
                description: `Все иероглифы уровня HSK 1 (${allHSK1Cards.length} карточек)`,
                cards: [...allHSK1Cards],
                type: 'hsk1-all',
                isEditable: true
            });
        }
    }

    processKangxiData(data) {
        const kangxiRadicals = data.kangxi_radicals;
        let allRadicals = [];

        // Create stroke-based collections
        const strokeCollections = {
            '1_stroke': '1 черта',
            '2_strokes': '2 черты'
        };

        for (const [key, name] of Object.entries(strokeCollections)) {
            if (kangxiRadicals[key] && kangxiRadicals[key].length > 0) {
                const cards = kangxiRadicals[key].map(item => ({
                    id: this.generateId(),
                    character: item.radical,
                    pinyin: item.pinyin,
                    palladius: item.pinyin, // Use pinyin as palladius for radicals
                    translation: `${item.meaning} (ключ ${item.number})`
                }));

                const collectionId = this.generateId();
                this.collections.set(collectionId, {
                    id: collectionId,
                    name: `Ключи: ${name}`,
                    description: `Ключи Канси с ${name.toLowerCase()}`,
                    cards: cards,
                    type: 'kangxi',
                    isEditable: true
                });

                allRadicals.push(...cards);
            }
        }

        // Create "All Radicals" collection
        if (allRadicals.length > 0) {
            const allRadicalsId = this.generateId();
            this.collections.set(allRadicalsId, {
                id: allRadicalsId,
                name: 'Все ключи Канси',
                description: `Все загруженные ключи Канси (${allRadicals.length} карточек)`,
                cards: [...allRadicals],
                type: 'kangxi-all',
                isEditable: true
            });
        }
    }

    createDefaultCollections() {
        // Create sample HSK 1 collections if data loading fails
        const sampleHSK1 = {
            numbers: [
                {"character": "一", "pinyin": "yī", "palladius": "и", "translation": "один"},
                {"character": "二", "pinyin": "èr", "palladius": "эр", "translation": "два"},
                {"character": "三", "pinyin": "sān", "palladius": "сань", "translation": "три"},
                {"character": "四", "pinyin": "sì", "palladius": "сы", "translation": "четыре"},
                {"character": "五", "pinyin": "wǔ", "palladius": "у", "translation": "пять"},
                {"character": "六", "pinyin": "liù", "palladius": "лю", "translation": "шесть"},
                {"character": "七", "pinyin": "qī", "palladius": "ци", "translation": "семь"},
                {"character": "八", "pinyin": "bā", "palladius": "ба", "translation": "восемь"},
                {"character": "九", "pinyin": "jiǔ", "palladius": "цзю", "translation": "девять"},
                {"character": "十", "pinyin": "shí", "palladius": "ши", "translation": "десять"}
            ],
            pronouns: [
                {"character": "我", "pinyin": "wǒ", "palladius": "во", "translation": "я"},
                {"character": "你", "pinyin": "nǐ", "palladius": "ни", "translation": "ты"},
                {"character": "他", "pinyin": "tā", "palladius": "та", "translation": "он"},
                {"character": "她", "pinyin": "tā", "palladius": "та", "translation": "она"},
                {"character": "这", "pinyin": "zhè", "palladius": "чжэ", "translation": "это/этот"},
                {"character": "那", "pinyin": "nà", "palladius": "на", "translation": "то/тот"}
            ],
            verbs: [
                {"character": "是", "pinyin": "shì", "palladius": "ши", "translation": "быть, являться"},
                {"character": "有", "pinyin": "yǒu", "palladius": "ю", "translation": "иметь"},
                {"character": "看", "pinyin": "kàn", "palladius": "кань", "translation": "смотреть"},
                {"character": "听", "pinyin": "tīng", "palladius": "тин", "translation": "слушать"},
                {"character": "说", "pinyin": "shuō", "palladius": "шо", "translation": "говорить"},
                {"character": "来", "pinyin": "lái", "palladius": "лай", "translation": "приходить"},
                {"character": "去", "pinyin": "qù", "palladius": "цюй", "translation": "идти, уходить"},
                {"character": "吃", "pinyin": "chī", "palladius": "чи", "translation": "есть"},
                {"character": "喝", "pinyin": "hē", "palladius": "хэ", "translation": "пить"}
            ],
            family: [
                {"character": "爸爸", "pinyin": "bàba", "palladius": "баба", "translation": "папа"},
                {"character": "妈妈", "pinyin": "māma", "palladius": "мама", "translation": "мама"},
                {"character": "儿子", "pinyin": "érzi", "palladius": "эрцзы", "translation": "сын"},
                {"character": "女儿", "pinyin": "nǚ'ér", "palladius": "нюйэр", "translation": "дочь"}
            ],
            common_phrases: [
                {"character": "谢谢", "pinyin": "xièxie", "palladius": "сесе", "translation": "спасибо"},
                {"character": "不客气", "pinyin": "búkèqì", "palladius": "букэци", "translation": "пожалуйста"},
                {"character": "对不起", "pinyin": "duìbùqǐ", "palladius": "дуйбуци", "translation": "извините"},
                {"character": "再见", "pinyin": "zàijiàn", "palladius": "цзайцзянь", "translation": "до свидания"}
            ]
        };

        const sampleRadicals = [
            {"radical": "一", "pinyin": "yī", "meaning": "один", "number": 1},
            {"radical": "丨", "pinyin": "gǔn", "meaning": "вертикальная черта", "number": 2},
            {"radical": "丶", "pinyin": "zhǔ", "meaning": "точка", "number": 3},
            {"radical": "人", "pinyin": "rén", "meaning": "человек", "number": 9},
            {"radical": "八", "pinyin": "bā", "meaning": "восемь", "number": 12}
        ];

        this.processHSK1Data({ hsk1_vocabulary: sampleHSK1 });
        this.processKangxiData({ kangxi_radicals: { "1_stroke": sampleRadicals } });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Search
        document.getElementById('searchBtn').addEventListener('click', () => this.openSearchModal());
        document.getElementById('closeSearch').addEventListener('click', () => this.closeSearchModal());
        document.getElementById('searchInput').addEventListener('input', (e) => this.performSearch(e.target.value));

        // Collections
        document.getElementById('addCollectionBtn').addEventListener('click', () => this.openAddCollectionModal());
        document.getElementById('backToCollections').addEventListener('click', () => this.showCollections());

        // Collection modal
        document.getElementById('closeAddCollection').addEventListener('click', () => this.closeAddCollectionModal());
        document.getElementById('cancelCollection').addEventListener('click', () => this.closeAddCollectionModal());
        document.getElementById('saveCollection').addEventListener('click', () => this.saveCollection());

        // Card modal
        document.getElementById('addCardBtn').addEventListener('click', () => this.openAddCardModal());
        document.getElementById('closeCardModal').addEventListener('click', () => this.closeCardModal());
        document.getElementById('cancelCard').addEventListener('click', () => this.closeCardModal());
        document.getElementById('saveCard').addEventListener('click', () => this.saveCard());
        document.getElementById('deleteCard').addEventListener('click', () => this.deleteCard());

        // Study mode
        document.getElementById('studyModeBtn').addEventListener('click', () => this.startStudyMode());
        document.getElementById('exitStudy').addEventListener('click', () => this.showCollection(this.currentCollection));
        document.getElementById('prevCard').addEventListener('click', () => this.navigateStudy(-1));
        document.getElementById('nextCard').addEventListener('click', () => this.navigateStudy(1));
        document.getElementById('studyCard').addEventListener('click', () => this.flipCard());

        // Quiz mode
        document.getElementById('quizModeBtn').addEventListener('click', () => this.startQuizMode());
        document.getElementById('exitQuiz').addEventListener('click', () => this.showCollection(this.currentCollection));
        document.getElementById('retakeQuiz').addEventListener('click', () => this.startQuizMode());
        document.getElementById('backToCollection').addEventListener('click', () => this.showCollection(this.currentCollection));

        // Confirm modal
        document.getElementById('confirmYes').addEventListener('click', () => this.confirmAction());
        document.getElementById('confirmNo').addEventListener('click', () => this.closeConfirmModal());

        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    setupTheme() {
        this.applyTheme();
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
    }

    applyTheme() {
        const themeIcon = document.getElementById('themeIcon');
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
            themeIcon.textContent = '🌙';
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-error);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 1001;
        `;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (document.body.contains(errorDiv)) {
                document.body.removeChild(errorDiv);
            }
        }, 5000);
    }

    // View Management
    showView(viewName) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}View`).classList.add('active');
        this.currentView = viewName;
    }

    showCollections() {
        this.showView('collections');
        this.renderCollections();
    }

    showCollection(collection) {
        this.currentCollection = collection;
        this.showView('collection');
        document.getElementById('collectionTitle').textContent = collection.name;
        this.renderCards();
    }

    renderCollections() {
        const grid = document.getElementById('collectionsGrid');
        grid.innerHTML = '';

        if (this.collections.size === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <h3>Нет коллекций</h3>
                    <p>Создайте свою первую коллекцию иероглифов</p>
                </div>
            `;
            return;
        }

        // Convert Map to Array for sorting
        const collectionsArray = Array.from(this.collections.values());
        
        // Sort collections: HSK first, then Kangxi, then custom
        collectionsArray.sort((a, b) => {
            const typeOrder = { 'hsk1-all': 0, 'hsk1': 1, 'kangxi-all': 2, 'kangxi': 3, 'custom': 4 };
            const aOrder = typeOrder[a.type] || 5;
            const bOrder = typeOrder[b.type] || 5;
            
            if (aOrder !== bOrder) {
                return aOrder - bOrder;
            }
            return a.name.localeCompare(b.name);
        });

        collectionsArray.forEach(collection => {
            const card = document.createElement('div');
            card.className = 'collection-card fade-in';
            card.innerHTML = `
                <div class="collection-header">
                    <h3 class="collection-title">${collection.name}</h3>
                    <span class="collection-count">${collection.cards.length}</span>
                </div>
                <p class="collection-description">${collection.description}</p>
                <div class="collection-actions-menu">
                    <button class="collection-menu-btn" onclick="event.stopPropagation(); app.editCollection('${collection.id}')">✏️</button>
                    <button class="collection-menu-btn" onclick="event.stopPropagation(); app.confirmDeleteCollection('${collection.id}')">🗑️</button>
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.collection-actions-menu')) {
                    this.showCollection(collection);
                }
            });
            
            grid.appendChild(card);
        });
    }

    renderCards() {
        const grid = document.getElementById('cardsGrid');
        grid.innerHTML = '';

        if (!this.currentCollection || this.currentCollection.cards.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🀄</div>
                    <h3>Нет карточек</h3>
                    <p>Добавьте карточки в эту коллекцию</p>
                </div>
            `;
            return;
        }

        this.currentCollection.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'character-card fade-in';
            cardElement.innerHTML = `
                <div class="card-actions">
                    <button class="card-action-btn" onclick="event.stopPropagation(); app.editCard('${card.id}')">✏️</button>
                    <button class="card-action-btn" onclick="event.stopPropagation(); app.confirmDeleteCard('${card.id}')">🗑️</button>
                </div>
                <div class="card-character">${card.character}</div>
                <div class="card-pinyin">${card.pinyin}</div>
                <div class="card-translation">${card.translation}</div>
            `;
            
            grid.appendChild(cardElement);
        });
    }

    // Study Mode
    startStudyMode() {
        if (!this.currentCollection || this.currentCollection.cards.length === 0) {
            this.showError('Нет карточек для изучения');
            return;
        }

        this.currentStudyCards = [...this.currentCollection.cards];
        this.currentStudyIndex = 0;
        this.isCardFlipped = false;
        this.showView('study');
        this.updateStudyCard();
    }

    updateStudyCard() {
        if (this.currentStudyIndex >= this.currentStudyCards.length) return;

        const card = this.currentStudyCards[this.currentStudyIndex];
        const studyCard = document.getElementById('studyCard');
        
        // Reset flip state
        studyCard.classList.remove('flipped');
        this.isCardFlipped = false;

        // Update front
        document.getElementById('studyCharacter').textContent = card.character;
        document.getElementById('studyPinyin').textContent = card.pinyin;

        // Update back
        document.getElementById('studyCharacterBack').textContent = card.character;
        document.getElementById('studyPinyinBack').textContent = card.pinyin;
        document.getElementById('studyPalladius').textContent = card.palladius;
        document.getElementById('studyTranslation').textContent = card.translation;

        // Update progress
        document.getElementById('studyCounter').textContent = 
            `${this.currentStudyIndex + 1} / ${this.currentStudyCards.length}`;
        
        const progress = ((this.currentStudyIndex + 1) / this.currentStudyCards.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        // Update navigation buttons
        document.getElementById('prevCard').disabled = this.currentStudyIndex === 0;
        document.getElementById('nextCard').disabled = this.currentStudyIndex === this.currentStudyCards.length - 1;
    }

    flipCard() {
        const studyCard = document.getElementById('studyCard');
        studyCard.classList.toggle('flipped');
        this.isCardFlipped = !this.isCardFlipped;
    }

    navigateStudy(direction) {
        const newIndex = this.currentStudyIndex + direction;
        if (newIndex >= 0 && newIndex < this.currentStudyCards.length) {
            this.currentStudyIndex = newIndex;
            this.updateStudyCard();
        }
    }

    // Quiz Mode
    startQuizMode() {
        if (!this.currentCollection || this.currentCollection.cards.length < 4) {
            this.showError('Нужно минимум 4 карточки для теста');
            return;
        }

        this.currentQuizCards = this.shuffleArray([...this.currentCollection.cards]);
        this.currentQuizIndex = 0;
        this.quizCorrect = 0;
        this.quizWrong = 0;
        this.showView('quiz');
        this.updateQuizQuestion();
    }

    updateQuizQuestion() {
        if (this.currentQuizIndex >= this.currentQuizCards.length) {
            this.showQuizResults();
            return;
        }

        const currentCard = this.currentQuizCards[this.currentQuizIndex];
        document.getElementById('quizCharacter').textContent = currentCard.character;
        document.getElementById('quizCounter').textContent = 
            `Вопрос ${this.currentQuizIndex + 1} / ${this.currentQuizCards.length}`;

        // Generate options
        const options = this.generateQuizOptions(currentCard);
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';

        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option.translation;
            button.addEventListener('click', () => this.selectQuizOption(option, currentCard, button));
            optionsContainer.appendChild(button);
        });

        this.updateQuizScore();
    }

    generateQuizOptions(correctCard) {
        const options = [correctCard];
        const allCards = Array.from(this.collections.values()).flatMap(col => col.cards);
        const otherCards = allCards.filter(card => 
            card.character !== correctCard.character && card.translation !== correctCard.translation
        );
        
        // Add 3 random incorrect options
        const shuffledOthers = this.shuffleArray(otherCards);
        for (let i = 0; i < 3 && i < shuffledOthers.length; i++) {
            options.push(shuffledOthers[i]);
        }

        return this.shuffleArray(options);
    }

    selectQuizOption(selectedOption, correctCard, buttonElement) {
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(btn => {
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
        });

        // Show correct/incorrect
        const isCorrect = selectedOption.character === correctCard.character;
        
        if (isCorrect) {
            buttonElement.classList.add('correct');
            this.quizCorrect++;
        } else {
            buttonElement.classList.add('incorrect');
            this.quizWrong++;
            
            // Highlight correct answer
            document.querySelectorAll('.quiz-option').forEach(btn => {
                if (btn.textContent === correctCard.translation) {
                    btn.classList.add('correct');
                }
            });
        }

        this.updateQuizScore();

        // Move to next question after delay
        setTimeout(() => {
            this.currentQuizIndex++;
            this.updateQuizQuestion();
        }, 1500);
    }

    updateQuizScore() {
        document.getElementById('correctAnswers').textContent = this.quizCorrect;
        document.getElementById('wrongAnswers').textContent = this.quizWrong;
    }

    showQuizResults() {
        this.showView('quizResults');
        document.getElementById('finalCorrect').textContent = this.quizCorrect;
        document.getElementById('finalWrong').textContent = this.quizWrong;
        
        const total = this.quizCorrect + this.quizWrong;
        const accuracy = total > 0 ? Math.round((this.quizCorrect / total) * 100) : 0;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
    }

    // Search functionality
    openSearchModal() {
        document.getElementById('searchModal').classList.remove('hidden');
        document.getElementById('searchInput').focus();
    }

    closeSearchModal() {
        document.getElementById('searchModal').classList.add('hidden');
        document.getElementById('searchInput').value = '';
        document.getElementById('searchResults').innerHTML = '';
    }

    performSearch(query) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (query.length < 1) {
            resultsContainer.innerHTML = '';
            return;
        }

        const allCards = [];
        this.collections.forEach(collection => {
            collection.cards.forEach(card => {
                allCards.push({ ...card, collectionName: collection.name, collectionId: collection.id });
            });
        });

        const results = allCards.filter(card => 
            card.character.includes(query) ||
            card.pinyin.toLowerCase().includes(query.toLowerCase()) ||
            card.palladius.toLowerCase().includes(query.toLowerCase()) ||
            card.translation.toLowerCase().includes(query.toLowerCase())
        );

        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить поисковый запрос</p>
                </div>
            `;
            return;
        }

        results.forEach(card => {
            const result = document.createElement('div');
            result.className = 'search-result';
            result.innerHTML = `
                <div class="search-result-character">${card.character}</div>
                <div class="search-result-info">
                    <div class="search-result-pinyin">${card.pinyin}</div>
                    <div class="search-result-translation">${card.translation}</div>
                    <div class="search-result-collection">${card.collectionName}</div>
                </div>
            `;
            
            result.addEventListener('click', () => {
                this.closeSearchModal();
                const collection = this.collections.get(card.collectionId);
                if (collection) {
                    this.showCollection(collection);
                }
            });
            
            resultsContainer.appendChild(result);
        });
    }

    // Collection Management
    openAddCollectionModal() {
        document.getElementById('addCollectionModal').classList.remove('hidden');
        document.getElementById('collectionName').focus();
    }

    closeAddCollectionModal() {
        document.getElementById('addCollectionModal').classList.add('hidden');
        document.getElementById('collectionName').value = '';
        document.getElementById('collectionDescription').value = '';
    }

    saveCollection() {
        const name = document.getElementById('collectionName').value.trim();
        if (!name) {
            this.showError('Введите название коллекции');
            return;
        }

        const description = document.getElementById('collectionDescription').value.trim();
        const id = this.generateId();
        
        const collection = {
            id,
            name,
            description: description || `Пользовательская коллекция`,
            cards: [],
            type: 'custom',
            isEditable: true
        };

        this.collections.set(id, collection);
        this.closeAddCollectionModal();
        this.renderCollections();
    }

    editCollection(collectionId) {
        // Find collection by iterating through values
        let collection = null;
        for (let col of this.collections.values()) {
            if (col.id === collectionId) {
                collection = col;
                break;
            }
        }
        
        if (!collection) return;

        const newName = prompt('Новое название коллекции:', collection.name);
        if (newName && newName.trim()) {
            collection.name = newName.trim();
            this.renderCollections();
            if (this.currentCollection && this.currentCollection.id === collectionId) {
                document.getElementById('collectionTitle').textContent = collection.name;
            }
        }
    }

    confirmDeleteCollection(collectionId) {
        // Find collection by iterating through values
        let collection = null;
        for (let col of this.collections.values()) {
            if (col.id === collectionId) {
                collection = col;
                break;
            }
        }
        
        if (!collection) return;

        this.showConfirmModal(
            `Удалить коллекцию "${collection.name}"?`,
            () => this.deleteCollection(collectionId)
        );
    }

    deleteCollection(collectionId) {
        // Find and delete collection
        for (let [key, collection] of this.collections.entries()) {
            if (collection.id === collectionId) {
                this.collections.delete(key);
                break;
            }
        }
        
        this.closeConfirmModal();
        this.renderCollections();
        if (this.currentCollection && this.currentCollection.id === collectionId) {
            this.showCollections();
        }
    }

    // Card Management
    openAddCardModal() {
        this.editingCard = null;
        document.getElementById('cardModalTitle').textContent = 'Новая карточка';
        document.getElementById('cardCharacter').value = '';
        document.getElementById('cardPinyin').value = '';
        document.getElementById('cardPalladius').value = '';
        document.getElementById('cardTranslation').value = '';
        document.getElementById('deleteCard').style.display = 'none';
        document.getElementById('cardModal').classList.remove('hidden');
        document.getElementById('cardCharacter').focus();
    }

    editCard(cardId) {
        const card = this.currentCollection.cards.find(c => c.id === cardId);
        if (!card) return;

        this.editingCard = card;
        document.getElementById('cardModalTitle').textContent = 'Редактировать карточку';
        document.getElementById('cardCharacter').value = card.character;
        document.getElementById('cardPinyin').value = card.pinyin;
        document.getElementById('cardPalladius').value = card.palladius;
        document.getElementById('cardTranslation').value = card.translation;
        document.getElementById('deleteCard').style.display = 'block';
        document.getElementById('cardModal').classList.remove('hidden');
        document.getElementById('cardCharacter').focus();
    }

    closeCardModal() {
        document.getElementById('cardModal').classList.add('hidden');
        this.editingCard = null;
    }

    saveCard() {
        const character = document.getElementById('cardCharacter').value.trim();
        const pinyin = document.getElementById('cardPinyin').value.trim();
        const palladius = document.getElementById('cardPalladius').value.trim();
        const translation = document.getElementById('cardTranslation').value.trim();

        if (!character || !pinyin || !palladius || !translation) {
            this.showError('Заполните все поля');
            return;
        }

        if (this.editingCard) {
            // Edit existing card
            this.editingCard.character = character;
            this.editingCard.pinyin = pinyin;
            this.editingCard.palladius = palladius;
            this.editingCard.translation = translation;
        } else {
            // Add new card
            const newCard = {
                id: this.generateId(),
                character,
                pinyin,
                palladius,
                translation
            };
            this.currentCollection.cards.push(newCard);
        }

        this.closeCardModal();
        this.renderCards();
    }

    confirmDeleteCard(cardId) {
        this.showConfirmModal(
            'Удалить эту карточку?',
            () => this.removeCard(cardId)
        );
    }

    deleteCard() {
        if (this.editingCard) {
            this.showConfirmModal(
                'Удалить эту карточку?',
                () => {
                    this.removeCard(this.editingCard.id);
                    this.closeCardModal();
                }
            );
        }
    }

    removeCard(cardId) {
        const index = this.currentCollection.cards.findIndex(c => c.id === cardId);
        if (index !== -1) {
            this.currentCollection.cards.splice(index, 1);
            this.closeConfirmModal();
            this.renderCards();
        }
    }

    // Modal Management
    showConfirmModal(message, onConfirm) {
        document.getElementById('confirmMessage').textContent = message;
        document.getElementById('confirmModal').classList.remove('hidden');
        this.confirmCallback = onConfirm;
    }

    closeConfirmModal() {
        document.getElementById('confirmModal').classList.add('hidden');
        this.confirmCallback = null;
    }

    confirmAction() {
        if (this.confirmCallback) {
            this.confirmCallback();
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Keyboard Navigation
    handleKeyDown(e) {
        if (this.currentView === 'study') {
            switch (e.key) {
                case 'ArrowLeft':
                    this.navigateStudy(-1);
                    break;
                case 'ArrowRight':
                    this.navigateStudy(1);
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.flipCard();
                    break;
                case 'Escape':
                    this.showCollection(this.currentCollection);
                    break;
            }
        } else if (this.currentView === 'quiz' && e.key >= '1' && e.key <= '4') {
            const options = document.querySelectorAll('.quiz-option');
            const index = parseInt(e.key) - 1;
            if (options[index] && !options[index].disabled) {
                options[index].click();
            }
        }
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
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ChineseCharacterApp();
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (app && app.currentView === 'study') {
        handleSwipe();
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next card
            app.navigateStudy(1);
        } else {
            // Swipe right - previous card
            app.navigateStudy(-1);
        }
    }
}