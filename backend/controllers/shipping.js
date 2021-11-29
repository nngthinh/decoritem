const { SSL_OP_ALL } = require("constants");
const https = require("https");
const url = require("url");

const ghnUrl = "dev-online-gateway.ghn.vn";
const TOKEN = "";
var options = {
  hostname: ghnUrl,
  port: 443,
  headers: {
    "Content-Type": "application/json",
    Token: TOKEN,
  },
};
const shop = {
  shop_id: 83403,
  district_id: 1452,
};

exports.shipping = (request, response, next) => {
  return response.status(201).json({
    message: "Hello WWorld",
  });
};

exports.getProvinces = (request, response, next) => {
  options.path = "/shiip/public-api/master-data/province";
  options.method = "GET";
  //Send the request and get the response
  const req = https.request(options, (res) => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("No more data in response.");
      var data = [];
      for (province of JSON.parse(body).data) {
        data.push({
          id: province.ProvinceID,
          name: province.ProvinceName,
        });
      }
      response.status(200).json({
        data: data,
      });
    });
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.end();
};

exports.getDistricts = (request, response, next) => {
  let { province_id } = request.query;
  options.path = `/shiip/public-api/master-data/district?province_id=${province_id}`;
  options.method = "GET";
  //Send the request and get the response
  const req = https.request(options, (res) => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("No more data in response.");
      var data = [];
      for (district of JSON.parse(body).data) {
        data.push({
          id: district.DistrictID,
          name: district.DistrictName,
        });
      }
      response.status(200).json({
        data: data,
      });
    });
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.end();
};

exports.getWards = (request, response, next) => {
  let { district_id } = request.query;
  options.path = `/shiip/public-api/master-data/ward?district_id=${district_id}`;
  options.method = "GET";
  //Send the request and get the response
  const req = https.request(options, (res) => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("No more data in response.");
      var data = [];
      var wards = JSON.parse(body).data;
      if (wards) {
        for (ward of wards) {
          data.push({
            ward_code: ward.WardCode,
            name: ward.WardName,
          });
        }
      }
      response.status(200).json({
        data: data,
      });
    });
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.end();
};

exports.getAvailableSevices = (request, response, next) => {
  let { to_district } = request.query;
  options.path = `/shiip/public-api/v2/shipping-order/available-services?shop_id=${shop.shop_id}&from_district=${shop.district_id}&to_district=${to_district}`;
  options.method = "GET";
  //Send the request and get the response
  const req = https.request(options, (res) => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("No more data in response.");
      var data = [];
      const services = JSON.parse(body).data;
      if (services) {
        for (service of services) {
          data.push(service);
        }
      }
      response.status(200).json({
        data: data,
      });
    });
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.end();
};

exports.getFee = (request, response, next) => {
  // let {
  //   service_type_id,
  //   insurance_value,
  //   to_ward_code,
  //   to_district_id,
  //   weight,
  //   length,
  //   width,
  //   height,
  // } = request.query
  let params = request.query
  params.from_district_id = shop.district_id
  params.shop_id = shop.shop_id
  const reqPath = new URLSearchParams(params);
  options.path = `/shiip/public-api/v2/shipping-order/fee?${reqPath.toString()}`;
  options.method = "GET";
  //Send the request and get the response
  const req = https.request(options, (res) => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("No more data in response.");
      response.status(200).json({
        data: JSON.parse(body).data.total,
      });
    });
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.end();
};

exports.createOrder = (request, response, next) => {
  // let {
  //   to_name,
  //   to_phone,
  //   to_address,
  //   to_ward_code,
  //   to_district_id,
  //   cod_amount
  //   weight,
  //   length,
  //   width,
  //   height,
  //   service_type_id,
  //   payment_type_id,
  //   Items
  // } = request.query;
  let params = request.body
  params.shop_id = shop.shop_id
  params.required_note = 'CHOXEMHANGKHONGTHU'

  const reqPath = new URLSearchParams({params});
  // options.path = `/shiip/public-api/v2/shipping-order/create?${reqPath.toString()}`;
  options.path = `/shiip/public-api/v2/shipping-order/create`;
  options.method = "POST";
  //Send the request and get the response
  const req = https.request(options, (res) => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("No more data in response.");
      console.log(body)
      response.status(200).send(JSON.parse(body).data)
    });
    res.on("error", (e) => {
      console.log(e.message)
    })
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.write(JSON.stringify(params))
  req.end();
};

exports.previewOrder = (request, response, next) => {
  // let {
  //   to_name,
  //   to_phone,
  //   to_address,
  //   to_ward_code,
  //   to_district_id,
  //   cod_amount
  //   weight,
  //   length,
  //   width,
  //   height,
  //   service_type_id,
  //   payment_type_id,
  //   Items
  // } = request.query;
  let params = request.body
  params.shop_id = shop.shop_id
  params.required_note = 'CHOXEMHANGKHONGTHU'

  const reqPath = new URLSearchParams({params});
  // options.path = `/shiip/public-api/v2/shipping-order/create?${reqPath.toString()}`;
  options.path = `/shiip/public-api/v2/shipping-order/preview`;
  options.method = "POST";
  //Send the request and get the response
  const req = https.request(options, (res) => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("No more data in response.");
      console.log(body)
      response.status(200).send(JSON.parse(body));
    });
    res.on("error", (e) => {
      console.log(e.message)
    })
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.write(JSON.stringify(params))
  req.end();
};

exports.getOrderDetail = (request, response, next) => {
  let {order_code} = request.query

  // options.path = `/shiip/public-api/v2/shipping-order/create?${reqPath.toString()}`;
  options.path = `/shiip/public-api/v2/shipping-order/detail?order_code=${order_code}`;
  options.method = "GET";
  //Send the request and get the response
  const req = https.request(options, (res) => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("No more data in response.");
      console.log(body)
      response.status(200).send(JSON.parse(body).data);
    });
    res.on("error", (e) => {
      console.log(e.message)
    })
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....");
  req.end();
};
