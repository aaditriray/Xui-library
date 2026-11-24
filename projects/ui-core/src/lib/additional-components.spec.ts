import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Password } from './atoms/additional-atoms';
import { CheckboxGroup } from './molecules/additional-molecules';
import { Modal } from './organisms/modal/modal';
import { Table, Tabs } from './organisms/additional-organisms';

describe('additional component behaviors', () => {
  it('toggles password visibility while keeping an accessible action name', async () => {
    await TestBed.configureTestingModule({ imports: [Password] }).compileComponents();
    const fixture = TestBed.createComponent(Password);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(input.type).toBe('password');
    expect(button.getAttribute('aria-label')).toBe('Show Password');

    button.click();
    fixture.detectChanges();
    expect(input.type).toBe('text');
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('preserves selected values when toggling multiple checkbox options', async () => {
    await TestBed.configureTestingModule({ imports: [CheckboxGroup] }).compileComponents();
    const fixture = TestBed.createComponent(CheckboxGroup);
    fixture.componentRef.setInput('options', [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ]);
    fixture.detectChanges();

    const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    checkboxes[0].click();
    fixture.detectChanges();
    checkboxes[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selected()).toEqual(['one', 'two']);
    expect(checkboxes[0].checked).toBeTrue();
    expect(checkboxes[1].checked).toBeTrue();
  });

  it('supports arrow-key navigation between tabs and keeps selection semantics in sync', async () => {
    await TestBed.configureTestingModule({ imports: [Tabs] }).compileComponents();
    const fixture = TestBed.createComponent(Tabs);
    fixture.componentRef.setInput('tabs', [
      { id: 'one', label: 'One', content: 'First panel' },
      { id: 'two', label: 'Two', content: 'Second panel' },
    ]);
    fixture.detectChanges();

    const tablist = fixture.nativeElement.querySelector('[role="tablist"]') as HTMLElement;
    tablist.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    const tabs = fixture.nativeElement.querySelectorAll('[role="tab"]') as NodeListOf<HTMLButtonElement>;
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(fixture.nativeElement.querySelector('#two-panel')?.textContent).toContain('Second panel');
    expect(fixture.nativeElement.querySelector('#one-panel')).toBeTruthy();
  });

  it('sorts table data and announces the active sort direction', async () => {
    await TestBed.configureTestingModule({ imports: [Table] }).compileComponents();
    const fixture = TestBed.createComponent(Table);
    fixture.componentRef.setInput('columns', [{ key: 'name', header: 'Name' }]);
    fixture.componentRef.setInput('rows', [{ name: 'Taylor' }, { name: 'Alex' }]);
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('thead button') as HTMLButtonElement).click();
    fixture.detectChanges();

    const values = Array.from(fixture.nativeElement.querySelectorAll('tbody td') as NodeListOf<HTMLTableCellElement>)
      .map((cell) => cell.textContent?.trim());
    expect(values).toEqual(['Alex', 'Taylor']);
    expect(fixture.nativeElement.querySelector('th')?.getAttribute('aria-sort')).toBe('ascending');
  });

  it('uses a native modal dialog and emits dismissal for Escape', async () => {
    await TestBed.configureTestingModule({ imports: [Modal] }).compileComponents();
    const fixture = TestBed.createComponent(Modal);
    const dismissed = jasmine.createSpy('dismissed');
    fixture.componentInstance.dismissed.subscribe(dismissed);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    expect(dialog.open).toBeTrue();
    expect(dialog.getAttribute('aria-labelledby')).toBe('xui-modal-title');

    const cancel = new Event('cancel', { cancelable: true });
    dialog.dispatchEvent(cancel);
    expect(cancel.defaultPrevented).toBeTrue();
    expect(dismissed).toHaveBeenCalled();

    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    expect(dialog.open).toBeFalse();
  });
});
