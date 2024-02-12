module.exports = (err, req, res, next) => {
  try {
    let message = err.message || "Internal Server Error";
    let statusCode = err.statusCode || 500;
    const validationErrorItem = err.errors[0];

    if (validationErrorItem && validationErrorItem.path === "email") {
      message = `${validationErrorItem.message}: An account witht the email (${validationErrorItem.value}) exists.`;
    }
    res.status(statusCode).json({ error: message });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server Error, sorry an error has occured");
  }
};
