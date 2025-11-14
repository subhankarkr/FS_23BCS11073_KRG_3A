import React from "react";
import Counter from "./Counter";
import Form from "./Form";

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My React App</h1>
      
      <Counter />
      <Form />
    </div>
  );
}

export default App;
