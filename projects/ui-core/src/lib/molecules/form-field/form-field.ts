import { Component, input } from '@angular/core';

@Component({
  selector: 'xui-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  readonly label = input('Form field');
  readonly hint = input('');
  readonly error = input('');
  readonly invalid = input(false);
}
