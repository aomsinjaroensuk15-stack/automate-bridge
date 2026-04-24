const express = require('express');
const app = express();
app.use(express.json());

let menuRequest = "WAIT"; // สถานะเริ่มต้น

// 1. สำหรับรับ Webhook จาก LINE
app.post('/webhook', (req, res) => {
    const events = req.body.events;
    for (let event of events) {
        if (event.type === 'message' && event.message.text === '#Menu') {
            menuRequest = "SEND"; // จดไว้ว่ามีคนสั่งเมนู
        }
    }
    res.sendStatus(200);
});

// 2. สำหรับให้ Automate (บล็อก 2) มาดึงข้อมูล (GET)
app.get('/check', (req, res) => {
    res.send(menuRequest); 
    menuRequest = "WAIT"; // ส่งเสร็จแล้วรีเซ็ตทันทีเพื่อไม่ให้ส่งซ้ำ
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bridge is running on port ${PORT}`));
