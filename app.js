const express = require('express')
const app = express()
const index = require ('./routers/index.js')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

app.use("/", index);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

module.exports = app;
