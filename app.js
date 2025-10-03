// Chinese Character Learning App - JavaScript

class ChineseCharacterApp {
    constructor() {
        this.currentTheme = 'light';
        this.currentSection = 'study';
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
            mode: 'meaning'
        };
        
        // Initialize data
        this.initializeData();
        this.initializeEventListeners();
        this.initializeCollections();
        this.initializeTheme();
    }

    initializeData() {
        // HSK 1 characters data
        this.hsk1Characters = [
            {"character": "一", "pinyin": "yī", "palladius": "и", "meaning": "один", "examples": ["一个人 (один человек)", "一天 (один день)"]},
            {"character": "二", "pinyin": "èr", "palladius": "эр", "meaning": "два", "examples": ["二月 (февраль)", "二十 (двадцать)"]},
            {"character": "三", "pinyin": "sān", "palladius": "сань", "meaning": "три", "examples": ["三天 (три дня)", "三个月 (три месяца)"]},
            {"character": "四", "pinyin": "sì", "palladius": "сы", "meaning": "четыре", "examples": ["四月 (апрель)", "四十 (сорок)"]},
            {"character": "五", "pinyin": "wǔ", "palladius": "у", "meaning": "пять", "examples": ["五月 (май)", "五十 (пятьдесят)"]},
            {"character": "六", "pinyin": "liù", "palladius": "лю", "meaning": "шесть", "examples": ["六月 (июнь)", "六十 (шестьдесят)"]},
            {"character": "七", "pinyin": "qī", "palladius": "ци", "meaning": "семь", "examples": ["七月 (июль)", "семьдесят (семьдесят)"]},
            {"character": "八", "pinyin": "bā", "palladius": "ба", "meaning": "восемь", "examples": ["八月 (август)", "восемьдесят (восемьдесят)"]},
            {"character": "九", "pinyin": "jiǔ", "palladius": "цзю", "meaning": "девять", "examples": ["九月 (сентябрь)", "девяносто (девяносто)"]},
            {"character": "十", "pinyin": "shí", "palladius": "ши", "meaning": "десять", "examples": ["十月 (октябрь)", "десять штук (десять штук)"]},
            {"character": "人", "pinyin": "rén", "palladius": "жэнь", "meaning": "человек, люди", "examples": ["中国人 (китаец)", "好人 (хороший человек)"]},
            {"character": "我", "pinyin": "wǒ", "palladius": "во", "meaning": "я", "examples": ["我是 (я есть)", "我的 (мой)"]},
            {"character": "你", "pinyin": "nǐ", "palladius": "ни", "meaning": "ты, вы", "examples": ["你好 (привет)", "你的 (твой)"]},
            {"character": "他", "pinyin": "tā", "palladius": "та", "meaning": "он", "examples": ["他是 (он есть)", "他的 (его)"]},
            {"character": "她", "pinyin": "tā", "palladius": "та", "meaning": "она", "examples": ["她好 (у неё всё хорошо)", "她的 (её)"]},
            {"character": "的", "pinyin": "de", "palladius": "дэ", "meaning": "притяжательная частица", "examples": ["我的书 (моя книга)", "他的朋友 (его друг)"]},
            {"character": "是", "pinyin": "shì", "palladius": "ши", "meaning": "быть, являться", "examples": ["我是学生 (я студент)", "这是书 (это книга)"]},
            {"character": "不", "pinyin": "bù", "palladius": "бу", "meaning": "не, нет", "examples": ["不好 (плохо)", "не является (не является)"]},
            {"character": "了", "pinyin": "le", "palladius": "лэ", "meaning": "частица завершённого действия", "examples": ["吃了 (съел)", "看了 (посмотрел)"]},
            {"character": "在", "pinyin": "zài", "palladius": "цзай", "meaning": "находиться в/на", "examples": ["在家 (дома)", "在北京 (в Пекине)"]},
            {"character": "有", "pinyin": "yǒu", "palladius": "ю", "meaning": "иметь, есть", "examples": ["我有书 (у меня есть книга)", "有时间 (есть время)"]},
            {"character": "这", "pinyin": "zhè", "palladius": "чжэ", "meaning": "это, этот", "examples": ["这是 (это есть)", "этот человек (этот человек)"]},
            {"character": "那", "pinyin": "nà", "palladius": "на", "meaning": "то, тот", "examples": ["那个 (тот)", "那里 (там)"]},
            {"character": "什", "pinyin": "shén", "palladius": "шэнь", "meaning": "что", "examples": ["什么 (что)", "что когда (когда)"]},
            {"character": "么", "pinyin": "me", "palladius": "мэ", "meaning": "вопросительная частица", "examples": ["什么 (что)", "怎么 (как)"]},
            {"character": "会", "pinyin": "huì", "palladius": "хуэй", "meaning": "уметь, мочь", "examples": ["会说 (уметь говорить)", "会来 (сможет прийти)"]},
            {"character": "说", "pinyin": "shuō", "palladius": "шо", "meaning": "говорить, сказать", "examples": ["说话 (говорить)", "говорить по-китайски (говорить по-китайски)"]},
            {"character": "来", "pinyin": "lái", "palladius": "лай", "meaning": "приходить, приезжать", "examples": ["来了 (пришёл)", "来北京 (приехать в Пекин)"]},
            {"character": "去", "pinyin": "qù", "palladius": "цюй", "meaning": "идти, ехать", "examples": ["去北京 (ехать в Пекин)", "去学校 (идти в школу)"]},
            {"character": "大", "pinyin": "dà", "palladius": "да", "meaning": "большой", "examples": ["大学 (университет)", "大人 (взрослый)"]},
            {"character": "小", "pinyin": "xiǎo", "palladius": "сяо", "meaning": "маленький", "examples": ["小孩 (ребёнок)", "小学 (начальная школа)"]},
            {"character": "好", "pinyin": "hǎo", "palladius": "хао", "meaning": "хорошо, хороший", "examples": ["很好 (очень хорошо)", "好人 (хороший человек)"]},
            {"character": "多", "pinyin": "duō", "palladius": "до", "meaning": "много", "examples": ["很多 (очень много)", "多少 (сколько)"]},
            {"character": "少", "pinyin": "shǎo", "palladius": "шао", "meaning": "мало", "examples": ["很少 (очень мало)", "少数 (меньшинство)"]},
            {"character": "看", "pinyin": "kàn", "palladius": "кань", "meaning": "смотреть, видеть", "examples": ["看书 (читать книгу)", "看电影 (смотреть фильм)"]},
            {"character": "听", "pinyin": "tīng", "palladius": "тин", "meaning": "слушать", "examples": ["听音乐 (слушать музыку)", "听不懂 (не понимаю на слух)"]},
            {"character": "吃", "pinyin": "chī", "palladius": "чи", "meaning": "есть (пищу)", "examples": ["吃饭 (есть еду)", "吃苹果 (есть яблоко)"]},
            {"character": "喝", "pinyin": "hē", "palladius": "хэ", "meaning": "пить", "examples": ["喝水 (пить воду)", "喝茶 (пить чай)"]},
            {"character": "买", "pinyin": "mǎi", "palladius": "май", "meaning": "покупать", "examples": ["买书 (покупать книгу)", "买东西 (делать покупки)"]},
            {"character": "卖", "pinyin": "mài", "palladius": "май", "meaning": "продавать", "examples": ["卖书 (продавать книги)", "卖东西 (продавать вещи)"]},
            {"character": "做", "pinyin": "zuò", "palladius": "цзо", "meaning": "делать", "examples": ["做事 (делать дела)", "做饭 (готовить еду)"]},
            {"character": "坐", "pinyin": "zuò", "palladius": "цзо", "meaning": "сидеть", "examples": ["坐下 (садиться)", "坐车 (ехать на транспорте)"]},
            {"character": "走", "pinyin": "zǒu", "palladius": "цзоу", "meaning": "идти пешком", "examples": ["走路 (идти пешком)", "走了 (ушёл)"]},
            {"character": "跑", "pinyin": "pǎo", "palladius": "пао", "meaning": "бегать, бежать", "examples": ["跑步 (бегать)", "快跑 (быстро бежать)"]},
            {"character": "飞", "pinyin": "fēi", "palladius": "фэй", "meaning": "летать", "examples": ["飞机 (самолёт)", "飞鸟 (летящая птица)"]},
            {"character": "学", "pinyin": "xué", "palladius": "сюэ", "meaning": "учиться, изучать", "examples": ["学中文 (изучать китайский)", "学生 (студент)"]},
            {"character": "工", "pinyin": "gōng", "palladius": "гун", "meaning": "работа, труд", "examples": ["工作 (работа)", "工人 (рабочий)"]},
            {"character": "作", "pinyin": "zuò", "palladius": "цзо", "meaning": "делать, работать", "examples": ["工作 (работа)", "作业 (домашнее задание)"]},
            {"character": "家", "pinyin": "jiā", "palladius": "цзя", "meaning": "дом, семья", "examples": ["回家 (возвращаться домой)", "家人 (члены семьи)"]},
            {"character": "国", "pinyin": "guó", "palladius": "го", "meaning": "страна", "examples": ["中国 (Китай)", "外国 (зарубежная страна)"]},
            {"character": "中", "pinyin": "zhōng", "palladius": "чжун", "meaning": "средний, центр", "examples": ["中国 (Китай)", "中午 (полдень)"]},
            {"character": "文", "pinyin": "wén", "palladius": "вэнь", "meaning": "литература, письменность", "examples": ["中文 (китайский язык)", "文化 (культура)"]},
            {"character": "字", "pinyin": "zì", "palladius": "цзы", "meaning": "иероглиф, слово", "examples": ["汉字 (китайские иероглифы)", "名字 (имя)"]},
            {"character": "书", "pinyin": "shū", "palladius": "шу", "meaning": "книга", "examples": ["看书 (читать книгу)", "中文书 (китайская книга)"]},
            {"character": "读", "pinyin": "dú", "palladius": "ду", "meaning": "читать", "examples": ["读书 (читать книгу)", "читать по-китайски (читать по-китайски)"]},
            {"character": "写", "pinyin": "xiě", "palladius": "се", "meaning": "писать", "examples": ["写字 (писать иероглифы)", "写信 (писать письмо)"]},
            {"character": "叫", "pinyin": "jiào", "palladius": "цзяо", "meaning": "звать, называться", "examples": ["我叫... (меня зовут...)", "叫什么 (как зовут)"]},
            {"character": "名", "pinyin": "míng", "palladius": "мин", "meaning": "имя", "examples": ["名字 (имя)", "姓名 (фамилия и имя)"]},
            {"character": "天", "pinyin": "tiān", "palladius": "тянь", "meaning": "небо, день", "examples": ["今天 (сегодня)", "天气 (погода)"]},
            {"character": "今", "pinyin": "jīn", "palladius": "цзинь", "meaning": "сегодня, сейчас", "examples": ["今天 (сегодня)", "今年 (в этом году)"]},
            {"character": "明", "pinyin": "míng", "palladius": "мин", "meaning": "светлый, завтра", "examples": ["明天 (завтра)", "明白 (понимать)"]},
            {"character": "昨", "pinyin": "zuó", "palladius": "цзо", "meaning": "вчера", "examples": ["昨天 (вчера)", "昨晚 (вчера вечером)"]},
            {"character": "年", "pinyin": "nián", "palladius": "нянь", "meaning": "год", "examples": ["今年 (в этом году)", "去年 (в прошлом году)"]},
            {"character": "月", "pinyin": "yuè", "palladius": "юэ", "meaning": "месяц, луна", "examples": ["一月 (январь)", "月亮 (луна)"]},
            {"character": "日", "pinyin": "rì", "palladius": "жи", "meaning": "день, солнце", "examples": ["今日 (сегодня)", "日本 (Япония)"]},
            {"character": "上", "pinyin": "shàng", "palladius": "шан", "meaning": "верх, на", "examples": ["上午 (утром)", "上学 (идти в школу)"]},
            {"character": "下", "pinyin": "xià", "palladius": "ся", "meaning": "низ, вниз", "examples": ["下午 (днём)", "下雨 (дождь идёт)"]},
            {"character": "午", "pinyin": "wǔ", "palladius": "у", "meaning": "полдень", "examples": ["中午 (полдень)", "下午 (после полудня)"]},
            {"character": "前", "pinyin": "qián", "palladius": "цянь", "meaning": "перед, раньше", "examples": ["以前 (раньше)", "前面 (впереди)"]},
            {"character": "后", "pinyin": "hòu", "palladius": "хоу", "meaning": "после, сзади", "examples": ["以后 (потом)", "后面 (сзади)"]},
            {"character": "早", "pinyin": "zǎo", "palladius": "цзао", "meaning": "рано, утро", "examples": ["早上 (утром)", "早饭 (завтрак)"]},
            {"character": "晚", "pinyin": "wǎn", "palladius": "вань", "meaning": "поздно, вечер", "examples": ["晚上 (вечером)", "晚饭 (ужин)"]},
            {"character": "时", "pinyin": "shí", "palladius": "ши", "meaning": "время", "examples": ["时间 (время)", "什么时候 (когда)"]},
            {"character": "间", "pinyin": "jiān", "palladius": "цзянь", "meaning": "между, промежуток", "examples": ["时间 (время)", "房间 (комната)"]},
            {"character": "分", "pinyin": "fēn", "palladius": "фэнь", "meaning": "минута, делить", "examples": ["十分 (десять минут)", "分钟 (минута)"]},
            {"character": "点", "pinyin": "diǎn", "palladius": "дянь", "meaning": "точка, час", "examples": ["三点 (три часа)", "一点 (немного)"]},
            {"character": "钟", "pinyin": "zhōng", "palladius": "чжун", "meaning": "часы, колокол", "examples": ["分钟 (минута)", "钟表 (часы)"]},
            {"character": "现", "pinyin": "xiàn", "palladius": "сянь", "meaning": "сейчас, появляться", "examples": ["现在 (сейчас)", "现在 (в настоящее время)"]},
            {"character": "先", "pinyin": "xiān", "palladius": "сянь", "meaning": "сначала, раньше", "examples": ["先生 (господин)", "先走 (уйти первым)"]},
            {"character": "生", "pinyin": "shēng", "palladius": "шэн", "meaning": "рождаться, жизнь", "examples": ["学生 (студент)", "先生 (господин)"]},
            {"character": "老", "pinyin": "lǎo", "palladius": "лао", "meaning": "старый", "examples": ["老师 (учитель)", "老人 (пожилой человек)"]},
            {"character": "师", "pinyin": "shī", "palladius": "ши", "meaning": "учитель", "examples": ["老师 (учитель)", "师父 (мастер)"]},
            {"character": "同", "pinyin": "tóng", "palladius": "тун", "meaning": "одинаковый, вместе", "examples": ["同学 (одноклассник)", "不同 (разный)"]},
            {"character": "朋", "pinyin": "péng", "palladius": "пэн", "meaning": "друг", "examples": ["朋友 (друг)", "好朋友 (хороший друг)"]},
            {"character": "友", "pinyin": "yǒu", "palladius": "ю", "meaning": "друг", "examples": ["朋友 (друг)", "友好 (дружелюбный)"]},
            {"character": "男", "pinyin": "nán", "palladius": "нань", "meaning": "мужской, мужчина", "examples": ["男人 (мужчина)", "男孩 (мальчик)"]},
            {"character": "女", "pinyin": "nǚ", "palladius": "нюй", "meaning": "женский, женщина", "examples": ["женщина (женщина)", "女孩 (девочка)"]},
            {"character": "儿", "pinyin": "ér", "palladius": "эр", "meaning": "ребёнок, сын", "examples": ["儿子 (сын)", "小儿 (маленький ребёнок)"]},
            {"character": "子", "pinyin": "zi", "palladius": "цзы", "meaning": "ребёнок, сын", "examples": ["儿子 (сын)", "孩子 (ребёнок)"]},
            {"character": "孩", "pinyin": "hái", "palladius": "хай", "meaning": "ребёнок", "examples": ["孩子 (ребёнок)", "小孩 (маленький ребёнок)"]},
            {"character": "爸", "pinyin": "bà", "palladius": "ба", "meaning": "папа", "examples": ["爸爸 (папа)", "爸妈 (родители)"]},
            {"character": "妈", "pinyin": "mā", "palladius": "ма", "meaning": "мама", "examples": ["妈妈 (мама)", "爸妈 (родители)"]},
            {"character": "和", "pinyin": "hé", "palladius": "хэ", "meaning": "и, с", "examples": ["我和你 (я и ты)", "和平 (мир)"]},
            {"character": "很", "pinyin": "hěn", "palladius": "хэнь", "meaning": "очень", "examples": ["很好 (очень хорошо)", "很多 (очень много)"]},
            {"character": "都", "pinyin": "dōu", "palladius": "доу", "meaning": "все, всё", "examples": ["都好 (всё хорошо)", "我们都 (мы все)"]},
            {"character": "也", "pinyin": "yě", "palladius": "е", "meaning": "тоже, также", "examples": ["我也去 (я тоже иду)", "也好 (тоже хорошо)"]},
            {"character": "还", "pinyin": "hái", "palladius": "хай", "meaning": "ещё, всё ещё", "examples": ["还有 (ещё есть)", "还好 (ещё ничего)"]},
            {"character": "没", "pinyin": "méi", "palladius": "мэй", "meaning": "не иметь, нет", "examples": ["没有 (не имеется)", "没关系 (ничего страшного)"]},
            {"character": "关", "pinyin": "guān", "palladius": "гуань", "meaning": "закрывать, касаться", "examples": ["没关系 (ничего страшного)", "关门 (закрыть дверь)"]},
            {"character": "系", "pinyin": "xì", "palladius": "си", "meaning": "система, связь", "examples": ["没关系 (ничего страшного)", "关系 (отношения)"]},
            {"character": "对", "pinyin": "duì", "palladius": "дуй", "meaning": "правильно, пара", "examples": ["对了 (правильно)", "对不起 (извините)"]},
            {"character": "起", "pinyin": "qǐ", "palladius": "ци", "meaning": "подниматься, начинать", "examples": ["对не起 (извините)", "起床 (вставать с кровати)"]},
            {"character": "请", "pinyin": "qǐng", "palladius": "цин", "meaning": "пожалуйста, просить", "examples": ["请问 (извините, можно спросить)", "请坐 (присаживайтесь)"]},
            {"character": "问", "pinyin": "wèn", "palladius": "вэнь", "meaning": "спрашивать", "examples": ["请问 (извините, можно спросить)", "问题 (вопрос)"]},
            {"character": "谢", "pinyin": "xiè", "palladius": "се", "meaning": "благодарить", "examples": ["谢谢 (спасибо)", "感谢 (благодарить)"]},
            {"character": "客", "pinyin": "kè", "palladius": "кэ", "meaning": "гость", "examples": ["не客气 (не за что)", "客人 (гость)"]},
            {"character": "气", "pinyin": "qì", "palladius": "ци", "meaning": "воздух, характер", "examples": ["не客气 (не за что)", "天气 (погода)"]},
            {"character": "再", "pinyin": "zài", "palladius": "цзай", "meaning": "снова, ещё раз", "examples": ["再见 (до свидания)", "再来 (прийти снова)"]},
            {"character": "见", "pinyin": "jiàn", "palladius": "цзянь", "meaning": "видеть, встречать", "examples": ["再见 (до свидания)", "看见 (увидеть)"]},
            {"character": "住", "pinyin": "zhù", "palladius": "чжу", "meaning": "жить, проживать", "examples": ["住在北京 (жить в Пекине)", "住址 (адрес)"]},
            {"character": "哪", "pinyin": "nǎ", "palladius": "на", "meaning": "какой, который", "examples": ["哪个 (какой)", "哪里 (где)"]},
            {"character": "里", "pinyin": "lǐ", "palladius": "ли", "meaning": "внутри, мера расстояния", "examples": ["哪里 (где)", "家里 (дома)"]},
            {"character": "几", "pinyin": "jǐ", "palladius": "цзи", "meaning": "несколько, сколько", "examples": ["几个 (несколько)", "几点 (сколько времени)"]},
            {"character": "个", "pinyin": "gè", "palladius": "гэ", "meaning": "счётное слово", "examples": ["один人 (один человек)", "几个 (несколько)"]},
            {"character": "钱", "pinyin": "qián", "palladius": "цянь", "meaning": "деньги", "examples": ["много少钱 (сколько стоит)", "有钱 (богатый)"]},
            {"character": "块", "pinyin": "kuài", "palladius": "куай", "meaning": "юань (денежная единица)", "examples": ["五块钱 (пять юаней)", "один块 (один юань)"]},
            {"character": "毛", "pinyin": "máo", "palladius": "мао", "meaning": "цзяо (10 центов)", "examples": ["五毛 (пять цзяо)", "毛钱 (мелочь)"]},
            {"character": "水", "pinyin": "shuǐ", "palladius": "шуй", "meaning": "вода", "examples": ["喝水 (пить воду)", "开水 (кипяток)"]},
            {"character": "茶", "pinyin": "chá", "palladius": "ча", "meaning": "чай", "examples": ["喝茶 (пить чай)", "茶叶 (чайные листья)"]},
            {"character": "咖", "pinyin": "kā", "palladius": "ка", "meaning": "кофе (первый слог)", "examples": ["咖啡 (кофе)"]},
            {"character": "啡", "pinyin": "fēi", "palladius": "фэй", "meaning": "кофе (второй слог)", "examples": ["咖啡 (кофе)"]},
            {"character": "杯", "pinyin": "bēi", "palladius": "бэй", "meaning": "стакан, чашка", "examples": ["一杯水 (стакан воды)", "茶杯 (чашка для чая)"]},
            {"character": "饭", "pinyin": "fàn", "palladius": "фань", "meaning": "еда, рис", "examples": ["吃饭 (есть)", "米饭 (варёный рис)"]},
            {"character": "菜", "pinyin": "cài", "palladius": "цай", "meaning": "овощи, блюдо", "examples": ["吃菜 (есть овощи)", "中国菜 (китайская кухня)"]},
            {"character": "肉", "pinyin": "ròu", "palladius": "жоу", "meaning": "мясо", "examples": ["吃肉 (есть мясо)", "猪肉 (свинина)"]},
            {"character": "鱼", "pinyin": "yú", "palladius": "юй", "meaning": "рыба", "examples": ["吃鱼 (есть рыбу)", "鱼肉 (рыбное мясо)"]},
            {"character": "米", "pinyin": "mǐ", "palladius": "ми", "meaning": "рис", "examples": ["米饭 (варёный рис)", "大米 (рис)"]},
            {"character": "面", "pinyin": "miàn", "palladius": "мянь", "meaning": "лапша, лицо", "examples": ["面条 (лапша)", "见面 (встретиться)"]},
            {"character": "包", "pinyin": "bāo", "palladius": "бао", "meaning": "сумка, завернуть", "examples": ["书包 (школьная сумка)", "面包 (хлеб)"]},
            {"character": "条", "pinyin": "tiáo", "palladius": "тяо", "meaning": "полоса, счётное слово", "examples": ["面条 (лапша)", "одна条路 (одна дорога)"]},
            {"character": "苹", "pinyin": "píng", "palladius": "пин", "meaning": "яблоко (первый слог)", "examples": ["苹果 (яблоко)"]},
            {"character": "果", "pinyin": "guǒ", "palladius": "го", "meaning": "фрукт, результат", "examples": ["苹果 (яблоко)", "水果 (фрукты)"]},
            {"character": "东", "pinyin": "dōng", "palladius": "дун", "meaning": "восток", "examples": ["东西 (вещи)", "东方 (восток)"]},
            {"character": "西", "pinyin": "xī", "palladius": "си", "meaning": "запад", "examples": ["东西 (вещи)", "западный方 (запад)"]},
            {"character": "南", "pinyin": "nán", "palladius": "нань", "meaning": "юг", "examples": ["南方 (юг)", "南京 (Нанкин)"]},
            {"character": "北", "pinyin": "běi", "palladius": "бэй", "meaning": "север", "examples": ["北方 (север)", "北京 (Пекин)"]},
            {"character": "京", "pinyin": "jīng", "palladius": "цзин", "meaning": "столица", "examples": ["北京 (Пекин)", "南京 (Нанкин)"]},
            {"character": "海", "pinyin": "hǎi", "palladius": "хай", "meaning": "море", "examples": ["上海 (Шанхай)", "海水 (морская вода)"]},
            {"character": "爱", "pinyin": "ài", "palladius": "ай", "meaning": "любить", "examples": ["我爱你 (я люблю тебя)", "爱好 (хобби)"]},
            {"character": "想", "pinyin": "xiǎng", "palladius": "сян", "meaning": "думать, хотеть", "examples": ["想去 (хочу поехать)", "想念 (скучать)"]},
            {"character": "觉", "pinyin": "jué", "palladius": "цзюэ", "meaning": "чувствовать, спать", "examples": ["觉得 (считать)", "睡觉 (спать)"]},
            {"character": "得", "pinyin": "de", "palladius": "дэ", "meaning": "получать, мочь", "examples": ["觉得 (считать)", "得到 (получить)"]},
            {"character": "知", "pinyin": "zhī", "palladius": "чжи", "meaning": "знать", "examples": ["знать道 (знать)", "не知道 (не знать)"]},
            {"character": "道", "pinyin": "dào", "palladius": "дао", "meaning": "дорога, знать", "examples": ["知道 (знать)", "道路 (дорога)"]},
            {"character": "认", "pinyin": "rèn", "palladius": "жэнь", "meaning": "узнавать, признавать", "examples": ["认识 (знакомиться)", "не认识 (не знаком)"]},
            {"character": "识", "pinyin": "shí", "palladius": "ши", "meaning": "знания, распознавать", "examples": ["认识 (знакомиться)", "知识 (знания)"]},
            {"character": "能", "pinyin": "néng", "palladius": "нэн", "meaning": "мочь, способность", "examples": ["能说 (уметь говорить)", "可能 (возможно)"]},
            {"character": "可", "pinyin": "kě", "palladius": "кэ", "meaning": "можно, но", "examples": ["可以 (можно)", "可能 (возможно)"]},
            {"character": "以", "pinyin": "yǐ", "palladius": "и", "meaning": "при помощи, чтобы", "examples": ["可以 (можно)", "以前 (раньше)"]},
            {"character": "要", "pinyin": "yào", "palladius": "яо", "meaning": "хотеть, нужно", "examples": ["要去 (хочу поехать)", "需要 (нуждаться)"]},
            {"character": "应", "pinyin": "yīng", "palladius": "ин", "meaning": "следует, откликаться", "examples": ["应该 (следует)", "回应 (отвечать)"]},
            {"character": "该", "pinyin": "gāi", "palladius": "гай", "meaning": "следует, этот", "examples": ["应该 (следует)", "该去 (пора идти)"]}
        ];

        // Kangxi radicals (simplified set for demo)
        this.kangxiRadicals = [
            {"number": 1, "radical": "一", "pinyin": "yī", "palladius": "и", "meaning": "один", "strokes": 1},
            {"number": 2, "radical": "丨", "pinyin": "gǔn", "palladius": "гунь", "meaning": "линия", "strokes": 1},
            {"number": 3, "radical": "丶", "pinyin": "zhǔ", "palladius": "чжу", "meaning": "точка", "strokes": 1},
            {"number": 4, "radical": "丿", "pinyin": "piě", "palladius": "пе", "meaning": "откидная", "strokes": 1},
            {"number": 5, "radical": "乙", "pinyin": "yǐ", "palladius": "и", "meaning": "крючок", "strokes": 1},
            {"number": 6, "radical": "亅", "pinyin": "jué", "palladius": "цзюэ", "meaning": "крюк", "strokes": 1},
            {"number": 7, "radical": "二", "pinyin": "èr", "palladius": "эр", "meaning": "два", "strokes": 2},
            {"number": 8, "radical": "亠", "pinyin": "tóu", "palladius": "тоу", "meaning": "крышка", "strokes": 2},
            {"number": 9, "radical": "人", "pinyin": "rén", "palladius": "жэнь", "meaning": "человек", "strokes": 2},
            {"number": 10, "radical": "儿", "pinyin": "ér", "palladius": "эр", "meaning": "ребёнок", "strokes": 2},
            {"number": 30, "radical": "口", "pinyin": "kǒu", "palladius": "коу", "meaning": "рот", "strokes": 3},
            {"number": 32, "radical": "土", "pinyin": "tǔ", "palladius": "ту", "meaning": "земля", "strokes": 3},
            {"number": 37, "radical": "大", "pinyin": "dà", "palladius": "да", "meaning": "большой", "strokes": 3},
            {"number": 38, "radical": "女", "pinyin": "nǚ", "palladius": "нюй", "meaning": "женщина", "strokes": 3},
            {"number": 39, "radical": "子", "pinyin": "zǐ", "palladius": "цзы", "meaning": "ребёнок", "strokes": 3},
            {"number": 42, "radical": "小", "pinyin": "xiǎo", "palladius": "сяо", "meaning": "маленький", "strokes": 3},
            {"number": 61, "radical": "心", "pinyin": "xīn", "palladius": "синь", "meaning": "сердце", "strokes": 4},
            {"number": 64, "radical": "手", "pinyin": "shǒu", "palladius": "шоу", "meaning": "рука", "strokes": 4},
            {"number": 72, "radical": "日", "pinyin": "rì", "palladius": "жи", "meaning": "солнце", "strokes": 4},
            {"number": 74, "radical": "月", "pinyin": "yuè", "palladius": "юэ", "meaning": "луна", "strokes": 4},
            {"number": 75, "radical": "木", "pinyin": "mù", "palladius": "му", "meaning": "дерево", "strokes": 4},
            {"number": 85, "radical": "水", "pinyin": "shuǐ", "palladius": "шуй", "meaning": "вода", "strokes": 4},
            {"number": 86, "radical": "火", "pinyin": "huǒ", "palladius": "хо", "meaning": "огонь", "strokes": 4},
            {"number": 109, "radical": "目", "pinyin": "mù", "palladius": "му", "meaning": "глаз", "strokes": 5},
            {"number": 118, "radical": "竹", "pinyin": "zhú", "palladius": "чжу", "meaning": "бамбук", "strokes": 6},
            {"number": 140, "radical": "艸", "pinyin": "cǎo", "palladius": "цао", "meaning": "трава", "strokes": 6},
            {"number": 149, "radical": "言", "pinyin": "yán", "palladius": "янь", "meaning": "речь", "strokes": 7},
            {"number": 167, "radical": "金", "pinyin": "jīn", "palladius": "цзинь", "meaning": "золото", "strokes": 8}
        ];

        // Collections
        this.hsk1Collections = {
            "all_hsk1": { name: "Все HSK 1", characters: this.hsk1Characters.map(c => c.character) },
            "numbers": { name: "Числа", characters: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"] },
            "personal_pronouns": { name: "Личные местоимения", characters: ["我", "你", "他", "她"] },
            "basic_verbs": { name: "Основные глаголы", characters: ["是", "有", "来", "去", "看", "听", "吃", "喝", "买", "做", "坐", "走", "学", "说", "叫"] },
            "family_people": { name: "Семья и люди", characters: ["人", "男", "女", "儿", "子", "孩", "爸", "妈", "老", "师", "朋", "友"] },
            "time_dates": { name: "Время и даты", characters: ["天", "今", "明", "昨", "年", "月", "日", "上", "下", "午", "前", "后", "早", "晚", "时", "间", "分", "点", "钟", "现"] },
            "food_drinks": { name: "Еда и напитки", characters: ["水", "茶", "饭", "菜", "肉", "鱼", "米", "面", "果", "杯"] },
            "directions": { name: "Направления", characters: ["东", "西", "南", "北", "上", "下", "前", "后", "里"] },
            "adjectives": { name: "Прилагательные", characters: ["大", "小", "好", "多", "少", "老"] }
        };

        this.radicalCollections = {
            "all_radicals": { name: "Все ключи", radicals: this.kangxiRadicals.map(r => r.number) },
            "1_stroke": { name: "1 черта", radicals: [1, 2, 3, 4, 5, 6] },
            "2_strokes": { name: "2 черты", radicals: [7, 8, 9, 10] },
            "3_strokes": { name: "3 черты", radicals: [30, 32, 37, 38, 39, 42] },
            "4_strokes": { name: "4 черты", radicals: [61, 64, 72, 74, 75, 85, 86] },
            "common_radicals": { name: "Частые ключи", radicals: [9, 30, 32, 37, 38, 39, 61, 64, 72, 74, 75, 85, 86, 109, 118, 140, 149, 167] }
        };

        // Custom characters added by user
        this.customCharacters = [];
        this.editingCharacter = null;
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.dataset.section));
        });

        // Study section
        document.getElementById('study-collection').addEventListener('change', (e) => this.selectStudyCollection(e.target.value));
        document.getElementById('shuffle-btn').addEventListener('click', () => this.shuffleStudyCards());
        document.getElementById('reset-study').addEventListener('click', () => this.resetStudy());
        document.getElementById('show-answer').addEventListener('click', () => this.showAnswer());
        document.getElementById('next-card').addEventListener('click', () => this.nextCard());
        document.getElementById('prev-card').addEventListener('click', () => this.prevCard());

        // Quiz section
        document.getElementById('quiz-collection').addEventListener('change', (e) => this.selectQuizCollection(e.target.value));
        document.getElementById('quiz-mode').addEventListener('change', (e) => this.quizData.mode = e.target.value);
        document.getElementById('start-quiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('next-question').addEventListener('click', () => this.nextQuestion());
        document.getElementById('restart-quiz').addEventListener('click', () => this.startQuiz());

        // Answer options (delegated event listener)
        document.getElementById('answer-options').addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-option')) {
                this.selectAnswer(parseInt(e.target.dataset.answer));
            }
        });

        // Manage section
        document.getElementById('add-character-btn').addEventListener('click', () => this.showCharacterForm());
        document.getElementById('character-form-element').addEventListener('submit', (e) => this.saveCharacter(e));
        document.getElementById('cancel-form').addEventListener('click', () => this.hideCharacterForm());
        document.getElementById('manage-search').addEventListener('input', (e) => this.searchManageCharacters(e.target.value));
        document.getElementById('export-data-btn').addEventListener('click', () => this.exportData());
        document.getElementById('import-data-btn').addEventListener('click', () => document.getElementById('import-file').click());
        document.getElementById('import-file').addEventListener('change', (e) => this.importData(e));

        // Collections section
        document.querySelectorAll('.collection-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchCollectionTab(e.target.dataset.type));
        });

        // Search section
        document.getElementById('search-input').addEventListener('input', (e) => this.performSearch(e.target.value));
        document.getElementById('clear-search').addEventListener('click', () => this.clearSearch());
    }

    initializeCollections() {
        // Populate collection selectors
        this.populateCollectionSelectors();
        this.renderCollections('hsk');
        this.renderManageCharacters();
    }

    initializeTheme() {
        // Set initial theme
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
    }

    populateCollectionSelectors() {
        const studySelect = document.getElementById('study-collection');
        const quizSelect = document.getElementById('quiz-collection');

        // Clear existing options
        studySelect.innerHTML = '<option value="">Выберите коллекцию</option>';
        quizSelect.innerHTML = '<option value="">Выберите коллекцию</option>';

        // Add HSK collections
        const hskGroup = document.createElement('optgroup');
        hskGroup.label = 'HSK 1';
        Object.entries(this.hsk1Collections).forEach(([key, collection]) => {
            const option = document.createElement('option');
            option.value = `hsk:${key}`;
            option.textContent = collection.name;
            hskGroup.appendChild(option);
        });
        studySelect.appendChild(hskGroup.cloneNode(true));
        quizSelect.appendChild(hskGroup);

        // Add radical collections
        const radicalGroup = document.createElement('optgroup');
        radicalGroup.label = 'Ключи Kangxi';
        Object.entries(this.radicalCollections).forEach(([key, collection]) => {
            const option = document.createElement('option');
            option.value = `radical:${key}`;
            option.textContent = collection.name;
            radicalGroup.appendChild(option);
        });
        studySelect.appendChild(radicalGroup.cloneNode(true));
        quizSelect.appendChild(radicalGroup);
    }

    selectStudyCollection(collectionKey) {
        if (!collectionKey) {
            this.studyData.currentCollection = null;
            this.showNoContent('flashcard-container');
            return;
        }

        const [type, key] = collectionKey.split(':');
        let characters = [];

        if (type === 'hsk') {
            const collection = this.hsk1Collections[key];
            characters = collection.characters.map(char => 
                this.hsk1Characters.find(c => c.character === char)
            ).filter(c => c);
        } else if (type === 'radical') {
            const collection = this.radicalCollections[key];
            characters = collection.radicals.map(num => {
                const radical = this.kangxiRadicals.find(r => r.number === num);
                return radical ? {
                    character: radical.radical,
                    pinyin: radical.pinyin,
                    palladius: radical.palladius,
                    meaning: radical.meaning,
                    examples: [`Ключ №${radical.number} (${radical.strokes} черт)`]
                } : null;
            }).filter(c => c);
        }

        this.studyData.currentCollection = collectionKey;
        this.studyData.characters = characters;
        this.studyData.currentIndex = 0;
        this.studyData.isAnswerShown = false;
        this.studyData.shuffled = false;

        this.displayCurrentCard();
    }

    displayCurrentCard() {
        if (!this.studyData.characters.length) {
            this.showNoContent('flashcard-container');
            return;
        }

        const character = this.studyData.characters[this.studyData.currentIndex];
        const flashcard = document.getElementById('flashcard');
        
        // Show flashcard
        document.getElementById('no-collection').style.display = 'none';
        flashcard.classList.remove('hidden');

        // Update front
        document.getElementById('card-character').textContent = character.character;
        document.getElementById('card-number').textContent = 
            `${this.studyData.currentIndex + 1} / ${this.studyData.characters.length}`;

        // Update back
        document.getElementById('back-character').textContent = character.character;
        document.getElementById('back-pinyin').textContent = character.pinyin;
        document.getElementById('back-palladius').textContent = character.palladius;
        document.getElementById('back-meaning').textContent = character.meaning;
        
        const examplesContainer = document.getElementById('back-examples');
        examplesContainer.innerHTML = '';
        character.examples.forEach(example => {
            const div = document.createElement('div');
            div.className = 'example';
            div.textContent = example;
            examplesContainer.appendChild(div);
        });

        // Reset view
        this.studyData.isAnswerShown = false;
        document.querySelector('.flashcard-front').classList.remove('hidden');
        document.querySelector('.flashcard-back').classList.add('hidden');
        document.getElementById('show-answer').textContent = 'Показать ответ';

        // Update navigation buttons
        document.getElementById('prev-card').disabled = this.studyData.currentIndex === 0;
        document.getElementById('next-card').disabled = this.studyData.currentIndex === this.studyData.characters.length - 1;
    }

    showAnswer() {
        if (!this.studyData.isAnswerShown) {
            document.querySelector('.flashcard-front').classList.add('hidden');
            document.querySelector('.flashcard-back').classList.remove('hidden');
            document.getElementById('show-answer').textContent = 'Скрыть ответ';
            this.studyData.isAnswerShown = true;
        } else {
            document.querySelector('.flashcard-front').classList.remove('hidden');
            document.querySelector('.flashcard-back').classList.add('hidden');
            document.getElementById('show-answer').textContent = 'Показать ответ';
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
    selectQuizCollection(collectionKey) {
        this.quizData.currentCollection = collectionKey;
    }

    startQuiz() {
        if (!this.quizData.currentCollection) {
            alert('Пожалуйста, выберите коллекцию');
            return;
        }

        const [type, key] = this.quizData.currentCollection.split(':');
        let characters = [];

        if (type === 'hsk') {
            const collection = this.hsk1Collections[key];
            characters = collection.characters.map(char => 
                this.hsk1Characters.find(c => c.character === char)
            ).filter(c => c);
        } else if (type === 'radical') {
            const collection = this.radicalCollections[key];
            characters = collection.radicals.map(num => {
                const radical = this.kangxiRadicals.find(r => r.number === num);
                return radical ? {
                    character: radical.radical,
                    pinyin: radical.pinyin,
                    palladius: radical.palladius,
                    meaning: radical.meaning,
                    examples: [`Ключ №${radical.number} (${radical.strokes} черт)`]
                } : null;
            }).filter(c => c);
        }

        if (characters.length < 4) {
            alert('В коллекции должно быть минимум 4 иероглифа для тестирования');
            return;
        }

        this.quizData.questions = this.shuffleArray([...characters]).slice(0, Math.min(10, characters.length));
        this.quizData.currentQuestion = 0;
        this.quizData.correctAnswers = 0;
        this.quizData.incorrectAnswers = 0;

        this.displayQuestion();
        document.getElementById('no-quiz').style.display = 'none';
        document.getElementById('quiz-question').classList.remove('hidden');
        document.getElementById('quiz-results').classList.add('hidden');
    }

    displayQuestion() {
        const question = this.quizData.questions[this.quizData.currentQuestion];
        const allCharacters = [...this.hsk1Characters, ...this.kangxiRadicals.map(r => ({
            character: r.radical,
            pinyin: r.pinyin,
            palladius: r.palladius,
            meaning: r.meaning
        }))];

        // Update progress
        document.getElementById('quiz-current').textContent = this.quizData.currentQuestion + 1;
        document.getElementById('quiz-total').textContent = this.quizData.questions.length;
        document.getElementById('correct-count').textContent = this.quizData.correctAnswers;
        document.getElementById('incorrect-count').textContent = this.quizData.incorrectAnswers;

        // Display character
        document.getElementById('question-character').textContent = question.character;

        // Create answer options
        const correctAnswer = this.getAnswerByMode(question);
        const wrongAnswers = this.generateWrongAnswers(question, allCharacters, 3);
        const allAnswers = this.shuffleArray([correctAnswer, ...wrongAnswers]);

        // Update question text
        const mode = this.quizData.mode;
        const questionTexts = {
            meaning: 'Выберите правильный перевод:',
            pinyin: 'Выберите правильный пиньинь:',
            palladius: 'Выберите правильную палладицу:'
        };
        document.getElementById('question-text').textContent = questionTexts[mode];

        // Render options
        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';
        allAnswers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.dataset.answer = index;
            button.textContent = answer;
            optionsContainer.appendChild(button);
        });

        this.quizData.correctAnswerIndex = allAnswers.indexOf(correctAnswer);
        
        // Hide feedback
        document.getElementById('quiz-feedback').classList.add('hidden');
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

        feedbackText.textContent = isCorrect ? '✅ Правильно!' : '❌ Неправильно';
        feedbackText.style.color = isCorrect ? 'var(--color-success)' : 'var(--color-error)';

        if (!isCorrect) {
            const question = this.quizData.questions[this.quizData.currentQuestion];
            const correctAnswer = this.getAnswerByMode(question);
            correctAnswerDisplay.textContent = `Правильный ответ: ${correctAnswer}`;
        } else {
            correctAnswerDisplay.textContent = '';
        }

        feedbackContainer.classList.remove('hidden');

        // Update progress display
        document.getElementById('correct-count').textContent = this.quizData.correctAnswers;
        document.getElementById('incorrect-count').textContent = this.quizData.incorrectAnswers;
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
        document.getElementById('quiz-question').classList.add('hidden');
        document.getElementById('quiz-results').classList.remove('hidden');

        const total = this.quizData.correctAnswers + this.quizData.incorrectAnswers;
        const percentage = total > 0 ? Math.round((this.quizData.correctAnswers / total) * 100) : 0;

        document.getElementById('final-correct').textContent = this.quizData.correctAnswers;
        document.getElementById('final-incorrect').textContent = this.quizData.incorrectAnswers;
        document.getElementById('final-percentage').textContent = `${percentage}%`;
    }

    // Character management
    showCharacterForm(character = null) {
        const form = document.getElementById('character-form');
        const title = document.getElementById('form-title');
        
        if (character) {
            title.textContent = 'Редактировать иероглиф';
            document.getElementById('form-character').value = character.character;
            document.getElementById('form-pinyin').value = character.pinyin;
            document.getElementById('form-palladius').value = character.palladius;
            document.getElementById('form-meaning').value = character.meaning;
            document.getElementById('form-examples').value = character.examples.join('\n');
            this.editingCharacter = character;
        } else {
            title.textContent = 'Добавить новый иероглиф';
            document.getElementById('character-form-element').reset();
            this.editingCharacter = null;
        }
        
        form.classList.remove('hidden');
    }

    hideCharacterForm() {
        document.getElementById('character-form').classList.add('hidden');
        this.editingCharacter = null;
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
            this.customCharacters.push(formData);
        }

        this.hideCharacterForm();
        this.renderManageCharacters();
    }

    deleteCharacter(character) {
        if (confirm(`Удалить иероглиф "${character.character}"?`)) {
            const index = this.customCharacters.indexOf(character);
            if (index > -1) {
                this.customCharacters.splice(index, 1);
                this.renderManageCharacters();
            }
        }
    }

    renderManageCharacters(searchQuery = '') {
        const container = document.getElementById('characters-grid');
        const allCharacters = [...this.hsk1Characters, ...this.customCharacters];
        
        let filteredCharacters = allCharacters;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredCharacters = allCharacters.filter(char =>
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
            
            const isCustom = this.customCharacters.includes(character);
            
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
                    ${isCustom ? `
                        <button class="action-btn edit-btn" title="Редактировать">✏️</button>
                        <button class="action-btn delete-btn" title="Удалить">🗑️</button>
                    ` : ''}
                </div>
            `;

            if (isCustom) {
                item.querySelector('.edit-btn').addEventListener('click', () => this.showCharacterForm(character));
                item.querySelector('.delete-btn').addEventListener('click', () => this.deleteCharacter(character));
            }

            container.appendChild(item);
        });
    }

    searchManageCharacters(query) {
        this.renderManageCharacters(query);
    }

    // Collections section
    switchCollectionTab(type) {
        document.querySelectorAll('.collection-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        this.renderCollections(type);
    }

    renderCollections(type) {
        const container = document.getElementById('collections-list');
        container.innerHTML = '';

        const collections = type === 'hsk' ? this.hsk1Collections : this.radicalCollections;
        
        Object.entries(collections).forEach(([key, collection]) => {
            const card = document.createElement('div');
            card.className = 'collection-card';
            
            let items, preview;
            if (type === 'hsk') {
                items = collection.characters;
                preview = items.slice(0, 5);
            } else {
                items = collection.radicals.map(num => 
                    this.kangxiRadicals.find(r => r.number === num)?.radical || '?'
                );
                preview = items.slice(0, 5);
            }
            
            card.innerHTML = `
                <div class="collection-name">${collection.name}</div>
                <div class="collection-count">${items.length} ${type === 'hsk' ? 'иероглифов' : 'ключей'}</div>
                <div class="collection-preview">
                    ${preview.map(item => `<span class="preview-char">${item}</span>`).join('')}
                    ${items.length > 5 ? '<span class="preview-char">...</span>' : ''}
                </div>
                <div class="collection-actions">
                    <button class="btn btn--sm btn--primary study-collection" data-collection="${type}:${key}">Изучать</button>
                    <button class="btn btn--sm btn--outline quiz-collection" data-collection="${type}:${key}">Тест</button>
                </div>
            `;

            card.querySelector('.study-collection').addEventListener('click', (e) => {
                const collection = e.target.dataset.collection;
                document.getElementById('study-collection').value = collection;
                this.selectStudyCollection(collection);
                this.switchSection('study');
            });

            card.querySelector('.quiz-collection').addEventListener('click', (e) => {
                const collection = e.target.dataset.collection;
                document.getElementById('quiz-collection').value = collection;
                this.quizData.currentCollection = collection;
                this.switchSection('quiz');
            });

            container.appendChild(card);
        });
    }

    // Search functionality
    performSearch(query) {
        if (!query.trim()) {
            document.getElementById('search-results').innerHTML = '<div class="no-content"><p>Введите запрос для поиска иероглифов</p></div>';
            return;
        }

        const allCharacters = [...this.hsk1Characters, ...this.customCharacters];
        const results = allCharacters.filter(char =>
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

        resultsContainer.innerHTML = '<div class="characters-grid"></div>';
        const grid = resultsContainer.querySelector('.characters-grid');

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
            grid.appendChild(item);
        });
    }

    clearSearch() {
        document.getElementById('search-input').value = '';
        this.performSearch('');
    }

    // Import/Export functionality
    exportData() {
        const data = {
            customCharacters: this.customCharacters,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chinese-characters-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.customCharacters && Array.isArray(data.customCharacters)) {
                    this.customCharacters = [...this.customCharacters, ...data.customCharacters];
                    this.renderManageCharacters();
                    this.populateCollectionSelectors();
                    alert(`Импортировано ${data.customCharacters.length} иероглифов`);
                } else {
                    alert('Неверный формат файла');
                }
            } catch (error) {
                alert('Ошибка при чтении файла: ' + error.message);
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
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

    showNoContent(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '<div class="no-content"><p>Выберите коллекцию для начала</p></div>';
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChineseCharacterApp();
});