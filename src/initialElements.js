export const treeRootId = 1;

export const initialTree = {
  1: {
    id: "1",
    name: "root",
    root: true,
    children: ["2", "3"],
    parent: null, // Root não possui pai
    data: {
      action: "initialize",
      host: "system",
      group: "main",
    },
    cause: "always",
  },
  2: {
    id: "2",
    name: "child2",
    root: false,
    children: ["4", "5"],
    parent: "1", // Pai é o nó "1"
    data: {
      action: "process",
      host: "serviceA",
      group: "group1",
    },
    cause: "success",
  },
  3: {
    id: "3",
    name: "child3",
    root: false,
    children: ["6", "7"],
    parent: "1", // Pai é o nó "1"
    data: {
      action: "validate",
      host: "serviceB",
      group: "group2",
    },
    cause: "error",
  },
  4: {
    id: "4",
    name: "child4",
    root: false,
    children: ["8", "9"],
    parent: "2", // Pai é o nó "2"
    data: {
      action: "fetchData",
      host: "serviceC",
      group: "group1",
    },
    cause: "success",
  },
  5: {
    id: "5",
    name: "child5",
    root: false,
    children: [],
    parent: "2", // Pai é o nó "2"
    data: {
      action: "complete",
      host: "serviceD",
      group: "group1",
    },
    cause: "always",
  },
  6: {
    id: "6",
    name: "child6",
    root: false,
    children: ["10"],
    parent: "3", // Pai é o nó "3"
    data: {
      action: "update",
      host: "serviceE",
      group: "group2",
    },
    cause: "error",
  },
  7: {
    id: "7",
    name: "child7",
    root: false,
    children: [],
    parent: "3", // Pai é o nó "3"
    data: {
      action: "rollback",
      host: "serviceF",
      group: "group2",
    },
    cause: "success",
  },
  8: {
    id: "8",
    name: "child8",
    root: false,
    children: ["11"],
    parent: "4", // Pai é o nó "4"
    data: {
      action: "retry",
      host: "serviceG",
      group: "group1",
    },
    cause: "error",
  },
  9: {
    id: "9",
    name: "child9",
    root: false,
    children: [],
    parent: "4", // Pai é o nó "4"
    data: {
      action: "notify",
      host: "serviceH",
      group: "group1",
    },
    cause: "always",
  },
  10: {
    id: "10",
    name: "child10",
    root: false,
    children: ["12", "13"],
    parent: "6", // Pai é o nó "6"
    data: {
      action: "analyze",
      host: "serviceI",
      group: "group3",
    },
    cause: "success",
  },
  11: {
    id: "11",
    name: "child11",
    root: false,
    children: [],
    parent: "8", // Pai é o nó "8"
    data: {
      action: "log",
      host: "serviceJ",
      group: "group1",
    },
    cause: "always",
  },
  12: {
    id: "12",
    name: "child12",
    root: false,
    children: ["14"],
    parent: "10", // Pai é o nó "10"
    data: {
      action: "archive",
      host: "serviceK",
      group: "group3",
    },
    cause: "success",
  },
  13: {
    id: "13",
    name: "child13",
    root: false,
    children: [],
    parent: "10", // Pai é o nó "10"
    data: {
      action: "monitor",
      host: "serviceL",
      group: "group3",
    },
    cause: "always",
  },
  14: {
    id: "14",
    name: "child14",
    root: false,
    children: ["15"],
    parent: "12", // Pai é o nó "12"
    data: {
      action: "deploy",
      host: "serviceM",
      group: "group3",
    },
    cause: "success",
  },
  15: {
    id: "15",
    name: "child15",
    root: false,
    children: [],
    parent: "14", // Pai é o nó "14"
    data: {
      action: "terminate",
      host: "serviceN",
      group: "group3",
    },
    cause: "error",
  },
};
