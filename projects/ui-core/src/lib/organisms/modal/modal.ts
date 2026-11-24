import { AfterViewChecked, Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'xui-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements AfterViewChecked {
  readonly open = input(false);
  readonly title = input('Dialog');
  readonly titleId = input('xui-modal-title');
  readonly dismissible = input(true);
  readonly dismissed = output<void>();
  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  private previousFocus: HTMLElement | null = null;

  ngAfterViewChecked(): void {
    const dialog = this.dialog()?.nativeElement;
    if (!dialog) return;

    if (this.open() && !dialog.open) {
      this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    } else if (!this.open() && dialog.open) {
      dialog.close();
      this.previousFocus?.focus();
      this.previousFocus = null;
    }
  }

  dismissFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.dismissible()) this.dismissed.emit();
  }

  handleCancel(event: Event): void {
    event.preventDefault();
    if (this.dismissible()) this.dismissed.emit();
  }
}
