const time = (req, res, next) => {
  req.date = new Date().toISOString();

  next();
};
module.exports = time;
