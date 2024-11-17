require('dotenv').config();
const app = require('./app')
const dataSource = require('./config/database')


app.listen(3000, ()=>{
    console.log('Server started on port 3000');
    dataSource.authenticate().then(()=>{
        console.log('db authenticated successfully.');
    }).catch((err)=>{
        console.log(err);
    })

    dataSource.sync({})
        .then(() => {
            console.log('All tables have been created or updated');
        })
        .catch((err)=>{
            console.log(err.message);

        })
})