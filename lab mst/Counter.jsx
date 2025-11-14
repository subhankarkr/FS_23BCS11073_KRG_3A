import { useState } from "react";

function App() {
  let [counter, setCounter] = useState(0);

  function increment() {
    if (counter >= 10) {
      alert("Max limit reached, counter reset to 0");
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  }

  function decrement() {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  }

  function reset() {
    setCounter(0);
  }

  return (
  <div className=" flex items-center justify-center min-h-screen ">
  <div className="bg-white shadow-lg shadow-black-1000 rounded-2xl p-8 w-80 text-center">
  <h1 className="text-3xl font-bold mb-6 text-gray-800">Counter</h1>

  <div className="flex items-center justify-between mb-6">
  <button
  onClick={decrement}
  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
  >
  Decrement
  </button>

  <p className="text-2xl font-semibold text-gray-700">{counter}</p>

  <button onClick={increment} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
  Increment 
  </button>
  </div>

  <button onClick={reset}  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
    Reset </button>
  </div>
  </div>
  );
}

export default App;

