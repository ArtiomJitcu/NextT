const axios = require('axios');

class ChatGPTProvider {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = encodeURI('https://api.openai.com/v1/chat/completions');
    }

    async getResponse(prompt) {
        try {
            const response = await axios.post(
                this.apiUrl,
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: encodeURIComponent(prompt) }], // Кодирование строки
                    temperature: 0.7
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Ошибка запроса к ChatGPT:', error.response?.data || error.message);
            return 'Ошибка при обработке запроса.';
        }
    }
}

module.exports = ChatGPTProvider;
