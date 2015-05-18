
export class StringToIntValueConverter {
  toView(number) {
    return number;
  }

  fromView(str) {
    return parseInt(str);    
  }
}