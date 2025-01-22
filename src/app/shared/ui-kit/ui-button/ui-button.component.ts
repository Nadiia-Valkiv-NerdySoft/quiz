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
    medium: 'px-4 py-4 text-base min-w-40',
    sizeLess: '',
  };

  private readonly typeClasses: Record<ButtonVariant, string> = {
    accent: 'bg-accent text-bright',
    ghost: 'bg-transparent border',
    menu: 'z-10 text-bright',
  };

  get buttonClass(): string {
    const baseClasses = [
      'rounded-md',
      'font-medium',
      'transition',
      'duration-150',
      'inline-flex',
      'items-center',
      'justify-center',
      'ease-in',
      'disabled:bg-secondary',
    ];

    if (!this.disabled()) {
      baseClasses.push('hover:scale-105 hover:border-accent');
    } else {
      baseClasses.push('cursor-not-allowed');
    }

    return [
      ...baseClasses,
      this.sizeClasses[this.size()],
      this.typeClasses[this.variant()],
      this.customClasses,
    ].join(' ');
  }

  onClick(): void {
    this.buttonClick.emit();
  }
}
