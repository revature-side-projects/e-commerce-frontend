import React,{useState} from "react";

// State to store count value

export function Quantity(props){
let [count, setCount] = useState(0);

if(count < 0){
    count = 0;
};

// Function to increment count by 1
const incrementCount = () => {
  // Update state with incremented value
  setCount(count + 1);
};

const decrementCount = () => {
    setCount(count -1);
};
return (
  <div className="app">
    <button className="qb" onClick={incrementCount}>+</button>
    {count}
    <button className="qb" onClick={decrementCount}>-</button>
    
  </div>
)
}