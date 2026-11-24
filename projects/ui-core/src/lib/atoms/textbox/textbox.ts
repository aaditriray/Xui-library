import { Component, input, output } from '@angular/core';

@Component({
  selector: 'xui-textbox',
  imports: [],
  templateUrl: './textbox.html',
  styleUrl: './textbox.scss',
})
export class Textbox {
  readonly id = input('xui-textbox');
  readonly label = input('Text field');
  readonly value = input('');
  readonly type = input<'text' | 'email' | 'password' | 'search'>('text');
  readonly autocomplete = input<string>('off');
  readonly helpId = input<string>();
  readonly errorId = input<string>();
  readonly invalid = input(false);
  readonly disabled = input(false);
  readonly required = input(false);
  readonly valueChange = output<string>();
}
