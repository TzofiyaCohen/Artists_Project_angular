import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(arr: any, args: any[]): any {
    var sortBy = args[0]
    var isAsc = args[1];
    console.log(sortBy, isAsc, "sort params")

    if (!Array.isArray(arr)) {
      return;
    }

    arr.sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      } else if (a[sortBy] > b[sortBy]) {
        return 1;
      } else {
        return 0;
      }
    });
    if (!isAsc)
      arr.reverse()
    return arr;

  }

}


