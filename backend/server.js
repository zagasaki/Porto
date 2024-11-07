const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);
app.use('/api', itemRoutes);
app.use('/api', cartRoutes);

app.get('/', (req, res) => {
  res.send('this is backend');
});

/*production environment
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
*/

//MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb+srv://bintang:123@cluster0.gzdfphf.mongodb.net/master", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result =>
    app.listen(PORT, () => {
      console.log(`Database connected \nServer running on port: ${PORT}`);
    })
  )
  .catch(err => console.log(err));
