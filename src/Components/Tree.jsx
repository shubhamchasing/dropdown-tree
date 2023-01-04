import { useState } from "react";

const Tree = (props) => {
    
  return (
    <div className="container">
      <ul className="tree">
        {props.treeData.map((node) => {
          return <TreeNode node={node} key={node.key} handleOnChange={props.handleOnChange}/>;
        })}
      </ul>
    </div>
  );
};

const TreeNode = (props) => {
  const [childVisible, setChildVisiblity] = useState(false)

  const hasChild = props.node.children ? true : false;
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
          checked={props.node.isChecked}
          onChange={(e) => {
            props.handleOnChange(props.node.key, !props.node.isChecked)
          }}
        />
        <div>{props.node.title}</div>
      </div>

      {hasChild && childVisible && (
        <ul className="tree">
          <Tree treeData={props.node.children} handleOnChange={props.handleOnChange}/>
        </ul>
      )}
    </li>
  );
};

export default Tree;
