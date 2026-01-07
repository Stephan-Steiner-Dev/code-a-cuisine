import { Component, inject } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-landingpage',
    imports: [],
    templateUrl: './landingpage.component.html',
    styleUrls: ['./landingpage.component.scss', './landingpage.mobile.scss']
})
export class LandingpageComponent {
  private router = inject(Router)
  
  getStarted() {
    this.router.navigate(['/select-ingredients']);
  }

  navigateToCookbook(){
    this.router.navigate(['/cookbook']);
  }
}
