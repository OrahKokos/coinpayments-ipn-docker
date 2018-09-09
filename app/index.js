const
  express = require(`express`),
  bodyParser = require(`body-parser`);

const { verify } = require(`coinpayments-ipn`);
const CoinpaymentsIPNError = require(`coinpayments-ipn/lib/error`);

const {
  MERCHANT_ID,
  IPN_SECRET,
  PORT
} = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', function (req, res, next) {
  return res.end(`IPN Online`);
})

app.use('/notifications', function (req, res, next) {
  if(!req.get(`HMAC`) || !req.body || !req.body.ipn_mode || req.body.ipn_mode !== `hmac` || MERCHANT_ID !== req.body.merchant) {
    return next(new Error(`Invalid request`));
  }

  let isValid, error;

  try {
    isValid = verify(req.get(`HMAC`), IPN_SECRET, req.body);
  } catch (e) {
    error = e;
  }
  
  if (error && error instanceof CoinpaymentsIPNError) {
    return next(error);
  }
  
  if (!isValid) {
    return next(new Error(`Hmac calculation does not match`));
  }

  return next();
}, function (req, res, next) {
  console.log(`Process payment notification`);
  return next();
});

app.use(function (err, req, res, next) {
  console.log("Error handler", err);
})


app.listen(PORT, function () {
  console.log(`IPN listening on port ${PORT}`)
})