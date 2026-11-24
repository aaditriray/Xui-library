import { Component, computed, input, output, signal } from '@angular/core';

export interface XuiTableColumn {
  key: string;
  header: string;
}

export type XuiTableRow = Record<string, string | number>;

export interface XuiTab {
  id: string;
  label: string;
  content: string;
}

export interface XuiNavigationItem {
  label: string;
  href: string;
  current?: boolean;
}

@Component({
  selector: 'xui-table',
  standalone: true,
  template: `
    <div class="table-wrap">
      <table>
        <caption>{{ caption() }}</caption>
        <thead>
          <tr>
            @for (column of columns(); track column.key) {
              <th scope="col" [attr.aria-sort]="sortKey() === column.key ? (ascending() ? 'ascending' : 'descending') : 'none'">
                <button type="button" class="sort" (click)="sort(column.key)">{{ column.header }}</button>
              </th>
            }
            @if (selectable()) { <th scope="col"><span class="xui-visually-hidden">Actions</span></th> }
          </tr>
        </thead>
        <tbody>
          @for (row of displayRows(); track $index) {
            <tr>
              @if (selectable()) {
                <th scope="row"><button type="button" class="row-select" (click)="rowSelected.emit(row)">Select row {{ $index + 1 }}</button></th>
              }
              @for (column of columns(); track column.key) {
                <td>{{ row[column.key] }}</td>
              }
            </tr>
          } @empty {
            <tr><td [attr.colspan]="columns().length + (selectable() ? 1 : 0) || 1">{{ emptyText() }}</td></tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './table.scss',
})
export class Table {
  readonly caption = input('Data table');
  readonly columns = input<XuiTableColumn[]>([]);
  readonly rows = input<XuiTableRow[]>([]);
  readonly emptyText = input('No results found.');
  readonly selectable = input(false);
  readonly sortKey = signal('');
  readonly ascending = signal(true);
  readonly displayRows = computed(() => {
    const key = this.sortKey();
    if (!key) return this.rows();
    const direction = this.ascending() ? 1 : -1;
    return [...this.rows()].sort((first, second) => {
      const left = first[key];
      const right = second[key];
      if (typeof left === 'number' && typeof right === 'number') return (left - right) * direction;
      return String(left ?? '').localeCompare(String(right ?? ''), undefined, { numeric: true }) * direction;
    });
  });
  readonly sortChange = output<{ key: string; ascending: boolean }>();
  readonly rowSelected = output<XuiTableRow>();

  sort(key: string): void {
    const ascending = this.sortKey() === key ? !this.ascending() : true;
    this.sortKey.set(key);
    this.ascending.set(ascending);
    this.sortChange.emit({ key, ascending });
  }
}

@Component({
  selector: 'xui-tabs',
  standalone: true,
  template: `
    <div role="tablist" [attr.aria-label]="label()" (keydown)="onKeydown($event)">
      @for (tab of tabs(); track tab.id; let index = $index) {
        <button
          type="button"
          role="tab"
          [id]="tab.id + '-tab'"
          [attr.aria-controls]="tab.id + '-panel'"
          [attr.aria-selected]="activeIndex() === index"
          [attr.tabindex]="activeIndex() === index ? 0 : -1"
          (click)="select(index)"
        >{{ tab.label }}</button>
      }
    </div>
    @for (tab of tabs(); track tab.id; let index = $index) {
      <section
        role="tabpanel"
        [id]="tab.id + '-panel'"
        [attr.aria-labelledby]="tab.id + '-tab'"
        [hidden]="activeIndex() !== index"
        tabindex="0"
      >{{ tab.content }}</section>
    }
  `,
  styleUrl: './tabs.scss',
})
export class Tabs {
  readonly label = input('Content sections');
  readonly tabs = input<XuiTab[]>([]);
  readonly activeIndex = signal(0);
  readonly selectionChange = output<number>();

  select(index: number): void {
    if (index < 0 || index >= this.tabs().length) return;
    this.activeIndex.set(index);
    this.selectionChange.emit(index);
  }

  onKeydown(event: KeyboardEvent): void {
    const count = this.tabs().length;
    if (count === 0) return;
    let target: number | undefined;
    if (event.key === 'ArrowRight') target = (this.activeIndex() + 1) % count;
    if (event.key === 'ArrowLeft') target = (this.activeIndex() + count - 1) % count;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = count - 1;
    if (target !== undefined) {
      event.preventDefault();
      this.select(target);
      (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('[role="tab"]')[target]?.focus();
    }
  }
}

@Component({
  selector: 'xui-accordion',
  standalone: true,
  template: `
    <details (toggle)="expandedChange.emit($any($event.target).open)">
      <summary>{{ title() }}</summary>
      <div class="content"><ng-content>{{ content() }}</ng-content></div>
    </details>
  `,
  styleUrl: './accordion.scss',
})
export class Accordion {
  readonly title = input('More information');
  readonly content = input('');
  readonly expandedChange = output<boolean>();
}

@Component({
  selector: 'xui-navigation',
  standalone: true,
  template: `
    <nav [attr.aria-label]="label()">
      <ul>
        @for (item of items(); track item.href) {
          <li><a [href]="item.href" [attr.aria-current]="item.current ? 'page' : null">{{ item.label }}</a></li>
        }
      </ul>
    </nav>
  `,
  styleUrl: './navigation.scss',
})
export class Navigation {
  readonly label = input('Main navigation');
  readonly items = input<XuiNavigationItem[]>([]);
}

@Component({
  selector: 'xui-header',
  standalone: true,
  template: `
    <header>
      <a class="brand" [href]="homeHref()">{{ title() }}</a>
      <ng-content />
    </header>
  `,
  styleUrl: './header.scss',
})
export class Header {
  readonly title = input('XUI');
  readonly homeHref = input('/');
}

@Component({
  selector: 'xui-footer',
  standalone: true,
  template: `
    <footer>
      <ng-content />
      <p>{{ copyright() }}</p>
    </footer>
  `,
  styleUrl: './footer.scss',
})
export class Footer {
  readonly copyright = input('');
}

@Component({
  selector: 'xui-stepper',
  standalone: true,
  template: `
    <nav [attr.aria-label]="label()">
      <ol>
        @for (step of steps(); track step; let index = $index) {
          <li [attr.aria-current]="currentStep() === index ? 'step' : null">
            <span class="number" aria-hidden="true">{{ index + 1 }}</span>
            <span>{{ step }}</span>
            @if (currentStep() > index) { <span class="xui-visually-hidden">Completed</span> }
          </li>
        }
      </ol>
    </nav>
    <div class="controls">
      <button type="button" [disabled]="currentStep() <= 0" (click)="change(-1)">Previous</button>
      <button type="button" [disabled]="currentStep() >= steps().length - 1" (click)="change(1)">Next</button>
    </div>
  `,
  styleUrl: './stepper.scss',
})
export class Stepper {
  readonly label = input('Progress');
  readonly steps = input<string[]>([]);
  readonly currentStep = input(0);
  readonly stepChange = output<number>();

  change(delta: number): void {
    const next = Math.min(Math.max(0, this.currentStep() + delta), this.steps().length - 1);
    if (next !== this.currentStep()) this.stepChange.emit(next);
  }
}

@Component({
  selector: 'xui-side-panel',
  standalone: true,
  template: `
    @if (open()) {
      <aside [attr.aria-labelledby]="titleId()">
        <div class="heading">
          <h2 [id]="titleId()">{{ title() }}</h2>
          <button type="button" [attr.aria-label]="'Close ' + title()" (click)="closed.emit()">Close</button>
        </div>
        <ng-content />
      </aside>
    }
  `,
  styleUrl: './side-panel.scss',
})
export class SidePanel {
  readonly open = input(false);
  readonly title = input('Details');
  readonly titleId = input('xui-side-panel-title');
  readonly closed = output<void>();
}
