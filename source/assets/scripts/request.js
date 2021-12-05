const SERVER_URL = 'https://cookez.click';

/**
 * Sends a POST request to the backend. Calls postFn after
 * the request has been successfully executed.
 * @param {JSON} msg message that encodes request type and data to send
 * @param {Function} postFn function that performs desired operation after
 *                          POST request
 */
function POST(msg, postFn) {
  fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(msg),
  })
    .then((response) => response.json())
    .then((data) => {
      // TODO: redirect to the login form here
      postFn();
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/**
 * Sends a GET request to the backend. Calls getFn(data) after
 * the request has been successfully executed.
 * @param {String} getReq contains values for GET request with the format
 *                        ({var}={varValue}&{var2}={varValue2}...)
 * @param {Function} getFn function that takes in data, performs desired operation
 */
function GET(getReq, getFn) {
  fetch(
    // need to encode with UTF-8 for special characters like ' '
    `${SERVER_URL}?${getReq}`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getFn(data);
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// EXPORTS
export { POST, GET };
