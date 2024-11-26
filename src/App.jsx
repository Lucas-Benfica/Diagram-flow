import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CustomNode from "./CustomNode";
import { initialTree, treeRootId } from "./initialElements";
import { layoutElements } from "./layout-elements";
import styled from "styled-components";
import CustomNodeRed from "./CustomNodeRed";
import useWorkflow from "./hooks/useWorkflow";

const LayoutFlow = () => {
  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
      red: CustomNodeRed,
    }),
    []
  );

  const { actionsFlow, setActionsFlow } = useWorkflow();

  useEffect(() => {
    if (actionsFlow.length == 0) {
      setActionsFlow(initialTree);
    } else {
      setTree(actionsFlow);
    }
  }, [actionsFlow]);
  useEffect(() => {
    console.log("actionsFlow mudou");
    console.log(actionsFlow);
  }, [actionsFlow]);

  const [tree, setTree] = useState(initialTree);
  const [directionTree, setDirectionTree] = useState("TB");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Recalcula os nós e arestas sempre que o `tree` mudar
    const { nodes: updatedNodes, edges: updatedEdges } = layoutElements(
      tree,
      treeRootId,
      directionTree
    );
    //console.log(updatedNodes);
    //console.log(updatedEdges);
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, [tree]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
        tree,
        treeRootId,
        direction
      );

      setDirectionTree(direction);
      console.log(direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <ContainerFlow>
      <TestDiv>
        <StyledReactFlow
          colorMode="light"
          //colorMode="dark"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          //onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          nodeTypes={nodeTypes}
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Panel position="top-left">
            <button onClick={() => onLayout("TB")}>vertical layout</button>
            <button onClick={() => onLayout("LR")}>horizontal layout</button>
          </Panel>
          <Panel position="top-right">
            <button
              style={{ backgroundColor: "#34f00a" }}
              onClick={() => console.log(nodes, edges)}
            >
              Save
            </button>
          </Panel>
          <Background />
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            nodeColor={"#5f5e5e"}
            maskColor={"rgb(220, 220, 220, 0.6)"}
            offsetScale={"5"}
          />
          <Controls />
        </StyledReactFlow>
      </TestDiv>
    </ContainerFlow>
  );
};

export default LayoutFlow;

const ContainerFlow = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestDiv = styled.div`
  width: 70%;
  height: 70%;
`;

const StyledReactFlow = styled(ReactFlow)`
  /* Custom Variables */
  --xy-theme-selected: #2e5885; // #f57dbd;
  --xy-theme-hover: #c5c5c5;
  --xy-theme-edge-hover: black;
  --xy-theme-color-focus: #e8e8e8;

  /* Built-in Variables */
  --xy-node-border-default: 1px solid #ededed;

  --xy-node-boxshadow-default: 0px 3.54px 4.55px 0px #00000005,
    0px 3.54px 4.55px 0px #0000000d, 0px 0.51px 1.01px 0px #0000001a;

  --xy-node-border-radius-default: 8px;

  --xy-handle-background-color-default: #ffffff;
  --xy-handle-border-color-default: #aaaaaa;

  --xy-edge-label-color-default: #505050;

  /* Dark Theme */
  &.dark {
    --xy-node-boxshadow-default: 0px 3.54px 4.55px 0px rgba(255, 255, 255, 0.05),
      0px 3.54px 4.55px 0px rgba(255, 255, 255, 0.13),
      0px 0.51px 1.01px 0px rgba(255, 255, 255, 0.2);
    --xy-theme-color-focus: #535353;
  }

  /* Node Styles */
  .react-flow__node {
    box-shadow: var(--xy-node-boxshadow-default);
    border-radius: var(--xy-node-border-radius-default);
    background-color: var(--xy-node-background-color-default);
    border: var(--xy-node-border-default);
    color: var(--xy-node-color, var(--xy-node-color-default));
    width: 200px;
    height: 100px;

    &.selectable:focus {
      box-shadow: 0px 0px 0px 4px var(--xy-theme-color-focus);
      border-color: #d9d9d9;
    }

    &.selectable:focus:active {
      box-shadow: var(--xy-node-boxshadow-default);
    }
    &.selectable:hover,
    &.draggable:hover {
      border-color: var(--xy-theme-hover);
    }

    &.selectable:hover,
    &.draggable:hover {
      border-color: var(--xy-theme-hover);
    }

    &.selectable.selected {
      border-color: var(--xy-theme-selected);
      box-shadow: var(--xy-node-boxshadow-default);
    }

    // Estilos internos
    .cause {
      height: 100%;
      padding: 8px 0;
      > div {
        width: 5px;
        height: 100%;
        border-radius: 0 8px 8px 0;
        background-color: #303b46;
      }
      .error {
        background-color: #be0303;
      }
      .success {
        background-color: #06b003;
      }
      .always {
        background-color: #303b46;
      }
    }
    .obj {
      width: 100%;
      height: 100%;
      display: flex;
    }
    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      padding: 0 5px;
      overflow: hidden;
      font-family: "Roboto", serif;
      .text {
        display: flex;
        gap: 5px;
        align-items: center;
      }
      h1 {
        font-size: 11px;
        font-weight: 400;
        color: #707070;
      }
      h2 {
        width: 100%;
        font-size: 12px;
        font-weight: 500;
        color: #000000;
        padding-right: 5px;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .buttons {
      width: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 3px 0;
      button {
        height: 22px;
        width: 22px;
        font-size: 10px;
        text-align: center;
        border-radius: 50px;
        svg {
          font-size: 12px;
        }
      }
    }
  }

  /* Edge Styles */
  .react-flow__edge.selectable:hover .react-flow__edge-path,
  .react-flow__edge.selectable.selected .react-flow__edge-path {
    stroke: var(--xy-theme-edge-hover);
  }

  /* Bolinhas de ligação */
  .react-flow__handle {
    background-color: var(--xy-handle-background-color-default);

    &.connectionindicator:hover {
      pointer-events: all;
      border-color: var(--xy-theme-edge-hover);
      background-color: white;
    }

    &.connectionindicator:focus,
    &.connectingfrom,
    &.connectingto {
      border-color: var(--xy-theme-edge-hover);
    }
  }

  /* MiniMap Styles */
  .react-flow__minimap {
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .react-flow__minimap-node {
      fill: #aaa;
      stroke: #484747;
      stroke-width: 2px;
    }
  }

  /* Controls Styles */
  .react-flow__controls {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    button {
      background-color: transparent;
      border: none;
      color: #555;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: var(--xy-theme-hover);
      }

      &:focus {
        outline: none;
        color: var(--xy-theme-selected);
      }
    }
  }
`;
