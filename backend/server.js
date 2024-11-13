require('dotenv').config();
const app = require('./app')
const dataSource = require('./data-source')

app.listen(3000 , ()=>{
    console.log('Server started')
    dataSource.initialize().then(()=>{
        console.log("Data Source has been initialized!");

    })  .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
})