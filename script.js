document.addEventListener('DOMContentLoaded', () => {
   
    const questions = [
        {
            question: "¿Cuál es la capital de Ecuador?",
            options: ["Quito", "Guayaquil", "Cuenca", "Manta"],
            correctAnswer: "Quito"
        },
        {
            question: "¿Cuantas provincias tiene el Ecuador?",
            options: ["44", "24", "18", "62"],
            correctAnswer: "24"
        },
        {
            question: "¿Cuáles es la operaciones mas básicas en matemáticas?",
            options: ["Suma", "resta", "división" , "multiplicación"],
            correctAnswer: "Suma"
        },
        {
            question: "¿Cómo se llama la cadena montañosa principal que atraviesa Ecuador?",
            options: ["Montañas Rocosas", "Los Andes", "Montañas Atlas", "Los Alpes"],
            correctAnswer: "Los Andes"
        },
        {
            question: "¿Cuál es el volcán activo más alto de Ecuador?",
            options: ["Chimborazo", "Cotopaxi", "Pichincha", "Tungurahua"],
            correctAnswer: "Cotopaxi"
        }
    ];

    const quizContainer = document.getElementById('quiz');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn'); 
    const resultDisplay = document.getElementById('result-display');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const playAgainButton = document.getElementById('play-again-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null; 

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionTextElement.textContent = currentQuestion.question;
            optionsContainer.innerHTML = ''; 
            selectedOption = null; 

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-btn');
                button.addEventListener('click', () => selectAnswer(button, option, currentQuestion.correctAnswer));
                optionsContainer.appendChild(button);
            });

            nextButton.classList.remove('hidden'); 
            nextButton.textContent = "Siguiente Pregunta"; 
            if (currentQuestionIndex === questions.length - 1) {
                nextButton.textContent = "Finalizar Juego"; 
            }
        } else {
        
            showResults();
        }
    }

    function selectAnswer(button, selectedAnswer, correctAnswer) {
   
        if (selectedOption) {
            selectedOption.classList.remove('selected');
        }

        selectedOption = button;
        selectedOption.classList.add('selected');

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.add('dimmed'); // Add dimmed class
        });
        selectedOption.classList.remove('dimmed'); 

            if (selectedAnswer === correctAnswer) {
            selectedOption.classList.add('correct');
            score++;
        } else {
            selectedOption.classList.add('incorrect');
            
            document.querySelectorAll('.option-btn').forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                    btn.classList.remove('dimmed'); 
                }
            });
        }

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
    }

    function showResults() {
        quizContainer.classList.add('hidden');
        resultDisplay.classList.remove('hidden');
        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = questions.length;
    }

    function restartGame() {
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null; 
        resultDisplay.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        loadQuestion(); 
    }

    nextButton.addEventListener('click', () => {
        
        if (selectedOption) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            alert('Por favor, selecciona una opción antes de continuar.');
        }
    });

    playAgainButton.addEventListener('click', restartGame);
  
    loadQuestion();
});