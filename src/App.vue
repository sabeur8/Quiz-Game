<script setup>
import {ref, computed} from 'vue'

const questions = ref([
      {
        question: "What does RAG stand for in AI?",
        answer: 0,
        options: [
          "Retrieval-Augmented Generation",
          "Random Access Gateway",
          "Real-Time Algorithm Grouping"
        ],
        selected: null
      },
      {
        question: "What is the main purpose of RAG in AI systems?",
        answer: 1,
        options: [
          "To train models faster",
          "To improve responses by combining retrieval and generation",
          "To reduce the size of neural networks"
        ],
        selected: null
      },
      {
        question: "Which component in RAG fetches relevant data?",
        answer: 0,
        options: [
          "Retriever",
          "Generator",
          "Analyzer"
        ],
        selected: null
      }
    ]
)
const quizCompleted = ref(false)
const currentQuestion = ref(0)
let value = 0
const score = computed(() => {
  questions.value.map((question) =>{
    if  (question.selected !== null && question.answer === question.selected) {
      console.log('correct');
      value++
    }
  })
  return value
})

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const setAnswer = evt => {
  questions.value[currentQuestion.value].selected = evt.target.value
  evt.target.value = null
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length -1){
    currentQuestion.value ++
  }
  else{
    quizCompleted.value = true
  }
}
</script>


<template>
<main>
  <h1> The Quiz </h1>

  <section class = "quiz" v-if="!quizCompleted">
    <div class = "quiz-info">
      <span class = "question"> {{getCurrentQuestion.question}}</span>
      <span class = "score"> {{score}} / {{questions.length}}</span>
    </div>

    <div class = "options">
      <label
          v-for="(option, index) in getCurrentQuestion.options"
          :for="'option' + index"
          :class="`option ${
						getCurrentQuestion.selected === index
							? index === getCurrentQuestion.answer
								? 'correct'
								: 'wrong'
							: ''
					} ${
						getCurrentQuestion.selected !== null &&
						index !== getCurrentQuestion.selected
							? 'disabled'
							: ''
					}`">
        <input
            type="radio"
            :id="'option' + index"
            :name="getCurrentQuestion.index"
            :value="index"
            v-model="getCurrentQuestion.selected"
            :disabled="getCurrentQuestion.selected"
            @change="setAnswer"
        />
        <span>{{ option }}</span>
      </label>
    </div>

    <button
        @click="nextQuestion"
        :disabled = "!getCurrentQuestion.selected"
    >
      {{
        getCurrentQuestion.index === questions.length -1
            ? 'finish'
            : getCurrentQuestion.selected === null
                ? 'select an option'
                : 'Next Question'
      }}
    </button>
  </section>
  <section v-else>
    <h2> You have finished the Quiz</h2>
    <p> your score is {{score}} / {{questions.length}}</p>
  </section>
</main>
</template>



<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body {
  background-color: #271c36;
  color: #FFF;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100vh;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.quiz {
  background-color: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
}

.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quiz-info .question {
  color: #8F8F8F;
  font-size: 1.25rem;
}

.quiz-info .score {
  color: #FFF;
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}

.option {
  padding: 1rem;
  display: block;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  background-color: #2d213f;
}

.option.correct {
  background-color: #2cce7d;
}

.option.wrong {
  background-color: #ff5a5f;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

button:disabled {
  opacity: 0.5;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: #8F8F8F;
  font-size: 1.5rem;
  text-align: center;
}
</style>
