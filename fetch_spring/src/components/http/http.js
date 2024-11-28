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

export const getLoginUserInfo = async () => {
  const jwt = sessionStorage.getItem("token");

  const myInfoUrl = "http://localhost:8080/api/v1/myinfo";

  const response = await fetch(myInfoUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  const myInfoJson = await response.json();
  return myInfoJson;
};

export const getArticleList = async (pageNo) => {
  const jwt = sessionStorage.getItem("token");
  const articleListUrl = `http://localhost:8080/api/v1/board/list?pageNo=${pageNo}`;

  let fetchOption = {
    method: "get",
  };

  if (jwt) {
    fetchOption.headers = {
      Authorization: jwt,
    };
  }

  const response = await fetch(articleListUrl, fetchOption);
  const articleListJson = await response.json();

  if (articleListJson.error && articleListJson.message) {
    throw Error(articleListJson.message);
  }

  return articleListJson;
};

export const getArticleOne = async (id) => {
  const articleOneUrl = `http://localhost:8080/api/v1/board/view/${id}`;
  const jwt = sessionStorage.getItem("token");

  const response = await fetch(articleOneUrl, {
    method: "get",
    headers: {
      Authorization: jwt,
    },
  });

  const articleOneJson = await response.json();
  return articleOneJson;
};

export const postArticle = async (subject, content) => {
  const postArticleUrl = "http://localhost:8080/api/v1/board/write";
  const jwt = sessionStorage.getItem("token");

  let fetchOption = {
    method: "post",
    body: JSON.stringify({ subject, content }),
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
  };

  const response = await fetch(postArticleUrl, fetchOption);
  const articlePostJson = await response.json();
  console.log("articlePostJson", articlePostJson);

  return articlePostJson;
};
