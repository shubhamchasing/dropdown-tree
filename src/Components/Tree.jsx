import React, { Component } from "react";
import { useState } from "react";

const Tree = ({ treeData = [], handleOnChange }) => {
    console.log('dfgggg',treeData)
  return (
    <div className="container">
      <ul className="tree">
        {treeData.map((node) => {
          return <TreeNode node={node} key={node.key} handleOnChange = {handleOnChange} />;
        })}
      </ul>
    </div>
  );
};

const TreeNode = ({ node = {}, handleOnChange }) => {
  console.log('node',node)

  const [childVisible, setChildVisiblity] = useState(false);


  const hasChild = node.children ? true : false;
  return (
    
    <li className="tree-node">
      <div className="box">
        {hasChild && (
          <div onClick={(e) => setChildVisiblity(!childVisible)}>
            <i className={`arrow-${childVisible ? "down" : "right"}`} />
          </div>
        )}
        <input
          className="checkbox"
          type="checkbox"
          checked={node.isChecked}
          key = {node.key}
          onChange={(e) => {
            handleOnChange(node.key,node.isChecked);
          }}
        />
        <div>{node.title}</div>
      </div>

      {hasChild && childVisible && (
        <ul className="tree">
          <Tree treeData={node.children} handleOnChange = {handleOnChange}/>
        </ul>
      )}
    </li>
  );
};

export default Tree;



// import React, { Component } from "react";
// import { useState } from "react";

// const Tree = ({ treeData = [],parentCheck = false }) => {
    
//   return (
//     <div className="container">
//       <ul className="tree">
//         {treeData.map((node) => {
//           return <TreeNode node={node} key={node.key}  parentCheck={parentCheck}/>;
//         })}
//       </ul>
//     </div>
//   );
// };

// const TreeNode = ({ node = [] , parentCheck = false}) => {
//   const [isChecked, setIsChecked] = useState(false);

//   const [childVisible, setChildVisiblity] = useState(false);

//   const handleOnChange = () => {
//     setIsChecked((v) => !v)
//     console.log(parentCheck)
//   };

//   const hasChild = node.children ? true : false;
//   console.log("check");
  
//   return (
//     <li className="tree-node">
//       <div className="box">
//         {hasChild && (
//           <div onClick={(e) => setChildVisiblity(!childVisible)}>
//             <i className={`arrow-${childVisible ? "down" : "right"}`} />
//           </div>
//         )}
//         <input
//           className="checkbox"
//           type="checkbox"
//           checked={isChecked || parentCheck}
//           onChange={(e) => {
//             handleOnChange(e);
//           }}
//         />
//         <div>{node.title}</div>
//       </div>

//       {hasChild && childVisible && (
//         <ul className="tree">
//           <Tree treeData={node.children} parentCheck = {isChecked} />
//         </ul>
//       )}
//     </li>
//   );
// };

// export default Tree;
