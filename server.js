const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Kết nối tới MongoDB (thay đổi URL theo cấu hình của bạn)
mongoose.connect('mongodb://localhost:27017/tamvagiahuy', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Kiểm tra kết nối đến MongoDB
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Định nghĩa Schema cho Q-values
const qValuesSchema = new mongoose.Schema({
  values: Object,
});

const QValuesModel = mongoose.model('QValues', qValuesSchema);

// Middleware để xử lý dữ liệu JSON
app.use(bodyParser.json());

// Endpoint để load Q-values
app.get('/loadQValues', async (req, res) => {
  try {
    const result = await QValuesModel.findOne();
    if (result) {
      res.json({ success: true, values: result.values });
    } else {
      res.json({ success: true, values: {} });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Endpoint để save Q-values
app.post('/saveQValues', async (req, res) => {
  const receivedValues = req.body.values;

  if (receivedValues) {
    try {
      await QValuesModel.updateOne({}, { values: receivedValues }, { upsert: true });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  } else {
    res.json({ success: false, error: 'Invalid data' });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
