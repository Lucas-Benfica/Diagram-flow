import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import styled from "styled-components";
import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import useWorkflow from "./hooks/useWorkflow";
import { v4 as uuidv4 } from "uuid";

const { Top, Bottom, Left, Right } = Position;

export default memo(({ data }) => {
  // Pegar informações e definir posições/configs
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
  //-----------------------------------------

  // Funções para Editar-Adicionar-Deletar
  const { actionsFlow, setActionsFlow } = useWorkflow();
  function editAction(id) {
    setActionsFlow((prevActionsFlow) => {
      // Cria uma cópia do estado original
      const updatedFlow = { ...prevActionsFlow };

      // Cria uma cópia do objeto individual para manter a imutabilidade
      updatedFlow[id] = {
        ...updatedFlow[id],
        data: {
          ...updatedFlow[id].data,
          action: `${updatedFlow[id].data.action}-edit`, // Atualiza a ação
        },
      };

      return updatedFlow; // Retorna o novo estado atualizado
    });
  }

  function addSubAction(id) {
    setActionsFlow((prevActionsFlow) => {
      // Cria uma cópia do estado original
      const updatedFlow = { ...prevActionsFlow };

      // Gera um ID único para o novo filho
      const newId = uuidv4();

      // Cria o novo objeto filho
      const newChild = {
        id: newId,
        name: "new-action",
        root: false,
        children: [],
        parent: id,
        data: {
          action: "new-action",
          host: "serviceX",
          group: "groupY",
        },
        cause: "success",
      };

      // Adiciona o novo objeto ao estado
      updatedFlow[newId] = newChild;

      // Atualiza o objeto pai, adicionando o ID do novo filho ao array `children`
      updatedFlow[id] = {
        ...updatedFlow[id],
        children: [...updatedFlow[id].children, newId],
      };

      // Retorna o estado atualizado
      return updatedFlow;
    });
  }

  function deleteAction(id) {
    setActionsFlow((prevActionsFlow) => {
      // Faz uma cópia do objeto original
      const updatedFlow = { ...prevActionsFlow };

      // Função recursiva para deletar os filhos e subfilhos
      const deleteRecursively = (currentId) => {
        const currentNode = updatedFlow[currentId];
        if (currentNode?.children?.length > 0) {
          currentNode.children.forEach(deleteRecursively); // Chama recursivamente para os filhos
        }
        delete updatedFlow[currentId]; // Remove o nó atual
      };

      // Inicia a remoção recursiva a partir do nó fornecido
      deleteRecursively(id);

      // Identifica o pai do nó removido
      const parentId = prevActionsFlow[id]?.parent;
      if (parentId && updatedFlow[parentId]?.children) {
        // Remove o ID do nó excluído da lista de filhos do pai
        updatedFlow[parentId].children = updatedFlow[parentId].children.filter(
          (childId) => childId !== id
        );
      }

      return updatedFlow; // Retorna o novo objeto atualizado
    });
  }

  //------------------------------

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
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => editAction(data.id)}
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Add SubAction"
            arrow
            placement="right"
            onClick={() => addSubAction(data.id)}
          >
            <IconButton aria-label="delete" size="small">
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow placement="right">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => deleteAction(data.id)}
            >
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
