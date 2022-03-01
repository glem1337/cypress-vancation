const sleep = (duration = 400) => new Promise((resolve) => {
  setTimeout(() => resolve(duration), duration);
});

export default sleep;
