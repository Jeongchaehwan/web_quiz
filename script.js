const quizData = [
    {
        question: "다음 중 바다에 접해 있는 도시는?",
        choices: ["서울", "대전", "광주", "부산"],
        answer: "부산"
    },
    {
        question: "애플의 창립자는?",
        choices: ["스티브 잡스", "빌 게이츠", "마크 저커버그", "일론 머스크"],
        answer: "스티브 잡스"
    },
    {
        question: "대한민국의 국화는?",
        choices: ["개나리", "무궁화", "진달래", "장미"],
        answer: "무궁화"
    },
    {
        question: "삼국시대에 존재하지 않았던 나라는?",
        choices: ["고구려", "백제", "신라", "고려"],
        answer: "고려"
    },
    {
        question: "세계에서 가장 큰 대륙은?",
        choices: ["아프리카", "유럽", "아시아", "남아메리카"],
        answer: "아시아"
    },
    {
        question: "다음 중 프로그래밍 언어가 아닌 것은?",
        choices: ["JavaScript", "Python", "HTML", "C++"],
        answer: "HTML"
    },
    {
        question: "1 킬로그램은 몇 그램?",
        choices: ["10g", "100g", "500g", "1000g"],
        answer: "1000g"
    },
    {
        question: "정채환이 하지 않는 운동은?",
        choices: ["리스트컬", "숄더프레스", "레그프레스", "데드리프트"],
        answer: "데드리프트"
    },
    {
        question: "다음 중 이두 운동이 아닌 것은?",
        choices: ["해머컬", "덤벨컬", "랫풀다운", "케이블푸쉬다운"],
        answer: "케이블푸쉬다운"
    },
    {
        question: "성낙준 교수님이 정채환에게 줄 성적은?",
        choices: ["C", "B", "A", "A+"],
        answer: "A+"
    },
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');
let selectedAnswers = {};

// 랜덤하게 5개의 문제를 선택
function getRandomQuestions(quizData, numQuestions) {
    const shuffled = quizData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

function loadQuiz() {
    const randomQuestions = getRandomQuestions(quizData, 5);
    randomQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        const questionText = document.createElement('h2');
        questionText.innerText = `${index + 1}. ${q.question}`;
        questionElement.appendChild(questionText);

        const choicesList = document.createElement('ul');
        choicesList.classList.add('choices');

        q.choices.forEach(choice => {
            const choiceItem = document.createElement('li');
            choiceItem.classList.add('choice');

            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = choice;
            input.addEventListener('change', () => {
                selectedAnswers[`question${index}`] = choice;
            });

            label.appendChild(input);
            label.appendChild(document.createTextNode(choice));
            choiceItem.appendChild(label);
            choicesList.appendChild(choiceItem);
        });

        questionElement.appendChild(choicesList);
        quizContainer.appendChild(questionElement);
    });
}

function calculateResult() {
    let score = 0;
    quizData.forEach((q, index) => {
        if (selectedAnswers[`question${index}`] === q.answer) {
            score++;
        }
    });
    return score;
}

submitButton.addEventListener('click', () => {
    const score = calculateResult();
    const percentage = (score / 5) * 100;
    resultContainer.innerText = `정답율: ${percentage}% (${score}/5)`;
});

// 퀴즈 로드
loadQuiz();
