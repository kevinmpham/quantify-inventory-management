require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors(corsOptions))

app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root.js'))
app.use('/inventory', require('./routes/inventoryRoutes.js'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '/views/404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 not found')
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB')
  app.listen(PORT, () => console.log(`server ${PORT}`))
})

/* module.exports = server; */