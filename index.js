// index.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const axios = require('axios');

// ✅ 環境變數方式讀取 Token & Secret
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    const events = req.body.events;

    // 🛡️ 防錯檢查：若沒有 events，直接回應 200
    if (!events) {
        return res.sendStatus(200);
    }

    for (let event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
            const replyToken = event.replyToken;
            const userMessage = event.message.text;

            // 回覆訊息給用戶
            try {
                await axios.post('https://api.line.me/v2/bot/message/reply', {
                    replyToken: replyToken,
                    messages: [
                        {
                            type: 'text',
                            text: '收到您的訊息了！內容是：' + userMessage
                        }
                    ]
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
                    }
                });
            } catch (error) {
                console.error('LINE 回覆錯誤：', error.response?.data || error.message);
            }
        }
    }

    // ✅ 一定要回傳 200，LINE 才會認為成功
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send('LINE Webhook Server 正在運作中');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});