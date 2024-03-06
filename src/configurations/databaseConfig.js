const { connection } = require("./databaseConnection");

const handleQueryError = (res, code = null, reason = null, message = null) => {
  res.status(400).json({ error: "Failed to fetch data", code, reason, message });
};

const handleDatabaseQuery = (query, params, res, successCallback, errorCallback = handleQueryError) => {
  connection()
    .getConnection()
    .then((connection) => {
      connection
        .query(query, params)
        .then(([results, fields]) => {
          connection.release();
          successCallback(results, res);
        })
        .catch((error) => {
          console.log(error);
          connection.release();
          errorCallback(res, error.errno, error.code, error.sqlMessage);
        });
    })
    .catch((error) => {
      errorCallback(res);
    });
};

module.exports = {
  handleDatabaseQuery,
};
