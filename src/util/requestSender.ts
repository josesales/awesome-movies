const baseUrl = `https://api.themoviedb.org/3/`;

export const get = async (route: string) => {
  try {
    const apiKeyParam = route.includes("?")
      ? `&api_key=${process.env.REACT_APP_API_KEY}`
      : `?api_key=${process.env.REACT_APP_API_KEY}`;
    const fullUrl = baseUrl + route + apiKeyParam;
    const res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resData = null;

    if (res.status !== 404) {
      resData = await res.json();
    }

    if (resData && resData.error) {
      throw new Error(resData.error);
    }

    return resData;
  } catch (error) {
    console.log(error);
  }
};

export const postPatch = async <T>(
  route: string,
  method = "POST",
  body: T,
  token: string | null = null,
  contentType = "application/json"
) => {
  try {
    const res = await fetch(baseUrl + route, {
      method,
      headers: {
        "Content-Type": contentType,
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: body ? JSON.stringify(body) : "",
    });

    let resData = await res.json();

    if (resData.error) {
      throw new Error(resData.error);
    }

    return resData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(`Unknown error during ${method}`);
    }
  }
};

export const remove = async (
  route: string,
  token = null,
  contentType = "application/json"
) => {
  try {
    const res = await fetch(baseUrl + route, {
      method: "DELETE",
      headers: {
        "Content-Type": contentType,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    let resData = await res.json();

    if (resData.error) {
      throw new Error(resData.error);
    }

    return resData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error during delete");
    }
  }
};

export const upload = async (
  route: string,
  file: File,
  id: string,
  token = null
) => {
  try {
    const form = new FormData();
    form.append("file", file);
    form.append("id", id);

    const res = await fetch(baseUrl + route, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: form,
    });

    if (res.status !== 200 && res.status !== 201) {
      let resData = await res.json();
      throw new Error(
        "Error during upload: " + route + ". Message: " + resData.error
      );
    }
  } catch (error) {
    console.log(error);
  }
};
