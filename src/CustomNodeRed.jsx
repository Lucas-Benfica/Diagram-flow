import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import styled from "styled-components";

const { Top, Bottom, Left, Right } = Position;

export default memo((props) => {
  const { data } = props;
  const { isSpouse, isSibling, label, direction } = data;

  const isTreeHorizontal = direction === "LR";

  const getTargetPosition = () => {
    if (isSpouse) {
      return isTreeHorizontal ? Top : Left;
    } else if (isSibling) {
      return isTreeHorizontal ? Bottom : Right;
    }
    return isTreeHorizontal ? Left : Top;
  };

  const isRootNode = data?.isRoot;
  const hasChildren = !!data?.children?.length;
  const hasSiblings = !!data?.siblings?.length;
  const hasSpouses = !!data?.spouses?.length;

  return (
    <TestDiv className="nodrag">
      {/* For children */}
      {hasChildren && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Right : Bottom}
          id={isTreeHorizontal ? Right : Bottom}
        />
      )}

      {/* For spouses */}
      {hasSpouses && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Bottom : Right}
          id={isTreeHorizontal ? Bottom : Right}
        />
      )}

      {/* For siblings */}
      {hasSiblings && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Top : Left}
          id={isTreeHorizontal ? Top : Left}
        />
      )}

      {/* Target Handle */}
      {!isRootNode && (
        <Handle
          type={"target"}
          position={getTargetPosition()}
          id={getTargetPosition()}
        />
      )}
      <button
        style={{ backgroundColor: "#34f00a" }}
        // Chamando o callback para adicionar um filho
      >
        Add Child
      </button>
    </TestDiv>
  );
});

const TestDiv = styled.div`
  //width: 100%;
  //height: 100%;
  border-radius: 8px;
  background-color: lightblue;
`;
