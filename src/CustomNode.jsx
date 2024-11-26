import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import styled from "styled-components";
import { Button, ButtonGroup, IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const { Top, Bottom, Left, Right } = Position;

export default memo(({ data }) => {
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

  return (
    <TestDiv>
      {hasChildren && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Right : Bottom}
          id={isTreeHorizontal ? Right : Bottom}
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
      <div className="cause">
        <div className={data.cause || ""}></div>
      </div>
      <div className="obj">
        <div className="info">
          <div className="text">
            <h1>Action:</h1>
            <h2>{data.data.action}</h2>
          </div>
          <div className="text">
            <h1>Host:</h1>
            <h2>{data.data.host}</h2>
          </div>
          <div className="text">
            <h1>Group:</h1>
            <h2>{data.data.group}</h2>
          </div>
        </div>
        <div className="buttons nodrag">
          <Tooltip title="Edit/Open" arrow placement="right">
            <IconButton aria-label="delete" size="small">
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add SubAction" arrow placement="right">
            <IconButton aria-label="delete" size="small">
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow placement="right">
            <IconButton aria-label="delete" size="small">
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </TestDiv>
  );
});

const TestDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 8px;
`;
