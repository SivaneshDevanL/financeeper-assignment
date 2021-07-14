const mongoose = require('mongoose');
const port = 3001
const app = require('./app');
mongoose.connect('mongodb://localhost:27017/MERN', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false });

mongoose.connection
.once('open', () => {
    console.log('connectionEstablished')
})
.on('connectionError', (err) => {
    console.log(err);
})

app.listen(port);