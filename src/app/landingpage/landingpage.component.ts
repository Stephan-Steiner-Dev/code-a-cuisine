import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser, CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { Database } from "@angular/fire/database";
import { get, ref } from "firebase/database";

/**
 * LandingpageComponent
 *
 * Standalone Einstiegskomponente der App.
 * - Zeigt die Landingpage
 * - Ermöglicht Navigation zu den Haupt-Flows
 * - Lädt ein Daily-Quota (System-Kontingent) aus Firebase Realtime Database
 *
 * SSR/Prerender-Hinweis:
 * Firebase Requests dürfen beim Server-Side-Rendering nicht laufen, da sie dort
 * hängen oder timeouts verursachen können. Deshalb wird mit isPlatformBrowser()
 * geprüft, ob der Code im Browser ausgeführt wird.
 */
@Component({
  standalone: true,
  selector: "app-landingpage",
  imports: [CommonModule, RouterLink],
  templateUrl: "./landingpage.component.html",
  styleUrls: ["./landingpage.component.scss", "./landingpage.mobile.scss"],
})
export class LandingpageComponent implements OnInit {
  /**
   * Angular PLATFORM_ID Token.
   * Wird genutzt, um Browser vs. Server (SSR) zu unterscheiden.
   * @private
   */
  private platformId = inject(PLATFORM_ID);

  /**
   * AngularFire Realtime Database Instanz (Injected).
   * Wird genutzt um Quota-Werte aus der DB zu laden.
   * @private
   */
  private db = inject(Database);

  /**
   * Angular Router Instanz (Injected).
   * Dient zur Navigation zwischen Routen.
   * @private
   */
  private router = inject(Router);

  /**
   * Verbleibendes Daily-System-Quota.
   * null = noch nicht geladen / nicht verfügbar
   */
  systemRemaining: number | null = null;

  /**
   * Navigiert zur Zutaten-Auswahl.
   * Startpunkt für die Rezept-Generierung.
   *
   * @returns {void}
   */
  getStarted(): void {
    this.router.navigate(["/select-ingredients"]);
  }

  /**
   * Navigiert zur Cookbook-Seite.
   *
   * @returns {void}
   */
  navigateToCookbook(): void {
    this.router.navigate(["/cookbook"]);
  }

  /**
   * Erstellt einen Datums-Key für Berlin im Format YYYY-MM-DD.
   * Wird genutzt, um den Tageswert in Firebase anzusprechen:
   * quota/system/{YYYY-MM-DD}/count
   *
   * @example
   * // "2026-02-18"
   * const key = this.getDateKeyBerlin();
   *
   * @returns {string} Datums-Key (YYYY-MM-DD) in Europe/Berlin
   */
  getDateKeyBerlin(): string {
    // Zeit in Berlin erzwingen (wichtig, wenn User in anderer Zeitzone ist)
    const nowBerlin = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" })
    );

    const yyyy = nowBerlin.getFullYear();
    const mm = String(nowBerlin.getMonth() + 1).padStart(2, "0");
    const dd = String(nowBerlin.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Lädt den aktuellen Quota-Verbrauch aus Firebase und berechnet die verbleibenden Requests.
   *
   * Datenpfad:
   * quota/system/{dateKey}/count
   *
   * - Wenn kein Wert existiert, wird used = 0 angenommen
   * - limit ist aktuell fest auf 12 gesetzt
   *
   * Fehlerbehandlung:
   * - Bei Fehlern (Netzwerk/Permission/etc.) wird snap = null und used = 0 gesetzt
   *
   * @async
   * @returns {Promise<void>}
   */
  async loadSystemQuota(): Promise<void> {
    const dateKey = this.getDateKeyBerlin();
    const r = ref(this.db, `quota/system/${dateKey}/count`);

    // get(...) kann fehlschlagen → dann snap = null statt Crash
    const snap = await get(r).catch(() => null);

    const used = snap && snap.exists() ? Number(snap.val()) : 0;
    const limit = 12;

    this.systemRemaining = Math.max(0, limit - used);
  }

  /**
   * Angular Lifecycle Hook.
   *
   * SSR/Prerender-Schutz:
   * - Firebase Requests nur im Browser starten
   * - Auf dem Server wird ein Fallback gesetzt, damit Prerender nicht hängt
   *
   * @returns {void}
   */
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Nicht awaiten → blockiert UI/SSR nicht; lädt einfach im Hintergrund.
      this.loadSystemQuota();
    } else {
      // SSR Fallback (z.B. sofort UI rendern ohne Firebase Call)
      this.systemRemaining = 12;
    }
  }
}