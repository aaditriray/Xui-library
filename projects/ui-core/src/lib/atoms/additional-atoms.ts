import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'xui-password',
  standalone: true,
  template: `
    <label class="xui-field-label" [for]="id()">{{ label() }}</label>
    <div class="control">
      <input
        class="xui-form-control"
        [id]="id()"
        [type]="visible() ? 'text' : 'password'"
        [autocomplete]="autocomplete()"
        [disabled]="disabled()"
        [required]="required()"
        [attr.aria-describedby]="descriptionId() || null"
        (input)="valueChange.emit($any($event.target).value)"
      />
      <button
        class="toggle"
        type="button"
        [disabled]="disabled()"
        [attr.aria-pressed]="visible()"
        [attr.aria-label]="visible() ? 'Hide ' + label() : 'Show ' + label()"
        (click)="toggleVisibility()"
      >{{ visible() ? 'Hide' : 'Show' }}</button>
    </div>
    <ng-content />
  `,
  styleUrl: './password.scss',
})
export class Password {
  readonly id = input('xui-password');
  readonly label = input('Password');
  readonly autocomplete = input('current-password');
  readonly descriptionId = input<string>();
  readonly disabled = input(false);
  readonly required = input(false);
  readonly valueChange = output<string>();
  readonly visible = signal(false);

  toggleVisibility(): void {
    this.visible.update((isVisible) => !isVisible);
  }
}

@Component({
  selector: 'xui-textarea',
  standalone: true,
  template: `
    <label class="xui-field-label" [for]="id()">{{ label() }}</label>
    <textarea
      class="xui-form-control"
      [id]="id()"
      [rows]="rows()"
      [disabled]="disabled()"
      [required]="required()"
      [attr.aria-describedby]="descriptionId() || null"
      [attr.aria-invalid]="invalid() ? 'true' : null"
      (input)="valueChange.emit($any($event.target).value)"
    ></textarea>
    <ng-content />
  `,
  styleUrl: './textarea.scss',
})
export class Textarea {
  readonly id = input('xui-textarea');
  readonly label = input('Message');
  readonly rows = input(4);
  readonly descriptionId = input<string>();
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly valueChange = output<string>();
}

@Component({
  selector: 'xui-radio',
  standalone: true,
  template: `
    <label class="xui-choice" [for]="id()">
      <input [id]="id()" type="radio" [name]="name()" [value]="value()" [checked]="checked()" [disabled]="disabled()" (change)="selected.emit(value())" />
      <span>{{ label() }}</span>
    </label>
  `,
  styleUrl: './radio.scss',
})
export class Radio {
  readonly id = input('xui-radio');
  readonly name = input('xui-radio-group');
  readonly value = input('');
  readonly label = input('Option');
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly selected = output<string>();
}

@Component({
  selector: 'xui-label',
  standalone: true,
  template: `<label class="xui-field-label" [for]="forId()"><ng-content /></label>`,
})
export class Label {
  readonly forId = input('');
}

@Component({
  selector: 'xui-badge',
  standalone: true,
  template: `<span class="badge" [class]=" 'badge badge--' + tone()"><ng-content>{{ text() }}</ng-content></span>`,
  styleUrl: './badge.scss',
})
export class Badge {
  readonly text = input('');
  readonly tone = input<'neutral' | 'success' | 'warning' | 'danger'>('neutral');
}

@Component({
  selector: 'xui-icon',
  standalone: true,
  template: `<span [attr.aria-hidden]="label() ? null : 'true'" [attr.role]="label() ? 'img' : null" [attr.aria-label]="label() || null">{{ glyph() }}</span>`,
})
export class Icon {
  readonly glyph = input('•');
  readonly label = input('');
}

@Component({
  selector: 'xui-link',
  standalone: true,
  template: `<a [href]="href()" [target]="target() || null" [rel]="target() === '_blank' ? 'noopener noreferrer' : null" [attr.aria-current]="current() ? 'page' : null"><ng-content>{{ label() }}</ng-content></a>`,
  styleUrl: './link.scss',
})
export class Link {
  readonly href = input('#');
  readonly label = input('Learn more');
  readonly target = input('');
  readonly current = input(false);
}

@Component({
  selector: 'xui-spinner',
  standalone: true,
  template: `<span class="spinner" role="status" [attr.aria-label]="label()"><span class="xui-visually-hidden">{{ label() }}</span></span>`,
  styleUrl: './spinner.scss',
})
export class Spinner {
  readonly label = input('Loading');
}
