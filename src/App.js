import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tree from "./Components/Tree";
import { useState } from "react";

const treeData = [
  {
    title: "0-0",
    key: "0-0",
    isChecked: false,
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",

        isChecked: false,
        children: [
          { title: "0-0-0-0", key: "0-0-0-0", isChecked: false },
          { title: "0-0-0-1", key: "0-0-0-1", isChecked: false },
          { title: "0-0-0-2", key: "0-0-0-2", isChecked: false },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",

        isChecked: false,
        children: [
          { title: "0-0-1-0", key: "0-0-1-0", isChecked: false },
          { title: "0-0-1-1", key: "0-0-1-1", isChecked: false },
          { title: "0-0-1-2", key: "0-0-1-2", isChecked: false },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
        isChecked: false,
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    isChecked: true,
  },
];

function App() {
  const [data, setData] = useState(treeData);

  const handleOnChange = (key, value) => {
    const evaluate = (arr, key, value) => {
      console.log(key)
      const length = key.length;
      const newData = arr.map((curr) => {
        if (key === curr.key) {
          curr.isChecked = !value;
          if (Object.hasOwn(curr, "children")) {
            evaluate(curr.children, key, curr.isChecked);
          }
        } else if (curr.key.slice(0, length) === key) {
          curr.isChecked = value;
          if (Object.hasOwn(curr, "children")) {
            evaluate(curr.children, key, curr.isChecked);
          }
        } else if (Object.hasOwn(curr, "children") && key !== curr.key) {
          evaluate(curr.children, key, value);
        }
        return curr
      });
      return newData
    };

    setData(
      evaluate(data, key, value)
    );
  };

  return (
    <div className="App">
      <Tree treeData={data} handleOnChange = {handleOnChange}></Tree>
    </div>
  );
}

export default App;

// const newData = data.reduce((curr, acc) =>{
//   const currLevel = curr.key.split('-').length
//   const result = {}
//   if(currLevel === level) {
//      if(curr.key === key){
//        result = {...curr, isChecked : value}
//      }
//      else{
//       result  = {...curr}
//      }
//   }
//   else {
//     if (currLevel > level){

//     }

//   }

// },[])
