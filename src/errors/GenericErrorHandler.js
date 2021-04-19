function genericErrorHandler(err, req, res, next) {
  res.status(500);
  res.render('errorHandler', { error: err });
}
export default { genericErrorHandler };
