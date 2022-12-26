import React, { Component } from "react";
import { useState } from "react";

const Tree = ({ treeData = [] }) => {
    
  return (
    <div className="container">
      <ul className="tree">
        {treeData.map((node) => {
          return <TreeNode node={node} key={node.key} />;
        })}
      </ul>
    </div>
  );
};

const TreeNode = ({ node = [] }) => {
  const [isChecked, setIsChecked] = useState(false);

  const [childVisible, setChildVisiblity] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked)
  };

  const hasChild = node.children ? true : false;
  console.log("check");
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
          checked={isChecked}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <div>{node.title}</div>
      </div>

      {hasChild && childVisible && (
        <ul className="tree">
          <Tree treeData={node.children} />
        </ul>
      )}
    </li>
  );
};

export default Tree;
