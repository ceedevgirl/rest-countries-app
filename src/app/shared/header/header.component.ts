import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from "../../features/theme/theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-header',
  imports: [ThemeSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
