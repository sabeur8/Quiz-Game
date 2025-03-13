import {defineStore} from 'pinia'
import {ref} from "vue";

export const useAiResponseStore = defineStore('aiResponseStore', () => {

    const answer = ref('')
    const llmModel = "mistral:latest"
    const context = "You will get a question and its options you're role is to select the right one and just return it \n"
    const baseUrl = "http://127.0.0.1:8000/chat"

        async function  fetchAiResponse (question, options){
             const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_input: `${context}\n${question}\n${options}`,
                    llmModel: llmModel
                })
            });
            if (!response.ok){
                answer.value = ('erreur while fetching')
                throw new Error('Network response was not ok')
            }
            else {
                const data = await response.json()
                answer.value =  data.data
            }
            return answer.value
    }
    return{fetchAiResponse}
})