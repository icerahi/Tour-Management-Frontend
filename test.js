let saveResolve, saveReject;

const myPromise = new Promise((resolve, reject) => {
  saveResolve = resolve;
  saveReject = reject;
});

myPromise
  .then((value) => console.log("resolve:", value))
  .catch((err) => console.log("error", err));

// saveResolve("tututt");
saveReject("error");
