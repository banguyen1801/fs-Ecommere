function genericErrorHandler(err, req, res, next) {
  res.json({
    Code: err.code,
    Status: err.status,
    Message: err.message,
  });
}
export { genericErrorHandler };
