module.exports = (message, errors = []) => {
  return {
    success: false,
    message,
    errors,
  }
}
