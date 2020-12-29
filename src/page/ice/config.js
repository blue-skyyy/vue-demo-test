const config = {
  one: {
    list: [
      { type: "square_empty", position: { x: 1, y: 0 } },
      { type: "square_ice", position: { x: 2, y: 0 } },
      { type: "square_empty", position: { x: 3, y: 0 } },
      { type: "square_ice", position: { x: 1, y: 1 } },
      { type: "square_empty", position: { x: 2, y: 1 } },
      { type: "square_ice", position: { x: 3, y: 1 } }
    ],
    rowCol: {
      row: 2,
      col: 3
    }
  },
  two: {
    list: [
      { type: "square_empty", position: { x: 2, y: 0 } },
      { type: "square_empty", position: { x: 2, y: 1 } },
      { type: "square_ice", position: { x: 3, y: 1 } },
      { type: "square_ice", position: { x: 1, y: 2 } },
      { type: "square_empty", position: { x: 2, y: 2 } },
      { type: "square_ice", position: { x: 2, y: 3 } }
    ],
    rowCol: {
      row: 4,
      col: 3
    }
  },
  three: {
    list: [
      { type: "square_empty", position: { x: 4, y: 0 } },
      { type: "square_ice", position: { x: 1, y: 1 } },
      { type: "square_empty", position: { x: 2, y: 1 } },
      { type: "square_empty", position: { x: 3, y: 1 } },
      { type: "square_empty", position: { x: 4, y: 1 } },
      { type: "square_ice", position: { x: 5, y: 1 } },
      { type: "square_ice", position: { x: 2, y: 2 } },
      { type: "square_ice", position: { x: 4, y: 2 } }
    ],
    rowCol: {
      row: 3,
      col: 5
    }
  },
  four: {
    list: [
      // { type: "square_empty", position: { x: 4, y: 0 } },
      { type: "square_ice", position: { x: 2, y: 0 } },
      { type: "square_ice", position: { x: 3, y: 0 } },
      { type: "square_ice", position: { x: 1, y: 1 } },
      { type: "square_empty", position: { x: 2, y: 1 } },
      { type: "square_empty", position: { x: 3, y: 1 } },
      { type: "square_ice", position: { x: 4, y: 1 } },
      { type: "square_empty", position: { x: 1, y: 2 } },
      { type: "square_empty", position: { x: 2, y: 2 } },
      { type: "square_ice", position: { x: 3, y: 2 } },
      { type: "square_empty", position: { x: 1, y: 3 } },
      { type: "square_ice", position: { x: 2, y: 3 } },
      { type: "square_empty", position: { x: 1, y: 4 } }
    ],
    rowCol: {
      row: 5,
      col: 4
    }
  },
  five: {
    list: [
      { type: "square_empty", position: { x: 3, y: 0 } },
      { type: "square_empty", position: { x: 4, y: 0 } },
      { type: "square_ice", position: { x: 5, y: 0 } },
      { type: "square_empty", position: { x: 4, y: 1 } },
      { type: "square_ice", position: { x: 5, y: 1 } },
      { type: "square_ice", position: { x: 1, y: 2 } },
      { type: "square_empty", position: { x: 2, y: 2 } },
      { type: "square_empty", position: { x: 3, y: 2 } },
      { type: "square_empty", position: { x: 4, y: 2 } },
      { type: "square_ice", position: { x: 2, y: 3 } },
      { type: "square_ice", position: { x: 3, y: 3 } },
      { type: "square_ice", position: { x: 4, y: 3 } }
    ],
    rowCol: {
      row: 4,
      col: 5
    }
  },
  six: {
    list: [
      { type: "square_ice", position: { x: 2, y: 0 } },
      { type: "square_ice", position: { x: 3, y: 0 } },
      { type: "square_ice", position: { x: 1, y: 1 } },
      { type: "square_empty", position: { x: 2, y: 1 } },
      { type: "square_empty", position: { x: 3, y: 1 } },
      { type: "square_ice", position: { x: 1, y: 2 } },
      { type: "square_empty", position: { x: 2, y: 2 } },
      { type: "square_empty", position: { x: 3, y: 2 } },
      { type: "square_empty", position: { x: 4, y: 2 } },
      { type: "square_ice", position: { x: 1, y: 3 } },
      { type: "square_empty", position: { x: 2, y: 3 } },
      { type: "square_empty", position: { x: 3, y: 3 } },
      { type: "square_ice", position: { x: 2, y: 4 } },
      { type: "square_ice", position: { x: 3, y: 4 } }
    ],
    rowCol: {
      row: 5,
      col: 4
    }
  }
};

export default config;
