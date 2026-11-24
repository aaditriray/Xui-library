import { Component, input, output } from '@angular/core';

@Component({
  selector: 'xui-checkbox',
  imports: [],
  templateUrl: './checkbox.html',
})
export class Checkbox {
  readonly id = input('xui-checkbox');
  readonly label = input('Checkbox');
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly checkedChange = output<boolean>();
}
