import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', './header.mobile.scss']
})
export class HeaderComponent {
    
    private router = inject(Router)

    navigateHome() {
        this.router.navigate(['/landingpage'])
    }
}
