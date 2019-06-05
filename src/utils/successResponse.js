module.exports = (message, data = {}) => {
  return {
    success: true,
    message,
    data,
  }
}
