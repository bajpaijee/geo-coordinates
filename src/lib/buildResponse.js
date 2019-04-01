export function success(statusCode, payload) {
  return {
    statusCode,
    body: JSON.stringify(payload)
  };
}

export function failure(error) {
  /*eslint-disable */
  console.error(error);
  /*eslint-enable */
  return {
    statusCode: 500,
    body: JSON.stringify({
      success: false,
      message: "Something is wrong",
      error: error.message
    })
  };
}
