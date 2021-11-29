const Momo = require("../models/momomodel");

exports.listenMomo = async (req,res,next) => {
    console.log("Huy back")
    console.log(req.body)
    const momo = {
        orderId: req.body.orderId,
        info: req.body
    }
    // await Momo.create(momo);
    return res.status(200);
}

exports.statusMomo = async (req,res,next) => {
    let {orderId} = req.query.orderId
    const momoOrderInfo = await Momo.find(orderId);
    return res.status(200).json(momoOrderInfo);
}

exports.momo = (request,response,next) => {
let {amount,orderId, redirectUrl} = request.body

//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//parameters
var partnerCode = "MOMO6JAF20211116";
var accessKey = "wlWFJZKEBXIDoC0U";
var secretkey = "SQLf4VwD5ayRnRvES0fCSeJS5BHficQl";
var requestId = partnerCode + new Date().getTime();
if(!orderId) {
    orderId = requestId;
}
var orderInfo = "pay with MoMo";
// var redirectUrl = "https://momo.vn/return";
//var ipnUrl = "https://callback.url/notify";
// var ipnUrl = " http://a6a2-27-77-189-23.ngrok.io/momo/listenMomo";
var ipnUrl = "https://ecommerce-be-apis.herokuapp.com/momo/listenMomo";
// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
if (!amount) {
    amount = "50000";
}
var requestType = "captureWallet"
var extraData = ""; //pass empty value if your merchant does not have stores

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
//puts raw signature
console.log("--------------------RAW SIGNATURE----------------")
console.log(rawSignature)
//signature
const crypto = require('crypto');
var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');
console.log("--------------------SIGNATURE----------------")
console.log(signature)

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    accessKey : accessKey,
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    extraData : extraData,
    requestType : requestType,
    signature : signature,
    lang: 'en'
});
//Create the HTTPS objects
const https = require('https');
const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
    }
}
//Send the request and get the response
const req = https.request(options, res => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (body) => {
        console.log('Body: ');
        console.log(body);
        console.log('payUrl: ');
        console.log(JSON.parse(body).payUrl);
        let paypal = JSON.parse(body).payUrl
        response.status(200).json({
            // message: `Paypal link to charge here ${paypal}`
            payUrl: paypal
          })
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
})

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});
// write data to request body
console.log("Sending....")
req.write(requestBody);
req.end();
}