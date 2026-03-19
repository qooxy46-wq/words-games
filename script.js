// 单词数据
const vocabulary = [
  { id: 1, word: 'foot', chinese: '脚', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/foot--_gb_1.mp3', image: 'https://p11-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/1006387348161953870~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444712&x-signature=n97Aud7eVOd%2BX6wBkXfUDIhWaRY%3D' },
  { id: 2, word: 'arm', chinese: '手臂', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/arm--_gb_1.mp3', image: 'https://p11-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/1006395121945018417~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444712&x-signature=wxOToGUAfIbm8Sp88j6KBZ8Fr3E%3D' },
  { id: 3, word: 'chin', chinese: '下巴', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/chin--_gb_1.mp3', image: 'https://p3-doubao-search-sign.byteimg.com/labis/image/303db30354c5bf7d5f8f0bba84260eff~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444751&x-signature=YHxnffbd1UTtgo8MX8to%2BoZJ2uI%3D' },
  { id: 4, word: 'leg', chinese: '腿', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/leg--_gb_1.mp3', image: 'https://p11-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/973256709166071811~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444712&x-signature=SQAnv9CN7UfJjUseHuLno4a5rA4%3D' },
  { id: 5, word: 'nose', chinese: '鼻子', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/nose--_gb_1.mp3', image: 'https://p26-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/903075225467355146~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444726&x-signature=zXjL7JIfUTbQYAqH4amk%2FfB%2Bejs%3D' },
  { id: 6, word: 'head', chinese: '头', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/head--_gb_1.mp3', image: 'https://p11-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/993414150346506300~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444726&x-signature=DFlDdWktPz1B6SwvUMHF0OXQxgw%3D' },
  { id: 7, word: 'eye', chinese: '眼睛', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/eye--_gb_1.mp3', image: 'https://p3-doubao-search-sign.byteimg.com/labis/image/76eb3a2c0bdd23cbda95b0f0d2266da6~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444726&x-signature=InGaumpe0%2BpUCIy%2BNwvYF9tgEh4%3D' },
  { id: 8, word: 'ear', chinese: '耳朵', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/ear--_gb_1.mp3', image: 'https://p3-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/919901902304444670~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444739&x-signature=Ts68QIY5O5amPV4E2BEDQNJR000%3D' },
  { id: 9, word: 'paw', chinese: '爪子', audio: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/paw--_gb_1.mp3', image: 'https://p26-doubao-search-sign.byteimg.com/tos-cn-i-be4g95zd3a/1061176399119384669~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1789444761&x-signature=8gKuNMWaS8cLDj9QE1Dkx3HvPyU%3D' }
];

// 游戏进度数据
let gameProgress = {
  currentLevel: 0, // 0: 未开始, 1-5: 对应五大关卡
  levels: {
    1: { completed: false, score: 0 }, // 音义对应
    2: { completed: false, score: 0 }, // 音词对应
    3: { completed: false, score: 0 }, // 词义对应
    4: { completed: false, score: 0, subLevels: [false, false, false, false] }, // 拼写检测
    5: { completed: false, score: 0 }  // 听写检测
  },
  totalScore: 0
};

// 当前关卡数据
let currentQuestion = {
  level: 0,
  sublevel: 0,
  currentIndex: 0,
  questions: [],
  score: 0
};

// 音效控制
let soundEnabled = true;
const soundEffects = {
  correct: new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'),
  wrong: new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'),
  success: new Audio('https://assets.mixkit.co/active_storage/sfx/1347/1347-preview.mp3')
};

// DOM 加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', function() {
  // 从本地存储加载游戏进度
  loadGameProgress();
  
  // 初始化首页
  initHomePage();
  
  // 初始化音效控制
  initSoundControl();
});

// 初始化首页
function initHomePage() {
  // 绑定开始游戏按钮
  document.getElementById('start-game-btn').addEventListener('click', function() {
    showPage('level-nav-page');
    updateLevelStatus();
  });
}

// 初始化音效控制
function initSoundControl() {
  const soundToggle = document.getElementById('sound-toggle');
  soundToggle.addEventListener('click', function() {
    soundEnabled = !soundEnabled;
    soundToggle.innerHTML = soundEnabled ? '<i class="fa fa-volume-up"></i>' : '<i class="fa fa-volume-off"></i>';
    soundToggle.title = soundEnabled ? '关闭音效' : '开启音效';
  });
}

// 播放音效
function playSound(effect) {
  if (soundEnabled && soundEffects[effect]) {
    soundEffects[effect].currentTime = 0;
    soundEffects[effect].play();
  }
}

// 播放单词发音
function playWordAudio(word) {
  const wordData = vocabulary.find(item => item.word === word);
  if (wordData && wordData.audio) {
    const audio = new Audio(wordData.audio);
    audio.play();
  }
}

// 显示指定页面
function showPage(pageId) {
  // 隐藏所有页面
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // 显示指定页面
  document.getElementById(pageId).classList.add('active');
  
  // 如果是关卡页面，初始化对应关卡
  if (pageId.startsWith('level')) {
    const levelMatch = pageId.match(/level(\d+)/);
    if (levelMatch) {
      const level = parseInt(levelMatch[1]);
      initLevel(level);
    }
  }
  
  // 如果是子关卡页面，初始化对应子关卡
  if (pageId.startsWith('sublevel')) {
    const sublevelMatch = pageId.match(/sublevel(\d+)/);
    if (sublevelMatch) {
      const sublevel = parseInt(sublevelMatch[1]);
      initSublevel(sublevel);
    }
  }
}

// 更新关卡状态显示
function updateLevelStatus() {
  // 更新总体进度
  const completedLevels = Object.values(gameProgress.levels).filter(level => level.completed).length;
  const totalLevels = Object.keys(gameProgress.levels).length;
  const progressPercentage = Math.round((completedLevels / totalLevels) * 100);
  
  document.getElementById('overall-progress').style.width = `${progressPercentage}%`;
  document.getElementById('progress-percentage').textContent = `${progressPercentage}%`;
  
  // 更新各关卡状态
  for (let i = 1; i <= 5; i++) {
    const levelStatus = document.getElementById(`level${i}-status`);
    if (levelStatus) {
      if (gameProgress.levels[i].completed) {
        levelStatus.textContent = '已完成';
        levelStatus.className = 'level-status completed';
      } else if (i === gameProgress.currentLevel) {
        levelStatus.textContent = '进行中';
        levelStatus.className = 'level-status in-progress';
      } else {
        levelStatus.textContent = '未开始';
        levelStatus.className = 'level-status not-started';
      }
    }
  }
  
  // 如果是拼写检测关卡，更新子关卡状态
  if (gameProgress.levels[4].subLevels) {
    for (let i = 0; i < 4; i++) {
      const sublevelStatus = document.getElementById(`sublevel${i+1}-status`);
      if (sublevelStatus) {
        if (gameProgress.levels[4].subLevels[i]) {
          sublevelStatus.textContent = '已完成';
          sublevelStatus.className = 'sublevel-status completed';
        } else {
          sublevelStatus.textContent = '未开始';
          sublevelStatus.className = 'sublevel-status not-started';
        }
      }
    }
  }
}

// 初始化关卡
function initLevel(level) {
  // 设置当前关卡
  currentQuestion.level = level;
  currentQuestion.currentIndex = 0;
  currentQuestion.score = 0;
  
  // 根据关卡类型生成问题
  switch (level) {
    case 1: // 音义对应
      generateLevel1Questions();
      break;
    case 2: // 音词对应
      generateLevel2Questions();
      break;
    case 3: // 词义对应
      generateLevel3Questions();
      break;
    case 4: // 拼写检测
      // 拼写检测关卡不需要生成问题，它是子关卡的集合
      break;
    case 5: // 听写检测
      generateLevel5Questions();
      break;
  }
  
  // 更新关卡显示
  updateLevelDisplay();
}

// 初始化子关卡
function initSublevel(sublevel) {
  // 设置当前子关卡
  currentQuestion.level = 4;
  currentQuestion.sublevel = sublevel;
  currentQuestion.currentIndex = 0;
  currentQuestion.score = 0;
  
  // 根据子关卡类型生成问题
  switch (sublevel) {
    case 1: // 字母中识别单词
      generateSublevel1Questions();
      break;
    case 2: // 乱序字母排序
      generateSublevel2Questions();
      break;
    case 3: // 填写缺字母
      generateSublevel3Questions();
      break;
    case 4: // 根据意思拼写
      generateSublevel4Questions();
      break;
  }
  
  // 更新子关卡显示
  updateSublevelDisplay();
}

// 生成关卡1（音义对应）问题
function generateLevel1Questions() {
  // 随机选择6个单词
  const selectedWords = getRandomItems(vocabulary, 6);
  
  // 为每个单词生成一个问题
  currentQuestion.questions = selectedWords.map(word => {
    // 生成3个干扰选项（从其他单词中随机选择）
    const distractors = getRandomItems(
      vocabulary.filter(w => w.word !== word.word),
      3
    );
    
    // 合并选项并随机排序
    const options = [word, ...distractors].sort(() => Math.random() - 0.5);
    
    return {
      type: 'audio-image',
      word: word.word,
      chinese: word.chinese,
      audio: word.audio,
      image: word.image,
      options: options.map(opt => ({
        image: opt.image,
        word: opt.word
      })),
      correctAnswer: word.word
    };
  });
}

// 生成关卡2（音词对应）问题
function generateLevel2Questions() {
  // 随机选择6个单词
  const selectedWords = getRandomItems(vocabulary, 6);
  
  // 为每个单词生成一个问题
  currentQuestion.questions = selectedWords.map(word => {
    // 生成3个干扰选项（从其他单词中随机选择）
    const distractors = getRandomItems(
      vocabulary.filter(w => w.word !== word.word),
      3
    );
    
    // 合并选项并随机排序
    const options = [word, ...distractors].sort(() => Math.random() - 0.5);
    
    return {
      type: 'audio-word',
      word: word.word,
      chinese: word.chinese,
      audio: word.audio,
      image: word.image,
      options: options.map(opt => ({
        text: opt.word,
        word: opt.word
      })),
      correctAnswer: word.word
    };
  });
}

// 生成关卡3（词义对应）问题
function generateLevel3Questions() {
  // 随机选择6个单词
  const selectedWords = getRandomItems(vocabulary, 6);
  
  // 为每个单词生成一个问题
  currentQuestion.questions = selectedWords.map((word, index) => {
    // 一半问题是单词->图片，一半问题是图片->单词
    const isWordToImage = index % 2 === 0;
    
    // 生成3个干扰选项（从其他单词中随机选择）
    const distractors = getRandomItems(
      vocabulary.filter(w => w.word !== word.word),
      3
    );
    
    // 合并选项并随机排序
    const options = [word, ...distractors].sort(() => Math.random() - 0.5);
    
    if (isWordToImage) {
      // 单词->图片
      return {
        type: 'word-image',
        word: word.word,
        chinese: word.chinese,
        audio: word.audio,
        image: word.image,
        options: options.map(opt => ({
          image: opt.image,
          word: opt.word
        })),
        correctAnswer: word.word
      };
    } else {
      // 图片->单词
      return {
        type: 'image-word',
        word: word.word,
        chinese: word.chinese,
        audio: word.audio,
        image: word.image,
        options: options.map(opt => ({
          text: opt.word,
          word: opt.word
        })),
        correctAnswer: word.word
      };
    }
  });
}

// 生成关卡4.1（字母中识别单词）问题
function generateSublevel1Questions() {
  // 随机选择6个单词
  const selectedWords = getRandomItems(vocabulary, 6);
  
  // 为每个单词生成一个问题
  currentQuestion.questions = selectedWords.map(word => {
    // 生成字母矩阵（包含目标单词的所有字母，再随机添加其他字母）
    const wordLetters = word.word.split('');
    const extraLetters = getRandomLetters(25 - wordLetters.length);
    const allLetters = [...wordLetters, ...extraLetters].sort(() => Math.random() - 0.5);
    
    return {
      type: 'letter-recognition',
      word: word.word,
      chinese: word.chinese,
      audio: word.audio,
      image: word.image,
      letters: allLetters,
      correctAnswer: word.word
    };
  });
}

// 生成关卡4.2（乱序字母排序）问题
function generateSublevel2Questions() {
  // 随机选择6个单词
  const selectedWords = getRandomItems(vocabulary, 6);
  
  // 为每个单词生成一个问题
  currentQuestion.questions = selectedWords.map(word => {
    // 将单词字母打乱顺序
    const scrambledLetters = word.word.split('').sort(() => Math.random() - 0.5);
    
    return {
      type: 'letter-ordering',
      word: word.word,
      chinese: word.chinese,
      audio: word.audio,
      image: word.image,
      scrambledLetters: scrambledLetters,
      correctAnswer: word.word
    };
  });
}

// 生成关卡4.3（填写缺字母）问题
function generateSublevel3Questions() {
  // 随机选择6个单词
  const selectedWords = getRandomItems(vocabulary, 6);
  
  // 为每个单词生成一个问题
  currentQuestion.questions = selectedWords.map(word => {
    // 确定要缺失的字母位置（1-2个）
    const wordLength = word.word.length;
    const blankCount = wordLength <= 3 ? 1 : 2;
    const blankIndices = [];
    
    while (blankIndices.length < blankCount) {
      const index = Math.floor(Math.random() * wordLength);
      if (!blankIndices.includes(index)) {
        blankIndices.push(index);
      }
    }
    
    // 创建带缺失字母的单词表示
    const wordWithBlanks = word.word.split('').map((letter, index) => 
      blankIndices.includes(index) ? '_' : letter
    );
    
    // 生成字母选项（包含正确答案和干扰项）
    const correctLetters = blankIndices.map(index => word.word[index]);
    const extraLetters = getRandomLetters(6 - blankCount).filter(letter => 
      !correctLetters.includes(letter) && !word.word.includes(letter)
    );
    
    const letterOptions = [...correctLetters, ...extraLetters].sort(() => Math.random() - 0.5);
    
    return {
      type: 'fill-blanks',
      word: word.word,
      chinese: word.chinese,
      audio: word.audio,
      image: word.image,
      wordWithBlanks: wordWithBlanks,
      blankIndices: blankIndices,
      letterOptions: letterOptions,
      correctAnswer: word.word
    };
  });
}

// 生成关卡4.4（根据意思拼写）问题
function generateSublevel4Questions() {
  // 随机选择6个单词
  const selectedWords = getRandomItems(vocabulary, 6);
  
  // 为每个单词生成一个问题
  currentQuestion.questions = selectedWords.map(word => {
    return {
      type: 'spelling',
      word: word.word,
      chinese: word.chinese,
      audio: word.audio,
      image: word.image,
      correctAnswer: word.word
    };
  });
}

// 生成关卡5（听写检测）问题
function generateLevel5Questions() {
  // 随机选择6个单词
  const selectedWords = getRandomItems(vocabulary, 6);
  
  // 为每个单词生成一个问题
  currentQuestion.questions = selectedWords.map(word => {
    return {
      type: 'dictation',
      word: word.word,
      chinese: word.chinese,
      audio: word.audio,
      image: word.image,
      correctAnswer: word.word
    };
  });
}

// 更新关卡显示
function updateLevelDisplay() {
  const level = currentQuestion.level;
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  
  // 更新分数显示
  document.getElementById(`level${level}-score`).textContent = currentQuestion.score;
  
  switch (level) {
    case 1: // 音义对应
      updateLevel1Display(question);
      break;
    case 2: // 音词对应
      updateLevel2Display(question);
      break;
    case 3: // 词义对应
      updateLevel3Display(question);
      break;
    case 5: // 听写检测
      updateLevel5Display(question);
      break;
  }
}

// 更新子关卡显示
function updateSublevelDisplay() {
  const sublevel = currentQuestion.sublevel;
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  
  // 更新分数显示
  document.getElementById(`sublevel${sublevel}-score`).textContent = currentQuestion.score;
  
  switch (sublevel) {
    case 1: // 字母中识别单词
      updateSublevel1Display(question);
      break;
    case 2: // 乱序字母排序
      updateSublevel2Display(question);
      break;
    case 3: // 填写缺字母
      updateSublevel3Display(question);
      break;
    case 4: // 根据意思拼写
      updateSublevel4Display(question);
      break;
  }
}

// 更新关卡1（音义对应）显示
function updateLevel1Display(question) {
  const optionsContainer = document.getElementById('level1-options');
  optionsContainer.innerHTML = '';
  
  // 添加选项
  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option-item';
    optionElement.dataset.word = option.word;
    
    optionElement.innerHTML = `
      <img src="${option.image}" alt="${option.word}">
    `;
    
    optionElement.addEventListener('click', function() {
      checkLevel1Answer(option.word);
    });
    
    optionsContainer.appendChild(optionElement);
  });
  
  // 绑定播放按钮
  document.getElementById('play-audio-btn').onclick = function() {
    playWordAudio(question.word);
  };
  
  // 自动播放当前单词发音
  playWordAudio(question.word);
}

// 更新关卡2（音词对应）显示
function updateLevel2Display(question) {
  const optionsContainer = document.getElementById('level2-options');
  optionsContainer.innerHTML = '';
  
  // 添加选项
  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option-item';
    optionElement.dataset.word = option.word;
    
    optionElement.innerHTML = `
      <span>${option.text}</span>
    `;
    
    optionElement.addEventListener('click', function() {
      checkLevel2Answer(option.word);
    });
    
    optionsContainer.appendChild(optionElement);
  });
  
  // 绑定播放按钮
  document.getElementById('play-audio-btn2').onclick = function() {
    playWordAudio(question.word);
  };
  
  // 自动播放当前单词发音
  playWordAudio(question.word);
}

// 更新关卡3（词义对应）显示
function updateLevel3Display(question) {
  const questionElement = document.getElementById('level3-question');
  const optionsContainer = document.getElementById('level3-options');
  optionsContainer.innerHTML = '';
  
  if (question.type === 'word-image') {
    // 单词->图片
    questionElement.innerHTML = `<span>${question.word}</span>`;
    
    // 添加图片选项
    question.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option-item';
      optionElement.dataset.word = option.word;
      
      optionElement.innerHTML = `
        <img src="${option.image}" alt="${option.word}">
      `;
      
      optionElement.addEventListener('click', function() {
        checkLevel3Answer(option.word);
      });
      
      optionsContainer.appendChild(optionElement);
    });
  } else {
    // 图片->单词
    questionElement.innerHTML = `<img src="${question.image}" alt="${question.word}">`;
    
    // 添加单词选项
    question.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option-item';
      optionElement.dataset.word = option.word;
      
      optionElement.innerHTML = `
        <span>${option.text}</span>
      `;
      
      optionElement.addEventListener('click', function() {
        checkLevel3Answer(option.word);
      });
      
      optionsContainer.appendChild(optionElement);
    });
  }
}

// 更新关卡4.1（字母中识别单词）显示
function updateSublevel1Display(question) {
  const imageDisplay = document.getElementById('sublevel1-image');
  const letterMatrix = document.getElementById('letter-matrix');
  const selectedLetters = document.getElementById('selected-letters');
  
  // 显示图片
  imageDisplay.innerHTML = `<img src="${question.image}" alt="${question.word}">`;
  
  // 清空字母矩阵和已选字母
  letterMatrix.innerHTML = '';
  selectedLetters.innerHTML = '';
  
  // 添加字母到矩阵
  question.letters.forEach(letter => {
    const letterElement = document.createElement('div');
    letterElement.className = 'letter-tile';
    letterElement.textContent = letter;
    
    letterElement.addEventListener('click', function() {
      if (this.classList.contains('selected')) {
        // 如果已选中，则取消选择
        this.classList.remove('selected');
        
        // 从已选字母中移除
        const selectedLetterElements = selectedLetters.querySelectorAll('.selected-letter');
        for (let i = 0; i < selectedLetterElements.length; i++) {
          if (selectedLetterElements[i].dataset.letter === letter) {
            selectedLetterElements[i].remove();
            break;
          }
        }
      } else {
        // 如果未选中，则选中
        this.classList.add('selected');
        
        // 添加到已选字母
        const selectedLetterElement = document.createElement('div');
        selectedLetterElement.className = 'selected-letter';
        selectedLetterElement.dataset.letter = letter;
        selectedLetterElement.innerHTML = `
          ${letter}
          <span class="remove-letter" onclick="removeSelectedLetter('${letter}')">×</span>
        `;
        
        selectedLetters.appendChild(selectedLetterElement);
      }
    });
    
    letterMatrix.appendChild(letterElement);
  });
  
  // 绑定检查按钮
  document.getElementById('check-word-btn').onclick = function() {
    checkSublevel1Answer();
  };
  
  // 绑定重置按钮
  document.getElementById('reset-letters-btn').onclick = function() {
    resetSublevel1();
  };
}

// 更新关卡4.2（乱序字母排序）显示
function updateSublevel2Display(question) {
  const imageDisplay = document.getElementById('sublevel2-image');
  const scrambledLetters = document.getElementById('scrambled-letters');
  const wordSlots = document.getElementById('word-slots');
  
  // 显示图片
  imageDisplay.innerHTML = `<img src="${question.image}" alt="${question.word}">`;
  
  // 清空乱序字母和单词槽
  scrambledLetters.innerHTML = '';
  wordSlots.innerHTML = '';
  
  // 添加乱序字母
  question.scrambledLetters.forEach(letter => {
    const letterElement = document.createElement('div');
    letterElement.className = 'scrambled-letter';
    letterElement.textContent = letter;
    letterElement.draggable = true;
    
    // 添加拖拽事件
    letterElement.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text/plain', letter);
      this.classList.add('dragging');
    });
    
    letterElement.addEventListener('dragend', function() {
      this.classList.remove('dragging');
    });
    
    scrambledLetters.appendChild(letterElement);
  });
  
  // 添加单词槽
  for (let i = 0; i < question.word.length; i++) {
    const slotElement = document.createElement('div');
    slotElement.className = 'word-slot';
    slotElement.dataset.index = i;
    
    // 添加放置事件
    slotElement.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.classList.add('drag-over');
    });
    
    slotElement.addEventListener('dragleave', function() {
      this.classList.remove('drag-over');
    });
    
    slotElement.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('drag-over');
      
      const letter = e.dataTransfer.getData('text/plain');
      this.textContent = letter;
      this.classList.add('filled');
      this.dataset.letter = letter;
    });
    
    wordSlots.appendChild(slotElement);
  }
  
  // 绑定检查按钮
  document.getElementById('check-order-btn').onclick = function() {
    checkSublevel2Answer();
  };
  
  // 绑定重置按钮
  document.getElementById('reset-order-btn').onclick = function() {
    resetSublevel2();
  };
}

// 更新关卡4.3（填写缺字母）显示
function updateSublevel3Display(question) {
  const imageDisplay = document.getElementById('sublevel3-image');
  const wordWithBlanks = document.getElementById('word-with-blanks');
  const letterOptions = document.getElementById('letter-options');
  
  // 显示图片
  imageDisplay.innerHTML = `<img src="${question.image}" alt="${question.word}">`;
  
  // 清空单词和字母选项
  wordWithBlanks.innerHTML = '';
  letterOptions.innerHTML = '';
  
  // 添加带缺失字母的单词
  question.wordWithBlanks.forEach((char, index) => {
    const charElement = document.createElement('div');
    
    if (char === '_') {
      charElement.className = 'word-blank';
      charElement.dataset.index = index;
    } else {
      charElement.className = 'word-letter';
      charElement.textContent = char;
    }
    
    wordWithBlanks.appendChild(charElement);
  });
  
  // 添加字母选项
  question.letterOptions.forEach(letter => {
    const letterElement = document.createElement('div');
    letterElement.className = 'option-letter';
    letterElement.textContent = letter;
    letterElement.dataset.letter = letter;
    
    letterElement.addEventListener('click', function() {
      if (this.classList.contains('selected')) {
        // 如果已选中，则取消选择
        this.classList.remove('selected');
        
        // 从空白位置移除
        const blanks = wordWithBlanks.querySelectorAll('.word-blank');
        for (let i = 0; i < blanks.length; i++) {
          if (blanks[i].textContent === letter) {
            blanks[i].textContent = '';
            break;
          }
        }
      } else {
        // 如果未选中，则选中
        this.classList.add('selected');
        
        // 找到第一个空的空白位置并填入字母
        const blanks = wordWithBlanks.querySelectorAll('.word-blank');
        for (let i = 0; i < blanks.length; i++) {
          if (!blanks[i].textContent) {
            blanks[i].textContent = letter;
            break;
          }
        }
      }
    });
    
    letterOptions.appendChild(letterElement);
  });
  
  // 绑定检查按钮
  document.getElementById('check-blanks-btn').onclick = function() {
    checkSublevel3Answer();
  };
  
  // 绑定重置按钮
  document.getElementById('reset-blanks-btn').onclick = function() {
    resetSublevel3();
  };
}

// 更新关卡4.4（根据意思拼写）显示
function updateSublevel4Display(question) {
  const imageDisplay = document.getElementById('sublevel4-image');
  const chineseHint = document.getElementById('chinese-hint');
  const spellingInput = document.getElementById('spelling-input');
  
  // 显示图片和中文提示
  imageDisplay.innerHTML = `<img src="${question.image}" alt="${question.word}">`;
  chineseHint.textContent = question.chinese;
  
  // 清空输入框
  spellingInput.value = '';
  
  // 绑定检查按钮
  document.getElementById('check-spelling-btn').onclick = function() {
    checkSublevel4Answer();
  };
  
  // 绑定重置按钮
  document.getElementById('reset-spelling-btn').onclick = function() {
    spellingInput.value = '';
  };
  
  // 添加实时验证
  spellingInput.addEventListener('input', function() {
    if (this.value.toLowerCase() === question.word.toLowerCase()) {
      this.style.borderColor = '#66cc99';
    } else {
      this.style.borderColor = '#99ccff';
    }
  });
}

// 更新关卡5（听写检测）显示
function updateLevel5Display(question) {
  const chineseHint = document.getElementById('level5-chinese');
  const dictationInput = document.getElementById('dictation-input');
  
  // 显示中文提示
  chineseHint.textContent = question.chinese;
  
  // 清空输入框
  dictationInput.value = '';
  
  // 绑定播放按钮
  document.getElementById('play-audio-btn5').onclick = function() {
    playWordAudio(question.word);
  };
  
  // 绑定检查按钮
  document.getElementById('check-dictation-btn').onclick = function() {
    checkLevel5Answer();
  };
  
  // 绑定下一题按钮
  document.getElementById('next-dictation-btn').onclick = function() {
    nextQuestion();
  };
  
  // 自动播放当前单词发音
  playWordAudio(question.word);
}

// 检查关卡1（音义对应）答案
function checkLevel1Answer(selectedWord) {
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  const isCorrect = selectedWord === question.correctAnswer;
  
  // 显示反馈
  showFeedback(isCorrect, isCorrect ? '答对了！' : `答错了！正确答案是 ${question.word}`);
  
  // 播放音效
  playSound(isCorrect ? 'correct' : 'wrong');
  
  // 更新分数
  if (isCorrect) {
    currentQuestion.score++;
  }
  
  // 更新显示
  document.getElementById(`level${currentQuestion.level}-score`).textContent = currentQuestion.score;
  
  // 延迟后进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 检查关卡2（音词对应）答案
function checkLevel2Answer(selectedWord) {
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  const isCorrect = selectedWord === question.correctAnswer;
  
  // 显示反馈
  showFeedback(isCorrect, isCorrect ? '答对了！' : `答错了！正确答案是 ${question.word}`);
  
  // 播放音效
  playSound(isCorrect ? 'correct' : 'wrong');
  
  // 更新分数
  if (isCorrect) {
    currentQuestion.score++;
  }
  
  // 更新显示
  document.getElementById(`level${currentQuestion.level}-score`).textContent = currentQuestion.score;
  
  // 延迟后进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 检查关卡3（词义对应）答案
function checkLevel3Answer(selectedWord) {
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  const isCorrect = selectedWord === question.correctAnswer;
  
  // 显示反馈
  showFeedback(isCorrect, isCorrect ? '答对了！' : `答错了！正确答案是 ${question.word}`);
  
  // 播放音效
  playSound(isCorrect ? 'correct' : 'wrong');
  
  // 更新分数
  if (isCorrect) {
    currentQuestion.score++;
  }
  
  // 更新显示
  document.getElementById(`level${currentQuestion.level}-score`).textContent = currentQuestion.score;
  
  // 延迟后进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 检查关卡4.1（字母中识别单词）答案
function checkSublevel1Answer() {
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  const selectedLetters = document.getElementById('selected-letters');
  const selectedLettersText = Array.from(selectedLetters.querySelectorAll('.selected-letter'))
    .map(el => el.dataset.letter)
    .join('');
  
  const isCorrect = selectedLettersText.toLowerCase() === question.correctAnswer.toLowerCase();
  
  // 显示反馈
  showFeedback(isCorrect, isCorrect ? '答对了！' : `答错了！正确答案是 ${question.word}`);
  
  // 播放音效
  playSound(isCorrect ? 'correct' : 'wrong');
  
  // 更新分数
  if (isCorrect) {
    currentQuestion.score++;
  }
  
  // 更新显示
  document.getElementById(`sublevel${currentQuestion.sublevel}-score`).textContent = currentQuestion.score;
  
  // 延迟后进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 检查关卡4.2（乱序字母排序）答案
function checkSublevel2Answer() {
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  const wordSlots = document.getElementById('word-slots');
  const filledSlots = Array.from(wordSlots.querySelectorAll('.word-slot.filled'));
  
  // 检查是否所有槽都已填满
  if (filledSlots.length !== question.word.length) {
    showFeedback(false, '请填满所有字母槽！');
    playSound('wrong');
    return;
  }
  
  // 获取排序后的字母
  const orderedLetters = Array.from({ length: question.word.length }, (_, i) => {
    const slot = wordSlots.querySelector(`.word-slot[data-index="${i}"]`);
    return slot ? slot.dataset.letter : '';
  }).join('');
  
  const isCorrect = orderedLetters.toLowerCase() === question.correctAnswer.toLowerCase();
  
  // 显示反馈
  showFeedback(isCorrect, isCorrect ? '答对了！' : `答错了！正确答案是 ${question.word}`);
  
  // 播放音效
  playSound(isCorrect ? 'correct' : 'wrong');
  
  // 更新分数
  if (isCorrect) {
    currentQuestion.score++;
  }
  
  // 更新显示
  document.getElementById(`sublevel${currentQuestion.sublevel}-score`).textContent = currentQuestion.score;
  
  // 延迟后进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 检查关卡4.3（填写缺字母）答案
function checkSublevel3Answer() {
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  const wordWithBlanks = document.getElementById('word-with-blanks');
  const blanks = wordWithBlanks.querySelectorAll('.word-blank');
  
  // 检查是否所有空白都已填满
  for (let i = 0; i < blanks.length; i++) {
    if (!blanks[i].textContent) {
      showFeedback(false, '请填满所有空白！');
      playSound('wrong');
      return;
    }
  }
  
  // 获取填写后的单词
  const filledWord = Array.from(wordWithBlanks.children).map(el => 
    el.textContent || '_'
  ).join('');
  
  const isCorrect = filledWord.toLowerCase() === question.correctAnswer.toLowerCase();
  
  // 显示反馈
  showFeedback(isCorrect, isCorrect ? '答对了！' : `答错了！正确答案是 ${question.word}`);
  
  // 播放音效
  playSound(isCorrect ? 'correct' : 'wrong');
  
  // 更新分数
  if (isCorrect) {
    currentQuestion.score++;
  }
  
  // 更新显示
  document.getElementById(`sublevel${currentQuestion.sublevel}-score`).textContent = currentQuestion.score;
  
  // 延迟后进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 检查关卡4.4（根据意思拼写）答案
function checkSublevel4Answer() {
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  const spellingInput = document.getElementById('spelling-input');
  const userInput = spellingInput.value.trim();
  
  if (!userInput) {
    showFeedback(false, '请输入单词！');
    playSound('wrong');
    return;
  }
  
  const isCorrect = userInput.toLowerCase() === question.correctAnswer.toLowerCase();
  
  // 显示反馈
  showFeedback(isCorrect, isCorrect ? '答对了！' : `答错了！正确答案是 ${question.word}`);
  
  // 播放音效
  playSound(isCorrect ? 'correct' : 'wrong');
  
  // 更新分数
  if (isCorrect) {
    currentQuestion.score++;
  }
  
  // 更新显示
  document.getElementById(`sublevel${currentQuestion.sublevel}-score`).textContent = currentQuestion.score;
  
  // 延迟后进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 检查关卡5（听写检测）答案
function checkLevel5Answer() {
  const question = currentQuestion.questions[currentQuestion.currentIndex];
  const dictationInput = document.getElementById('dictation-input');
  const userInput = dictationInput.value.trim();
  
  if (!userInput) {
    showFeedback(false, '请输入单词！');
    playSound('wrong');
    return;
  }
  
  const isCorrect = userInput.toLowerCase() === question.correctAnswer.toLowerCase();
  
  // 显示反馈
  showFeedback(isCorrect, isCorrect ? '答对了！' : `答错了！正确答案是 ${question.word}`);
  
  // 播放音效
  playSound(isCorrect ? 'correct' : 'wrong');
  
  // 更新分数
  if (isCorrect) {
    currentQuestion.score++;
    document.getElementById(`level${currentQuestion.level}-score`).textContent = currentQuestion.score;
  }
  
  // 延迟后进入下一题
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

// 进入下一题
function nextQuestion() {
  currentQuestion.currentIndex++;
  
  // 检查是否还有题目
  if (currentQuestion.currentIndex < currentQuestion.questions.length) {
    // 更新显示
    if (currentQuestion.level === 4) {
      updateSublevelDisplay();
    } else {
      updateLevelDisplay();
    }
  } else {
    // 关卡完成
    completeLevel();
  }
}

// 完成关卡
function completeLevel() {
  const level = currentQuestion.level;
  const sublevel = currentQuestion.sublevel;
  const score = currentQuestion.score;
  const totalQuestions = currentQuestion.questions.length;
  
  // 更新游戏进度
  if (level === 4) {
    // 拼写检测子关卡
    gameProgress.levels[4].subLevels[sublevel - 1] = true;
    
    // 检查是否所有子关卡都已完成
    const allSublevelsCompleted = gameProgress.levels[4].subLevels.every(completed => completed);
    
    if (allSublevelsCompleted) {
      gameProgress.levels[4].completed = true;
      gameProgress.levels[4].score = score;
      gameProgress.currentLevel = 5;
    }
  } else {
    // 普通关卡
    gameProgress.levels[level].completed = true;
    gameProgress.levels[level].score = score;
    gameProgress.currentLevel = level < 5 ? level + 1 : 0;
  }
  
  // 计算总分
  calculateTotalScore();
  
  // 保存游戏进度
  saveGameProgress();
  
  // 更新关卡状态显示
  updateLevelStatus();
  
  // 播放成功音效
  playSound('success');
  
  // 显示关卡完成弹窗
  showLevelCompleteModal(level, sublevel, score, totalQuestions);
}

// 显示关卡完成弹窗
function showLevelCompleteModal(level, sublevel, score, totalQuestions) {
  const levelCompleteModal = document.getElementById('level-complete-modal');
  const levelCompleteScore = document.getElementById('level-complete-score');
  const levelCompleteFeedback = document.getElementById('level-complete-feedback');
  const nextLevelBtn = document.getElementById('next-level-btn');
  
  // 设置分数显示
  levelCompleteScore.textContent = `${score}/${totalQuestions}`;
  
  // 设置反馈信息
  let feedback = '';
  const percentage = Math.round((score / totalQuestions) * 100);
  
  if (percentage >= 90) {
    feedback = '太棒了！你是单词小能手！';
  } else if (percentage >= 70) {
    feedback = '做得很好！继续加油！';
  } else if (percentage >= 50) {
    feedback = '不错的尝试！再多练习一下吧！';
  } else {
    feedback = '继续努力，你会做得更好的！';
  }
  
  levelCompleteFeedback.textContent = feedback;
  
  // 设置下一关按钮
  if (level === 4) {
    // 拼写检测子关卡
    const allSublevelsCompleted = gameProgress.levels[4].subLevels.every(completed => completed);
    
    if (allSublevelsCompleted) {
      nextLevelBtn.textContent = '进入下一关';
      nextLevelBtn.onclick = () => {
        levelCompleteModal.classList.remove('active');
        showPage('level5-page');
      };
    } else {
      nextLevelBtn.textContent = '下一个子关卡';
      nextLevelBtn.onclick = () => {
        levelCompleteModal.classList.remove('active');
        
        // 找到下一个未完成的子关卡
        const nextSublevel = gameProgress.levels[4].subLevels.findIndex(completed => !completed) + 1;
        showPage(`sublevel${nextSublevel}-page`);
      };
    }
  } else if (level < 5) {
    // 普通关卡
    nextLevelBtn.textContent = '进入下一关';
    nextLevelBtn.onclick = () => {
      levelCompleteModal.classList.remove('active');
      showPage(`level${level + 1}-page`);
    };
  } else {
    // 最后一关
    nextLevelBtn.textContent = '查看结果';
    nextLevelBtn.onclick = () => {
      levelCompleteModal.classList.remove('active');
      showResultPage();
    };
  }
  
  // 显示弹窗
  levelCompleteModal.classList.add('active');
}

// 显示结果页面
function showResultPage() {
  // 更新结果显示
  document.getElementById('total-score').textContent = gameProgress.totalScore;
  
  for (let i = 1; i <= 5; i++) {
    const levelScore = gameProgress.levels[i].score;
    const totalQuestions = i === 4 ? 6 : 6; // 每个关卡6题
    document.getElementById(`result-level${i}`).textContent = `${levelScore}/${totalQuestions}`;
  }
  
  // 设置鼓励语
  const encouragement = document.getElementById('encouragement');
  const totalPercentage = Math.round((gameProgress.totalScore / 30) * 100); // 5个关卡，每个6题，共30题
  
  let encouragementText = '';
  if (totalPercentage >= 90) {
    encouragementText = '太棒了！你是英语单词小达人！所有身体部位的单词都难不倒你！';
  } else if (totalPercentage >= 70) {
    encouragementText = '做得很好！你已经掌握了大部分身体部位的单词，继续加油！';
  } else if (totalPercentage >= 50) {
    encouragementText = '不错的尝试！再多练习一下，你会做得更好的！';
  } else {
    encouragementText = '继续努力！英语学习需要多加练习，相信你会进步的！';
  }
  
  encouragement.textContent = encouragementText;
  
  // 绑定重新开始按钮
  document.getElementById('restart-game-btn').onclick = function() {
    restartGame();
  };
  
  // 显示结果页面
  showPage('result-page');
}

// 重新开始游戏
function restartGame() {
  // 重置游戏进度
  gameProgress = {
    currentLevel: 0,
    levels: {
      1: { completed: false, score: 0 },
      2: { completed: false, score: 0 },
      3: { completed: false, score: 0 },
      4: { completed: false, score: 0, subLevels: [false, false, false, false] },
      5: { completed: false, score: 0 }
    },
    totalScore: 0
  };
  
  // 保存游戏进度
  saveGameProgress();
  
  // 更新关卡状态显示
  updateLevelStatus();
  
  // 返回首页
  showPage('home-page');
}

// 显示反馈弹窗
function showFeedback(isCorrect, message) {
  const feedbackModal = document.getElementById('feedback-modal');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackMessage = document.getElementById('feedback-message');
  
  // 设置图标和消息
  feedbackIcon.className = `feedback-icon ${isCorrect ? 'correct' : 'wrong'}`;
  feedbackIcon.innerHTML = isCorrect ? '<i class="fa fa-check-circle"></i>' : '<i class="fa fa-times-circle"></i>';
  feedbackMessage.textContent = message;
  
  // 显示弹窗
  feedbackModal.classList.add('active');
}

// 关闭弹窗
function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
}

// 移除已选字母
function removeSelectedLetter(letter) {
  // 从已选字母中移除
  const selectedLetters = document.getElementById('selected-letters');
  const selectedLetterElements = selectedLetters.querySelectorAll('.selected-letter');
  
  for (let i = 0; i < selectedLetterElements.length; i++) {
    if (selectedLetterElements[i].dataset.letter === letter) {
      selectedLetterElements[i].remove();
      break;
    }
  }
  
  // 从字母矩阵中取消选择
  const letterMatrix = document.getElementById('letter-matrix');
  const letterTiles = letterMatrix.querySelectorAll('.letter-tile');
  
  for (let i = 0; i < letterTiles.length; i++) {
    if (letterTiles[i].textContent === letter && letterTiles[i].classList.contains('selected')) {
      letterTiles[i].classList.remove('selected');
      break;
    }
  }
}

// 重置关卡4.1（字母中识别单词）
function resetSublevel1() {
  const letterMatrix = document.getElementById('letter-matrix');
  const selectedLetters = document.getElementById('selected-letters');
  
  // 取消所有字母的选择状态
  letterMatrix.querySelectorAll('.letter-tile.selected').forEach(tile => {
    tile.classList.remove('selected');
  });
  
  // 清空已选字母
  selectedLetters.innerHTML = '';
}

// 重置关卡4.2（乱序字母排序）
function resetSublevel2() {
  const wordSlots = document.getElementById('word-slots');
  
  // 清空所有字母槽
  wordSlots.querySelectorAll('.word-slot').forEach(slot => {
    slot.textContent = '';
    slot.classList.remove('filled');
    delete slot.dataset.letter;
  });
}

// 重置关卡4.3（填写缺字母）
function resetSublevel3() {
  const wordWithBlanks = document.getElementById('word-with-blanks');
  const letterOptions = document.getElementById('letter-options');
  
  // 清空所有空白位置
  wordWithBlanks.querySelectorAll('.word-blank').forEach(blank => {
    blank.textContent = '';
  });
  
  // 取消所有字母选项的选择状态
  letterOptions.querySelectorAll('.option-letter.selected').forEach(option => {
    option.classList.remove('selected');
  });
}

// 计算总分
function calculateTotalScore() {
  gameProgress.totalScore = 0;
  
  for (let i = 1; i <= 5; i++) {
    gameProgress.totalScore += gameProgress.levels[i].score;
  }
}

// 保存游戏进度
function saveGameProgress() {
  localStorage.setItem('bodyPartsGameProgress', JSON.stringify(gameProgress));
}

// 加载游戏进度
function loadGameProgress() {
  const savedProgress = localStorage.getItem('bodyPartsGameProgress');
  
  if (savedProgress) {
    gameProgress = JSON.parse(savedProgress);
  }
}

// 从数组中随机选择指定数量的元素
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 生成指定数量的随机字母
function getRandomLetters(count) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const result = [];
  
  for (let i = 0; i < count; i++) {
    result.push(letters.charAt(Math.floor(Math.random() * letters.length)));
  }
  
  return result;
}

// 绑定关卡导航点击事件
document.addEventListener('DOMContentLoaded', function() {
  // 关卡卡片点击事件
  document.querySelectorAll('.level-card').forEach(card => {
    card.addEventListener('click', function() {
      const level = parseInt(this.dataset.level);
      
      // 检查关卡是否可进入
      if (level === 1 || gameProgress.levels[level - 1].completed) {
        if (level === 4) {
          // 拼写检测关卡，显示子关卡列表
          showPage('level4-page');
        } else {
          // 其他关卡，直接进入
          showPage(`level${level}-page`);
        }
      } else {
        showFeedback(false, '请先完成前面的关卡！');
      }
    });
  });
  
  // 子关卡卡片点击事件
  document.addEventListener('click', function(e) {
    const sublevelCard = e.target.closest('.sublevel-card');
    
    if (sublevelCard) {
      const sublevel = parseInt(sublevelCard.dataset.sublevel);
      
      // 检查子关卡是否可进入
      if (sublevel === 1 || gameProgress.levels[4].subLevels[sublevel - 2]) {
        showPage(`sublevel${sublevel}-page`);
      } else {
        showFeedback(false, '请先完成前面的子关卡！');
      }
    }
  });
});
