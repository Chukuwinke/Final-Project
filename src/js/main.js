import { LoginAuth } from "./loginAuth";
//import axios from "axios";
var app = {};


// axios({
//     method: 'POST',
//     url: 'https://ajax.test-danit.com/api/v2/cards/login',
//     data: {
//         email: 'rittnerodigwe@gmail.com',
//         password: 'privatewd'
//     },
//     headers: {
//         'Content-Type': 'application/json'
//       },
// })
// .then(Response => console.log(Response))

const api = new LoginAuth()

api.getToken().then(response => console.log(response))