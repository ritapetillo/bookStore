const { REACT_APP_API } = process.env;

export const getAllBooks = async () => {
  try {
    const res = await fetch(`${REACT_APP_API}/books`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      console.log("there is an error with the response");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getCommentsByBook = async (asin) => {
  try {
    const res = await fetch(`${REACT_APP_API}/comments/book/${asin}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      console.log("there is an error with the response");
    }
  } catch (err) {
    console.log(err);
  }
};

export const postComment = async (body) => {
  console.log(body);
  try {
    const res = await fetch(`${REACT_APP_API}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      console.log("there is an error with the response");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (id) => {
  try {
    const res = await fetch(`${REACT_APP_API}/comments/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      console.log("there is an error with the response");
    }
  } catch (err) {
    console.log(err);
  }
};
