export const treeRootId = 1;
export const initialTree = {
  1: {
    id: "1",
    name: "root",
    type: "input",
    children: ["2", "3"],
  },
  2: {
    id: "2",
    name: "child2",
    children: ["4", "5"],
  },
  3: {
    id: "3",
    name: "child3",
    children: ["6"],
  },
  4: {
    id: "4",
    name: "child4",
    children: ["8", "9"],
  },
  5: {
    id: "5",
    name: "child5",
    children: [],
  },
  6: {
    id: "6",
    name: "child6",
    children: ["10"],
  },
  7: {
    id: "7",
    name: "child7",
    children: [],
  },
  8: {
    id: "8",
    name: "child8",
    children: ["11"],
  },
  9: {
    id: "9",
    name: "child9",
    children: [],
  },
  10: {
    id: "10",
    name: "child10",
    children: ["12", "13"],
  },
  11: {
    id: "11",
    name: "child11",
    surname: "Lucas",
    startCondition: true,
    children: [],
  },
  12: {
    id: "12",
    name: "child12",
    children: ["14"],
  },
  13: {
    id: "13",
    name: "child13",
    children: [],
  },
  14: {
    id: "14",
    name: "child14",
    children: ["15"],
  },
  15: {
    id: "15",
    name: "child15",
    children: [],
  },
  16: {
    id: "16",
    name: "child16",
    children: ["17"],
  },
  17: {
    id: "17",
    name: "child17",
    children: ["18"],
  },
  18: {
    id: "18",
    name: "child18",
    children: ["19"],
  },
  19: {
    id: "19",
    name: "child19",
    children: [],
  },
  20: {
    id: "20",
    name: "child20",
    children: ["21", "22"],
  },
  21: {
    id: "21",
    name: "child21",
    children: [],
  },
  22: {
    id: "22",
    name: "child22",
    children: [],
  },
  23: {
    id: "23",
    name: "child23",
    children: ["24"],
  },
  24: {
    id: "24",
    name: "child24",
    children: ["25", "26"],
  },
  25: {
    id: "25",
    name: "child25",
    children: [],
  },
  26: {
    id: "26",
    name: "child26",
    children: [],
  },
  27: {
    id: "27",
    name: "child27",
    children: ["28"],
  },
  28: {
    id: "28",
    name: "child28",
    children: ["29"],
  },
  29: {
    id: "29",
    name: "child29",
    children: ["30"],
  },
  30: {
    id: "30",
    name: "child30",
    children: [],
  },
};

/*
  aqui temos um objeto com irmaos e parceiros
  export const initialTree = {
  1: {
    id: "1",
    name: "root",
    type: "input",
    children: ["2", "3"],
    siblings: ["8"],
    spouses: ["10"],
  },
  2: { id: "2", name: "child2" },
  3: {
    id: "3",
    name: "child3",
    children: ["4", "5"],
    siblings: ["9"],
    spouses: ["6"],
  },
  4: { id: "4", name: "grandChild4" },
  5: { id: "5", name: "grandChild5" },
  6: { id: "6", name: "spouse of child 3", isSpouse: true },
  8: {
    id: "8",
    name: "root sibling",
    isSibling: true,
  },
  9: {
    id: "9",
    name: "child3 sibling",
    isSibling: true,
  },
  10: {
    id: "10",
    name: "root spouse",
    isSpouse: true,
  },
};
*/
