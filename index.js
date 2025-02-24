require('dotenv').config(); // Подключаем dotenv

const TelegramBot = require('node-telegram-bot-api');
const ChatGPTProvider = require('./ChatGPTProvider');

const token = process.env.TELEGRAM_BOT_TOKEN;
const openAiKey = process.env.OPENAI_API_KEY;

const bot = new TelegramBot(token, { polling: true });
const chatGPT = new ChatGPTProvider(openAiKey);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        bot.sendMessage(chatId, 'Привет! Я бот 🤖 с поддержкой ChatGPT. Напиши мне что-нибудь!');
    } else {
        try {
            const response = await chatGPT.getResponse(text);
            bot.sendMessage(chatId, response);
        } catch (error) {
            console.error('Ошибка при запросе к ChatGPT:', error);
            bot.sendMessage(chatId, 'Извините, произошла ошибка. Попробуйте позже.');
        }
    }
});
