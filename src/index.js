module.exports = function solveSudoku(matrix) {
  // your solution

  let _matrix = copyMatrix(matrix);

  _matrix = simplifyMatrix(_matrix);


  let nextEmptyCell = getNextEmptyCell(_matrix);

  //console.log(nextEmpty);

  if (nextEmptyCell == MARTIX_FULL)
    return _matrix;

  let _x = nextEmptyCell[COLUM];
  let _y = nextEmptyCell[ROW];

  let NextEmptyCellVariants = getCellVariants(_x, _y, _matrix);


  if (NextEmptyCellVariants.length == 0)
    return ERROR;
  else {

    let _x = nextEmptyCell[COLUM];
    let _y = nextEmptyCell[ROW];

    for (let n = 0; n < NextEmptyCellVariants.length; n++) {

      _matrix[_y][_x] = NextEmptyCellVariants[n];

      let result = solveSudoku(_matrix);

      if (result != ERROR)
        return result;

    }

    return ERROR;
  }

}

function copyMatrix(matrix) {

  var arr = new Array();
  for (var i = 0; i < matrix.length; i++) {
    arr[i] = new Array();
    for (var j = 0; j < matrix[0].length; j++) {
      arr[i][j] = matrix[i][j];
    }
  }
  return arr;
}

function simplifyMatrix(matrix) {
  let emptiCellList = new Array();


  for (let y = 0; y < matrix.length; y++)
    for (let x = 0; x < matrix[0].length; x++)
      if (matrix[y][x] == EMPTI_CELL) {
        emptiCellList.push(new Array(x, y));
      }



  let EmptiCellListLengthTemp;

  while (EmptiCellListLengthTemp != emptiCellList.length) {
    EmptiCellListLengthTemp = emptiCellList.length;

    for (let n = 0; n < emptiCellList.length; n++) {

      let x = emptiCellList[n][COLUM];
      let y = emptiCellList[n][ROW];

      let emptiCellVariants = getCellVariants(x, y, matrix);
      if (emptiCellVariants.length == 1) {


        matrix[y][x] = emptiCellVariants[0];


        emptiCellList.splice(n, 1);
        n--;
      }
    }

  }


  return matrix;
}

function getNextEmptyCell(matrix) {
  for (let y = 0; y < matrix.length; y++)
    for (let x = 0; x < matrix[0].length; x++)
      if (matrix[y][x] == EMPTI_CELL)
        return new Array(x, y);

  return MARTIX_FULL;
}

function differentArrays(array1, array2) {
  let result = new Array();

  for (let i = 0; i < array1.length; i++)
    if (array2.indexOf(array1[i]) == -1) {
      result.push(array1[i]);
    }

  return result;
}

function getCellVariants(x, y, array) {
  if (array[y][x] != EMPTI_CELL)
    return array[y][x];
  else {
    let result = FULL_ARREY;

    for (let i = COLUM; i < AREA + 1; i++) {
      result = differentArrays(result, getCells(x, y, array, i));
    }

    return result;


  }
}




function getCells(x, y, array, selectortype) {

  let result = new Array();

  if (selectortype == COLUM) {

    for (let i = 0; i < array.length; i++) {
        result.push(array[i][x])

    }
  }

  if (selectortype == ROW) {

    for (let j = 0; j < array.length; j++) {
        result.push(array[y][j])

    }
  }

  if (selectortype == AREA) {

    let areaY = Math.floor(y / AREA_HEIGHT);
    let areaX = Math.floor(x /AREA_WIDTH);

    for (let i = 0; i < array.length / AREA_HEIGHT; i++)
      for (let j = 0; j < array[0].length / AREA_WIDTH; j++)
            result.push(array[areaY * AREA_HEIGHT + i][areaX * AREA_WIDTH + j]);

  }

  return result;
}

const COLUM = 0;
const ROW = 1;
const AREA = 2;

const EMPTI_CELL = 0;
const FULL_ARREY = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);


const MARTIX_FULL = 0;
const ERROR = -1;

AREA_HEIGHT = 3;
AREA_WIDTH = 3;
