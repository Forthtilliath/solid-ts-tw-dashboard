export function transposeArrays(arr: number[][]): number[][] {
    return arr[0].map((col, i) => arr.map(row => row[i]));
  }