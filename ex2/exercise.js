// Simulate API call
function simulateApiCall(id) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 100;
    const shouldFail = Math.random() < 0.1;

    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Request ${id} failed`));
      } else {
        resolve({ id, data: `Result ${id}` });
      }
    }, delay);
  });
}

// 1. Sequential approach
async function sequentialRequests(count) {
  const start = Date.now();

  let success = 0;
  let failed = 0;

  for (let i = 1; i <= count; i++) {
    try {
      const result = await simulateApiCall(i);
      success++;
    } catch (err) {
      failed++;
    }
  }

  const end = Date.now();

  console.log(`Sequential: ${end - start}ms Successful: ${success}, Failed: ${failed}`);

  return end - start;
}

// 2. Parallel approach
async function parallelRequests(count) {
  const start = Date.now();

  let success = 0;
  let failed = 0;

  const promises = [];

  for (let i = 1; i <= count; i++) {
    const request = simulateApiCall(i)
      .then(() => {
        success++;
      })
      .catch((err) => {
        failed++;
      });

    promises.push(request);
  }

  await Promise.all(promises);

  const end = Date.now();

  console.log(`Parallel: ${end - start}ms Successful: ${success}, Failed: ${failed}`);
  return end - start;
}

// Run the comparison
(async () => {
  const totalRequests = 100;

  const sequentialTime = await sequentialRequests(totalRequests);
  const parallelTime = await parallelRequests(totalRequests);

  console.log(
    `Performance improvement: ${(sequentialTime / parallelTime).toFixed(2)}x faster`
  );
})();