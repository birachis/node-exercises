import { fetchData } from "./fetcher.js";

async function main() {
  const result = await fetchData({
    url: "https://jsonplaceholder.typicode.com/posts/1",
    method: "GET",
    timeout: 1000,
    retries: 3,
  });

  if (result.success) {
    console.log("Data:", result.data);
  } else {
    console.error("Error:", result.error);
  }
}

main();