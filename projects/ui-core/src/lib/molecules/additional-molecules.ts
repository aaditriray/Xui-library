import { Component, input, output, signal } from '@angular/core';

export interface XuiOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'xui-search-box',
  standalone: true,
  template: `
    <form role="search" (submit)="submit($event, query.value)">
      <label class="xui-field-label" [for]="id()">{{ label() }}</label>
      <div class="row">
        <input class="xui-form-control" #query [id]="id()" type="search" [placeholder]="placeholder()" [value]="value()" />
        <button type="submit">Search</button>
      </div>
    </form>
  `,
  styleUrl: './search-box.scss',
})
export class SearchBox {
  readonly id = input('xui-search');
  readonly label = input('Search');
  readonly placeholder = input('Search');
  readonly value = input('');
  readonly search = output<string>();

  submit(event: Event, query: string): void {
    event.preventDefault();
    this.search.emit(query.trim());
  }
}

@Component({
  selector: 'xui-dropdown',
  standalone: true,
  template: `
    <label class="xui-field-label" [for]="id()">{{ label() }}</label>
    <select class="xui-form-control" [id]="id()" [disabled]="disabled()" [value]="value()" (change)="valueChange.emit($any($event.target).value)">
      @if (placeholder()) { <option value="" disabled>{{ placeholder() }}</option> }
      @for (option of options(); track option.value) {
        <option [value]="option.value" [disabled]="option.disabled">{{ option.label }}</option>
      }
    </select>
  `,
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  readonly id = input('xui-dropdown');
  readonly label = input('Choose an option');
  readonly options = input<XuiOption[]>([]);
  readonly value = input('');
  readonly placeholder = input('Select an option');
  readonly disabled = input(false);
  readonly valueChange = output<string>();
}

@Component({
  selector: 'xui-radio-group',
  standalone: true,
  template: `
    <fieldset>
      <legend class="xui-field-label">{{ label() }}</legend>
      @for (option of options(); track option.value) {
        <label class="xui-choice" [for]="id() + '-' + option.value">
          <input
            [id]="id() + '-' + option.value"
            type="radio"
            [name]="name()"
            [value]="option.value"
            [checked]="value() === option.value"
            [disabled]="option.disabled || disabled()"
            (change)="valueChange.emit(option.value)"
          />
          <span>{{ option.label }}</span>
        </label>
      }
    </fieldset>
  `,
  styleUrl: './radio-group.scss',
})
export class RadioGroup {
  readonly id = input('xui-radio-group');
  readonly name = input('xui-radio');
  readonly label = input('Options');
  readonly options = input<XuiOption[]>([]);
  readonly value = input('');
  readonly disabled = input(false);
  readonly valueChange = output<string>();
}

@Component({
  selector: 'xui-checkbox-group',
  standalone: true,
  template: `
    <fieldset>
      <legend class="xui-field-label">{{ label() }}</legend>
      @for (option of options(); track option.value) {
        <label class="xui-choice" [for]="id() + '-' + option.value">
          <input
            [id]="id() + '-' + option.value"
            type="checkbox"
            [checked]="(selected() ?? value()).includes(option.value)"
            [disabled]="option.disabled || disabled()"
            (change)="toggle(option.value, $any($event.target).checked)"
          />
          <span>{{ option.label }}</span>
        </label>
      }
    </fieldset>
  `,
  styleUrl: './checkbox-group.scss',
})
export class CheckboxGroup {
  readonly id = input('xui-checkbox-group');
  readonly label = input('Options');
  readonly options = input<XuiOption[]>([]);
  readonly value = input<string[]>([]);
  readonly disabled = input(false);
  readonly selected = signal<string[] | null>(null);
  readonly valueChange = output<string[]>();

  toggle(value: string, checked: boolean): void {
    const values = new Set(this.selected() ?? this.value());
    if (checked) values.add(value);
    else values.delete(value);
    const next = [...values];
    this.selected.set(next);
    this.valueChange.emit(next);
  }
}

@Component({
  selector: 'xui-breadcrumb',
  standalone: true,
  template: `
    <nav [attr.aria-label]="label()">
      <ol>
        @for (item of items(); track item.label; let last = $last) {
          <li>
            @if (!last && item.href) { <a [href]="item.href">{{ item.label }}</a> }
            @else { <span [attr.aria-current]="last ? 'page' : null">{{ item.label }}</span> }
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  readonly label = input('Breadcrumb');
  readonly items = input<BreadcrumbItem[]>([]);
}

@Component({
  selector: 'xui-input-group',
  standalone: true,
  template: `
    <label class="xui-field-label" [for]="id()">{{ label() }}</label>
    <div class="control">
      @if (prefix()) { <span class="adornment" aria-hidden="true">{{ prefix() }}</span> }
      <input class="xui-form-control" [id]="id()" [type]="type()" [value]="value()" [disabled]="disabled()" (input)="valueChange.emit($any($event.target).value)" />
      @if (suffix()) { <span class="adornment" aria-hidden="true">{{ suffix() }}</span> }
    </div>
  `,
  styleUrl: './input-group.scss',
})
export class InputGroup {
  readonly id = input('xui-input-group');
  readonly label = input('Amount');
  readonly type = input<'text' | 'number' | 'email'>('text');
  readonly prefix = input('');
  readonly suffix = input('');
  readonly value = input('');
  readonly disabled = input(false);
  readonly valueChange = output<string>();
}
