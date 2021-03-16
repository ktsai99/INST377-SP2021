import { post } from "cypress/types/jquery";

function onLoad() {
    console.log('scipt loaded');
}

window.onload = onLoad;

app.route('/api')
    post(async(req,res) => {
        console.log('POST Request detected');
        console.log('Fpr, data in res.body', req.body);
        res.send("Hello Word");
    });