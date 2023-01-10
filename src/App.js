import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import Tree from "./Components/Tree";
import { useState } from "react";

const treeData = [
  {
    title: "0-0",
    key: "0-0",
    isChecked: false,
    isIndeterminate: false,
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",

        isChecked: false,
        isIndeterminate: false,
        children: [
          {
            title: "0-0-0-0",
            key: "0-0-0-0",
            isChecked: false,
            isIndeterminate: false,
            children: [
              {
                title: "0-0-0-0-0",
                key: "0-0-0-0-0",
                isChecked: false,
                isIndeterminate: false,
              },
              {
                title: "0-0-0-0-1",
                key: "0-0-0-0-1",
                isChecked: false,
                isIndeterminate: false,
              },
              {
                title: "0-0-0-0-2",
                key: "0-0-0-0-2",
                isChecked: false,
                isIndeterminate: false,
              },
            ],
          },
          {
            title: "0-0-0-1",
            key: "0-0-0-1",
            isChecked: false,
            isIndeterminate: false,
          },
          {
            title: "0-0-0-2",
            key: "0-0-0-2",
            isChecked: false,
            isIndeterminate: false,
          },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",

        isChecked: false,
        isIndeterminate: false,
        children: [
          {
            title: "0-0-1-0",
            key: "0-0-1-0",
            isChecked: false,
            isIndeterminate: false,
          },
          {
            title: "0-0-1-1",
            key: "0-0-1-1",
            isChecked: false,
            isIndeterminate: false,
          },
          {
            title: "0-0-1-2",
            key: "0-0-1-2",
            isChecked: false,
            isIndeterminate: false,
          },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
        isChecked: false,
        isIndeterminate: false,
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    isChecked: true,
    isIndeterminate: false,
  },
];

function App() {
  const [data, setData] = useState(treeData);

  const evaluation = (data) => {
    let numberOfChildren = 0;
    let numberOfTrueValues1 = 0;
    let numberOfTrueValues2 = 0;
    let numberOfIndeterminateValues = 0;
    let indeterminate = false;
    data.forEach((each) => {
      if (each.children) {
        [numberOfTrueValues1, indeterminate] = evaluation(each.children);
        numberOfChildren = each.children.length;
        if (numberOfChildren === numberOfTrueValues1) {
          each.isChecked = true;
          each.isIndeterminate = false;
          numberOfTrueValues2 += 1;
        } else if (numberOfTrueValues1 === 0 && !indeterminate) {
          each.isChecked = false;
          each.isIndeterminate = false;
        } else {
          each.isChecked = false;
          each.isIndeterminate = true;
          numberOfIndeterminateValues += 1;
        }
      } else {
        if (each.isChecked) {
          numberOfTrueValues1 += 1;
          numberOfTrueValues2 += 1;
        }
      }
    });

    if (numberOfIndeterminateValues > 0) indeterminate = true;

    return [
      numberOfChildren === 0 ? numberOfTrueValues1 : numberOfTrueValues2,
      indeterminate,
    ];
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

// const evaluation = (data) => {
//   let numberOfChildren = 0;
//   let numberOfTrueValues1 = 0;
//   let numberOfTrueValues2 = 0;
//   // let indeterminate = false;
//   let numberOfIndeterminateValues = 0;
//   data.forEach((each) => {
//     if (each.children) {
//       [numberOfTrueValues1, numberOfIndeterminateValues] = evaluation(
//         each.children
//       );
//       //  console.log(indeterminate);
//       numberOfChildren = each.children.length;
//       // each.isIndeterminate = indeterminate;
//       // console.log(each.isIndeterminate);
//       if (numberOfChildren === numberOfTrueValues1) {
//         each.isChecked = true;
//         each.isIndeterminate = false;
//         numberOfTrueValues2 += 1;
//         //numberOfIndeterminateValues = 0
//       } else if (numberOfTrueValues1 === 0 ) {
//         each.isChecked = false;
//         each.isIndeterminate = false;
//         //numberOfIndeterminateValues = 0

//       } else {
//         each.isIndeterminate = true;
//         each.isChecked = false;
//         numberOfIndeterminateValues += 1;
//       }
//       // indeterminate = each.isIndeterminate;
//     } else {
//       if (each.isChecked) {
//         numberOfTrueValues1 += 1;
//         numberOfTrueValues2 += 1;
//       }
//     }
//   });

//   return [
//     numberOfChildren === 0 ? numberOfTrueValues1 : numberOfTrueValues2,
//     numberOfIndeterminateValues,
//   ];
// };
