const ctx: Worker = self as any;

ctx.addEventListener("message", (event) => {
  for (let i = 0; i < 5000_000_000; i++) {
    i = i
  }
  postMessage("Worker done work!");
});

export default null as any;
