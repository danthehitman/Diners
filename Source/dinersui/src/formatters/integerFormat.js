import numeral from 'numeral';

export class IntegerFormatValueConverter  {
  toView(value) {
    return numeral(value).format('(0)');
  }
}
