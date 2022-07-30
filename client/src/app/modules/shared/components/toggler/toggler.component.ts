import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeTogglerService } from '../../services/theme-toggler.service';

@Component({
  selector: 'theme-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.scss']
})
export class TogglerComponent {

  public isChecked: boolean;
  private themeWrapper;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private themeToggler: ThemeTogglerService
  ) {
    this.themeWrapper = this.document.querySelector('body');
    if (localStorage.getItem('theme') === 'dark') {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }

    this.getColors()
  }

  changeToggle() {
    this.isChecked = !this.isChecked;
    this.themeToggler.theItem = this.isChecked ? "dark" : 'light';
    this.getColors();
  }

  getColors() {
    if (this.isChecked) {
      // DARK MODE
      this.renderer.addClass(document.body, 'dark-mode');
      this.themeWrapper.style.setProperty('--background', '#1F1F1F');
      this.themeWrapper.style.setProperty('--sidebarBackground', '#292F38');
      this.themeWrapper.style.setProperty('--outletBackground', '#292F38');
      this.themeWrapper.style.setProperty('--textColor', '#ffffff');
      this.themeWrapper.style.setProperty('--toastShadow', '0 0 10px rgb(250,250,250,0.1)');
      this.themeWrapper.style.setProperty('--menuHeaderColor', '#DFE2E7');
      this.themeWrapper.style.setProperty('--menuItemColor', '#F7F7F7');
      this.themeWrapper.style.setProperty('--infoCard', '#303944');
    } else {
      // LIGHT MODE
      this.renderer.removeClass(document.body, 'dark-mode');
      this.themeWrapper.style.setProperty('--background', '#ffffff');
      this.themeWrapper.style.setProperty('--sidebarBackground', '#ffffff');
      this.themeWrapper.style.setProperty('--outletBackground', '#ECEFF3');
      this.themeWrapper.style.setProperty('--textColor', '#2b2b2b');
      this.themeWrapper.style.setProperty('--toastShadow', '0 0 28px rgba(0,0,0,0.1)');
      this.themeWrapper.style.setProperty('--menuHeaderColor', '#ACB6BD');
      this.themeWrapper.style.setProperty('--menuItemColor', '#6C767D');
      this.themeWrapper.style.setProperty('--infoCard', '#F5F5F5');
    }
  }
}
