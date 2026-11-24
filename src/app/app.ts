import { Component, signal } from '@angular/core';
import { Button } from '../../projects/ui-core/src/lib/atoms/button/button';
import { Textbox } from '../../projects/ui-core/src/lib/atoms/textbox/textbox';
import { Checkbox } from '../../projects/ui-core/src/lib/atoms/checkbox/checkbox';
import { FormField } from '../../projects/ui-core/src/lib/molecules/form-field/form-field';
import { Modal } from '../../projects/ui-core/src/lib/organisms/modal/modal';

@Component({
  selector: 'app-root',
  imports: [Button, Textbox, Checkbox, FormField, Modal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly name = signal('');
  readonly consent = signal(false);
  readonly modalOpen = signal(false);
  readonly submitted = signal(false);

  submit(): void {
    this.submitted.set(true);
  }
}
