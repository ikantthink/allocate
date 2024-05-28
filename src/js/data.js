export async function GET(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url);
        resolve(await response.json());
      } catch (err) {
        reject(err);
      }
    });
  }
  
  export async function POST(url, payload, token, access = null) {
    return new Promise(async (resolve, reject) => {
      const headers = {
        //'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      if (access) {
        headers.access = `${access}`;
      }
      try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: headers,
          body: JSON.stringify(payload),
        });
  
        resolve(await response.json());
      } catch (err) {
        reject(err);
      }
    });
  }
  
  export async function UPLOAD(url, data) {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
  
      for (const name in data) {
        formData.append(name, data[name]);
      }
  
      try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: formData,
        });
        resolve(await response.json());
      } catch (err) {
        reject(err);
      }
    });
  }