import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

/**
 * HeaderComponent
 *
 * Application header component responsible for top-level navigation actions.
 * Currently provides navigation back to the landing page.
 */
@Component({
    standalone: true,
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', './header.mobile.scss']
})
export class HeaderComponent {

    /** Angular Router instance used for navigation (injected). */
    private router = inject(Router);

    /**
     * Navigates the user to the application's landing page.
     */
    navigateHome() {
        this.router.navigate(['/landingpage']);
    }
}