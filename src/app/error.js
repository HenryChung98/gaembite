"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>oops... Our servers are too busy right now 💥</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
}
