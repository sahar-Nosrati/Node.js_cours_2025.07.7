const whitList = [
  "http://google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Nor allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
