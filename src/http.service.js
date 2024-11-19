export const postRequest = async (path, body) => {
  try {
    const response = await fetch(`${config.baseURL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(body);
    console.log(response.status);

    const data = await response.json();
    console.log(data);
    return { statusCode: response.status, data };
  } catch (error) {
    console.error(`Error in postRequest (${path}):`, error);
    return { statusCode: 500, data: "Internal Server Error" };
  }
};
