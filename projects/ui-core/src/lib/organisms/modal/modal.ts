import { Component, input, output } from '@angular/core';

@Component({
  selector: 'xui-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  readonly open = input(false);
  readonly title = input('Dialog');
  readonly titleId = input('xui-modal-title');
  readonly dismissible = input(true);
  readonly dismissed = output<void>();
}
