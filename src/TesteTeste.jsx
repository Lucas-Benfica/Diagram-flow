import React, { memo } from "react"; // Importa React e memo (para otimização de renderização)
import { Handle, Position } from "@xyflow/react"; // Importa componentes e constantes necessários da biblioteca @xyflow/react

const { Top, Bottom, Left, Right } = Position; // Desestruturação para obter as posições Top, Bottom, Left, Right de uma constante Position

export default memo(({ data }) => {  // O componente é memoizado (impede re-renderizações desnecessárias) e recebe "data" como props
  const { isSpouse, isSibling, label, direction } = data;  // Desestruturação para acessar propriedades do nó: se é cônjuge, irmão, rótulo e direção da árvore
  
  const isTreeHorizontal = direction === "LR";  // Verifica se a árvore é horizontal (direção Left-Right)

  // Função para determinar a posição do "target" (conexão de entrada) dependendo se o nó é um cônjuge, irmão ou outro tipo de nó
  const getTargetPosition = () => {
    if (isSpouse) {
      return isTreeHorizontal ? Top : Left;  // Se for cônjuge, a posição será Top ou Left dependendo da direção
    } else if (isSibling) {
      return isTreeHorizontal ? Bottom : Right;  // Se for irmão, a posição será Bottom ou Right
    }
    return isTreeHorizontal ? Left : Top;  // Caso contrário, será Left ou Top
  };

  // Verifica se o nó é o nó raiz
  const isRootNode = data?.isRoot;
  // Verifica se o nó tem filhos
  const hasChildren = !!data?.children?.length;
  // Verifica se o nó tem irmãos
  const hasSiblings = !!data?.siblings?.length;
  // Verifica se o nó tem cônjuges
  const hasSpouses = !!data?.spouses?.length;

  return (
    <div className="nodrag">  {/* Contêiner principal do nó, a classe "nodrag" impede que o nó seja arrastado */}
      {/* Renderiza o Handle para filhos (caso o nó tenha filhos) */}
      {hasChildren && (
        <Handle
          type="source"  // "source" indica que este é o ponto de origem da conexão
          position={isTreeHorizontal ? Right : Bottom}  // A posição do Handle depende da direção da árvore
          id={isTreeHorizontal ? Right : Bottom}  // O id do Handle é igual à posição
        />
      )}

      {/* Renderiza o Handle para cônjuges (caso o nó tenha cônjuges) */}
      {hasSpouses && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Bottom : Right}
          id={isTreeHorizontal ? Bottom : Right}
        />
      )}

      {/* Renderiza o Handle para irmãos (caso o nó tenha irmãos) */}
      {hasSiblings && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Top : Left}
          id={isTreeHorizontal ? Top : Left}
        />
      )}

      {/* Renderiza o Handle de "target" (para entradas de conexões) caso o nó não seja a raiz */}
      {!isRootNode && (
        <Handle
          type={"target"}  // "target" indica que este é o ponto de destino da conexão
          position={getTargetPosition()}  // A posição é determinada pela função getTargetPosition()
          id={getTargetPosition()}  // O id é baseado na posição retornada
        />
      )}

      {/* Exibe o rótulo (label) do nó */}
      <div>{label}</div>
    </div>
  );
});
