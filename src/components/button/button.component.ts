import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';

type ButtonSize = 'small' | 'medium' | 'large';
type FillType = 'outline' | 'solid' | 'clear';
@Component({
  selector: 'cr-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  imports: [IonButton, IonIcon, IonSpinner, NgClass],
})
export class ButtonComponent {
  @Input() size: ButtonSize = 'small';
  @Input() color: string = 'primary';
  @Input() fill: FillType = 'solid';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() fullwidth = false;

  @Input() download?: string;
  @Input() href?: string;
  @Input() target?: string;
  @Input() leftIconSrc?: string;
  @Input() rightIconSrc?: string;
  @Input() rightIconName?: string;
  @Input() leftIconName?: string;

  @Input() disabled?: boolean;
  @Input() isLoading?: boolean;
  @Input() iconOnly?: boolean;

  @Output() btnClick = new EventEmitter<void>();

  onClick = () => this.btnClick?.emit();
}
