/**
 * async 함수는 반드시 promise 반환
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const login = async (email, password) => {
  const loginUrl = "http://localhost:8080/token";
  const response = await fetch(loginUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  console.log(response);

  const tokenJson = await response.json();
  console.log(tokenJson);

  return tokenJson;
};
