import { Component, input, output } from '@angular/core';

@Component({
  selector: 'xui-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly label = input('');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<'primary' | 'secondary' | 'danger'>('primary');
  readonly disabled = input(false);
  readonly pressed = input<boolean | undefined>(undefined);
  readonly activated = output<void>();
}
