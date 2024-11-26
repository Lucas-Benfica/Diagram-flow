import { Position } from "@xyflow/react";
import { layoutFromMap } from "entitree-flex";

const nodeWidth = 200;
const nodeHeight = 80;

const Orientation = {
  Vertical: "vertical",
  Horizontal: "horizontal",
};

const entitreeSettings = {
  clone: true, // returns a copy of the input, if your application does not allow editing the original object
  enableFlex: false, // has slightly better perfomance if turned off (node.width, node.height will not be read)
  firstDegreeSpacing: 100, // spacing in px between nodes belonging to the same source, eg children with same parent
  nextAfterAccessor: "spouses", // the side node prop used to go sideways, AFTER the current node
  nextAfterSpacing: 100, // the spacing of the "side" nodes AFTER the current node
  nextBeforeAccessor: "siblings", // the side node prop used to go sideways, BEFORE the current node
  nextBeforeSpacing: 100, // the spacing of the "side" nodes BEFORE the current node
  nodeHeight, // default node height in px
  nodeWidth, // default node width in px
  orientation: Orientation.Vertical, // "vertical" to see parents top and children bottom, "horizontal" to see parents left and
  rootX: 0, // set root position if other than 0
  rootY: 0, // set root position if other than 0
  secondDegreeSpacing: 100, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
  sourcesAccessor: "parents", // the prop used as the array of ancestors ids
  sourceTargetSpacing: 100, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
  targetsAccessor: "children", // the prop used as the array of children ids
};

const entitreeSettingsPtbr = {
  clone: true, // retorna uma cópia do objeto original, caso sua aplicação não permita a edição do objeto original
  enableFlex: false, // melhora um pouco o desempenho quando desativado (node.width, node.height não serão lidos)
  firstDegreeSpacing: 100, // espaçamento em px entre nós que pertencem à mesma origem, por exemplo, filhos com o mesmo pai
  nextAfterAccessor: "spouses", // a propriedade do nó lateral usada para ir para o lado, APÓS o nó atual
  nextAfterSpacing: 100, // o espaçamento dos nós "lateralmente" APÓS o nó atual
  nextBeforeAccessor: "siblings", // a propriedade do nó lateral usada para ir para o lado, ANTES do nó atual
  nextBeforeSpacing: 100, // o espaçamento dos nós "lateralmente" ANTES do nó atual
  nodeHeight, // altura padrão do nó em px
  nodeWidth, // largura padrão do nó em px
  orientation: Orientation.Vertical, // "vertical" para ver os pais em cima e filhos embaixo, "horizontal" para ver os pais à esquerda e filhos à direita
  rootX: 0, // define a posição da raiz caso seja diferente de 0
  rootY: 0, // define a posição da raiz caso seja diferente de 0
  secondDegreeSpacing: 100, // espaçamento em px entre nós que não pertencem ao mesmo pai, por exemplo, nós "primos"
  sourcesAccessor: "parents", // a propriedade usada como o array de ids dos ancestrais
  sourceTargetSpacing: 100, // o espaçamento "vertical" entre os nós na orientação vertical, horizontal de outra forma
  targetsAccessor: "children", // a propriedade usada como o array de ids dos filhos
};

const { Top, Bottom, Left, Right } = Position;

export const layoutElements = (tree, rootId, direction = "TB") => {
  const isTreeHorizontal = direction === "LR";

  const { nodes: entitreeNodes, rels: entitreeEdges } = layoutFromMap(
    rootId,
    tree,
    {
      ...entitreeSettings,
      orientation: isTreeHorizontal
        ? Orientation.Horizontal
        : Orientation.Vertical,
    }
  );

  const nodes = [],
    edges = [];

  entitreeEdges.forEach((edge) => {
    const sourceNode = edge.source.id;
    const targetNode = edge.target.id;

    const newEdge = {};

    newEdge.id = "e" + sourceNode + targetNode;
    newEdge.source = sourceNode;
    newEdge.target = targetNode;
    newEdge.type = "smoothstep"; // Tipo de linhas
    newEdge.animated = "true"; // Pontilhada animada
    //newEdge.label = "";

    // Check if target node is spouse or sibling
    const isTargetSpouse = !!edge.target.isSpouse;
    const isTargetSibling = !!edge.target.isSibling;

    if (isTargetSpouse) {
      newEdge.sourceHandle = isTreeHorizontal ? Bottom : Right;
      newEdge.targetHandle = isTreeHorizontal ? Top : Left;
    } else if (isTargetSibling) {
      newEdge.sourceHandle = isTreeHorizontal ? Top : Left;
      newEdge.targetHandle = isTreeHorizontal ? Bottom : Right;
    } else {
      newEdge.sourceHandle = isTreeHorizontal ? Right : Bottom;
      newEdge.targetHandle = isTreeHorizontal ? Left : Top;
    }

    edges.push(newEdge);
  });

  entitreeNodes.forEach((node) => {
    const newNode = {};

    const isSpouse = !!node?.isSpouse;
    const isSibling = !!node?.isSibling;
    const isRoot = node?.id === rootId;

    if (isSpouse) {
      newNode.sourcePosition = isTreeHorizontal ? Bottom : Right;
      newNode.targetPosition = isTreeHorizontal ? Top : Left;
    } else if (isSibling) {
      newNode.sourcePosition = isTreeHorizontal ? Top : Left;
      newNode.targetPosition = isTreeHorizontal ? Bottom : Right;
    } else {
      newNode.sourcePosition = isTreeHorizontal ? Right : Bottom;
      newNode.targetPosition = isTreeHorizontal ? Left : Top;
    }

    newNode.data = { label: node.name, direction, isRoot, ...node };
    newNode.id = node.id;
    newNode.type = "custom"; // Aqui configuramos o tipo

    newNode.width = nodeWidth;
    newNode.height = nodeHeight;

    newNode.position = {
      x: node.x,
      y: node.y,
    };

    nodes.push(newNode);
  });

  return { nodes, edges };
};
