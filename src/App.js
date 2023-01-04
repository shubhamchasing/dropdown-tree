import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './style.css';

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
          {
            title: "0-0-0-0",
            key: "0-0-0-0",
            isChecked: false,
            children: [
              { title: "0-0-0-0-0", key: "0-0-0-0-0", isChecked: false },
              { title: "0-0-0-0-1", key: "0-0-0-0-1", isChecked: false },
              { title: "0-0-0-0-2", key: "0-0-0-0-2", isChecked: false },
            ],
          },
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
          { title: "0-0-1-2", key: "0-0-1-2", isChecked: true },
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

  const evaluation = (data) => {
    let numberOfChildren = 0;
    let numberOfTrueValues1 = 0;
    let numberOfTrueValues2 = 0;
    data.forEach((each) => {
      if (each.children) {
        numberOfTrueValues1 = evaluation(each.children);
        numberOfChildren = each.children.length;
        if (numberOfChildren === numberOfTrueValues1) {
          each.isChecked = true;
          numberOfTrueValues2 += 1;
        } else {
          each.isChecked = false;
        }
      } else {
        if (each.isChecked) {
          numberOfTrueValues1 += 1;
          numberOfTrueValues2 += 1;
        }
      }
    });

    return numberOfChildren === 0 ? numberOfTrueValues1 : numberOfTrueValues2;
  };

  const changeDataValues = (value, currentData) => {
    if (currentData.children) {
      return {
        ...currentData,
        isChecked: value,
        children: currentData.children.map((each) =>
          changeDataValues(value, each)
        ),
      };
    } else {
      return { ...currentData, isChecked: value };
    }
  };

  const findKeyAndChangeData = (key, value, data) => {
    let updatedData = [...data];
    updatedData.forEach((each, index) => {
      if (each.key === key) {
        updatedData[index] = changeDataValues(value, each);
      } else {
        if (each.children && each.children.length > 0) {
          updatedData[index] = {
            ...each,
            children: findKeyAndChangeData(key, value, each.children),
          };
        }
      }
    });
    return updatedData;
  };

  const handleOnChange = (key, value) => {
    let updatedData = findKeyAndChangeData(key, value, data);
    evaluation(updatedData);
    setData(updatedData);
  };

  return (
    <div className="App">
      <Tree treeData={data} handleOnChange={handleOnChange}></Tree>
    </div>
  );
}

export default App;

// const reciprocate = (data) => {
//   let numberOfTrueValues = 0;
//         data.forEach((each) =>{
//           if(each.children){
//             evaluation(each.children)
//           }
//           else{
//              numberOfTrueValues += 1
//           }
//         })
//     return numberOfTrueValues
// };

// const evaluation = (data) => {
//   const updatedData = [...data]
//   let numberOfTrueValues = 0;
//   let numberOfChildren = 0
//   updatedData.forEach((each) => {
//     if(each.children) {
//          numberOfTrueValues = reciprocate(each.children)
//          numberOfChildren = each.children.length
//          if (numberOfChildren === numberOfTrueValues){
//           each.isChecked = true
//          }
//          else{
//           each.isChecked = false
//          }
//     }

//   });
//   return updatedData
// };
