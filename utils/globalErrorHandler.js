module.exports = (err, req, res, next) => {
  try {
    let message = err.message || "Internal Server Error";
    let statusCode = err.statusCode || 500;
    let validationErrorItem = err.errors ? err.errors[0] : null;

    if (validationErrorItem && validationErrorItem.path === "email") {
      message = `${validationErrorItem.message}: An account witht the email (${validationErrorItem.value}) exists.`;
    }

    if (message == "jwt expired") {
      message = "access token expired";
      statusCode = 401;
    };
    res.status(statusCode).json({ error: message });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server Error, sorry an error has occured");
  }
};
