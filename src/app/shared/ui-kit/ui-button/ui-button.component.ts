import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonSize, ButtonVariant } from './button.types';

@Component({
  selector: 'quiz-ui-button',
  standalone: true,
  imports: [ NgClass, RouterLink ],
  templateUrl: './ui-button.component.html',
})
export class UiButtonComponent {
  route = input<string | null>(null);
  size = input<ButtonSize>('small');
  variant = input<ButtonVariant>('accent');
  disabled = input<boolean>(false);
  customClasses = input<string>('');

  buttonClick = output<void>();

  private readonly sizeClasses: Record<ButtonSize, string> = {
    small: 'px-6 py-2 text-sm',
    medium: 'px-4 py-6 text-base',
    sizeLess: '',
  };

  private readonly typeClasses: Record<ButtonVariant, string> = {
    accent:
      'bg-accent text-bright hover:bg-accent-700 hover:scale-110 disabled:bg-secondary',
    ghost:
      'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-200 disabled:bg-gray-100',
    menu: 'z-10 text-bright',
  };

  get buttonClass(): string {
    const baseClasses = [
      'rounded-md',
      'font-semibold',
      'transition',
      'duration-150',
      'inline-flex',
      'items-center',
      'justify-center',
      'ease-in',
    ];

    if (this.disabled()) {
      baseClasses.push('cursor-not-allowed');
    }

    return [
      ...baseClasses,
      this.customClasses,
      this.sizeClasses[this.size()],
      this.typeClasses[this.variant()],
    ].join(' ');
  }

  onClick(): void {
    this.buttonClick.emit();
  }
}
