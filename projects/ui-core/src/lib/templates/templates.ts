import { Component, input, output, signal } from '@angular/core';
import { Button } from '../atoms/button/button';
import { Checkbox } from '../atoms/checkbox/checkbox';
import { Password } from '../atoms/additional-atoms';
import { Textbox } from '../atoms/textbox/textbox';
import { SearchBox } from '../molecules/additional-molecules';
import { Table, XuiTableColumn, XuiTableRow } from '../organisms/additional-organisms';

@Component({
  selector: 'xui-login-template',
  standalone: true,
  imports: [Button, Checkbox, Password, Textbox],
  template: `
    <main>
      <section aria-labelledby="login-title">
        <h1 id="login-title">{{ title() }}</h1>
        <form (submit)="$event.preventDefault(); submitted.emit()">
          <xui-textbox id="login-email" label="Email address" type="email" autocomplete="username" [required]="true" />
          <xui-password id="login-password" label="Password" autocomplete="current-password" [required]="true" />
          <xui-checkbox id="remember-me" label="Remember me" />
          <xui-button type="submit" label="Sign in" />
        </form>
        <ng-content />
      </section>
    </main>
  `,
  styleUrl: './login.scss',
})
export class LoginTemplate {
  readonly title = input('Sign in');
  readonly submitted = output<void>();
}

@Component({
  selector: 'xui-dashboard-template',
  standalone: true,
  template: `
    <main>
      <header>
        <p>{{ eyebrow() }}</p>
        <h1>{{ title() }}</h1>
      </header>
      <section aria-label="Summary">
        @for (metric of metrics(); track metric.label) {
          <article>
            <h2>{{ metric.label }}</h2>
            <p>{{ metric.value }}</p>
          </article>
        }
      </section>
      <section aria-labelledby="content-title">
        <h2 id="content-title">{{ contentTitle() }}</h2>
        <ng-content />
      </section>
    </main>
  `,
  styleUrl: './dashboard.scss',
})
export class DashboardTemplate {
  readonly eyebrow = input('Overview');
  readonly title = input('Dashboard');
  readonly contentTitle = input('Recent activity');
  readonly metrics = input<Array<{ label: string; value: string }>>([]);
}

@Component({
  selector: 'xui-search-template',
  standalone: true,
  imports: [SearchBox],
  template: `
    <main>
      <section aria-labelledby="search-title">
        <h1 id="search-title">{{ title() }}</h1>
        <xui-search-box label="Search" (search)="onSearch($event)" />
        @if (query()) {
          <p role="status">Results for {{ query() }}</p>
          <ng-content />
        }
      </section>
    </main>
  `,
  styleUrl: './search.scss',
})
export class SearchTemplate {
  readonly title = input('Search');
  readonly query = signal('');
  readonly search = output<string>();

  onSearch(query: string): void {
    this.query.set(query);
    this.search.emit(query);
  }
}

@Component({
  selector: 'xui-master-detail-template',
  standalone: true,
  imports: [Table],
  template: `
    <main>
      <h1>{{ title() }}</h1>
      <div class="layout">
        <section aria-label="Records">
          <xui-table
            [caption]="caption()"
            [columns]="columns()"
            [rows]="rows()"
            [selectable]="true"
            (rowSelected)="selected.set($event)"
          />
        </section>
        <section aria-labelledby="detail-title">
          <h2 id="detail-title">Details</h2>
          @if (selected(); as row) {
            <dl>
              @for (column of columns(); track column.key) {
                <div><dt>{{ column.header }}</dt><dd>{{ row[column.key] }}</dd></div>
              }
            </dl>
          } @else {
            <p>Select a record to view its details.</p>
          }
        </section>
      </div>
    </main>
  `,
  styleUrl: './master-detail.scss',
})
export class MasterDetailTemplate {
  readonly title = input('Records');
  readonly caption = input('Records');
  readonly columns = input<XuiTableColumn[]>([]);
  readonly rows = input<XuiTableRow[]>([]);
  readonly selected = signal<XuiTableRow | null>(null);
}
