<script setup>
  import {useAiResponseStore} from "@/stores/aiStore/aiResponseStore.js";
  import {ref} from "vue";

  const props  = defineProps(["Question"])
  const AiStore = useAiResponseStore()
  const aiResponse = ref('')

  async function getAiResponse(){
    aiResponse.value = await AiStore.fetchAiResponse(props.Question.question, props.Question.options)

  }

</script>

<template>
  <section>
    <div>
      <span> AI response </span>
      <button @click="getAiResponse"> Generate the Good Response</button>
    </div>
    <div>
      {{ aiResponse }}
    </div>
  </section>
</template>

<style scoped>

section {
  background-color: #3f3f5e; /* Lighter purple container */
  border-radius: 10px;
  padding: 20px;
  margin-top: 50px;
  width: 100%;
  max-width: 500px; /* Similar to the image width */
  color: #ffffff; /* White text */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
}

/* First div: Header with span and button */
section > div:first-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

section > div:first-child span {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase; /* Matches the bold style in the image */
}

section > div:first-child button {
  background-color: #28a745; /* Green button like "SELECT AN OPTION" */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

section > div:first-child button:hover {
  background-color: #218838; /* Darker green on hover */
}

/* Second div: AI answer content */
section > div:last-child {
  background-color: #2a2a44; /* Darker purple to match option boxes */
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.5;
}
</style>