import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss', './landingpage.mobile.scss']
})
export class LandingpageComponent {
  constructor(private router: Router){}
  
  getStarted() {
    this.router.navigate(['/select-ingredients']);
  }
}
