function genericErrorHandler(err, req, res, next) {
  res.json({
    Code: err.code || 400,
    Status: err.status || 'Bad Request',
    Message: err.message,
  });
  next(err);
}

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

export { genericErrorHandler, logErrors, clientErrorHandler, errorHandler };
