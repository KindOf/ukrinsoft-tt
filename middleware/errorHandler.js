module.exports = function errorHandler(err, req, res, next) {
  const error = {
    message: err.message || 'Internal Server Error.',
    stack: err.stack
  };

  if (err.errors) {
    error.errors = {};
    const { errors } = err;
    for (const type in errors) {
      if (type in errors) {
        error.errors[type] = errors[type].message;
      }
    }
  }

  res.status(err.status || err.response.status || 500).json(error);
}
