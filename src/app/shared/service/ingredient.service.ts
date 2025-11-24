import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Ingredient {
  ingredient: string;
  amount: number;
  selectedUnit: string;
}

export interface Preferences {
  cookingTime: string[];
  cuisine: string[];
  diet: string[];
  portions: number;
  persons: number
}

export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
}

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

    private http = inject(HttpClient)
    private router= inject(Router)

  private webhookUrl = '/webhook-test/ingredient';
  public ingredientList: Ingredient[] = [];
  public preferenceList: Preferences[] = [];







  public recipes: Recipe[] = [
  {
    "title": "Pasta Cremosa al Formaggio",
    "ingredients": [
      "200 g Pasta (z.B. Spaghetti oder Penne)",
      "200 ml Schlagsahne (mind. 30% Fett)",
      "100 g geriebener Käse (z.B. Parmesan, Gouda oder Emmentaler)",
      "Salz",
      "frisch gemahlener schwarzer Pfeffer"
    ],
    "steps": [
      "Einen großen Topf mit Salzwasser zum Kochen bringen. Die Pasta nach Packungsanleitung al dente kochen. Vor dem Abgießen etwa 150 ml Nudelkochwasser entnehmen und beiseite stellen.",
      "Während die Pasta kocht, in einer großen Pfanne oder einem weiten Topf die Schlagsahne bei mittlerer Hitze erwärmen, aber nicht kochen lassen.",
      "Den geriebenen Käse portionsweise unter ständigem Rühren in die warme Sahne geben. Jede Portion vollständig schmelzen lassen, bevor die nächste hinzugefügt wird, um eine klumpenfreie, cremige Sauce zu erhalten.",
      "Sollte die Sauce zu dick werden, löffelweise etwas Nudelkochwasser hinzufügen, bis die gewünschte Konsistenz erreicht ist. Mit Salz und reichlich frisch gemahlenem Pfeffer abschmecken.",
      "Die abgegossene Pasta direkt in die Pfanne zur Käse-Sahne-Sauce geben und gut vermengen, sodass jede Nudel vollständig überzogen ist. Bei Bedarf noch etwas Nudelwasser hinzufügen.",
      "Sofort servieren, eventuell mit zusätzlichem Pfeffer bestreut."
    ]
  },
  {
    "title": "Überbackene Käse-Sahne Pasta",
    "ingredients": [
      "200 g Pasta (z.B. Maccheroni oder Fusilli)",
      "200 ml Schlagsahne (mind. 30% Fett)",
      "100 g geriebener Käse (z.B. Emmentaler oder Gouda)",
      "1/2 Teelöffel Salz",
      "1/4 Teelöffel frisch gemahlener schwarzer Pfeffer",
      "Prise Muskatnuss (optional)"
    ],
    "steps": [
      "Den Backofen auf 200°C Ober-/Unterhitze vorheizen. Eine Auflaufform (ca. 20x15 cm) leicht einfetten.",
      "Einen großen Topf mit Salzwasser zum Kochen bringen. Die Pasta etwa 2-3 Minuten kürzer als auf der Packung angegeben kochen (al dente minus). Abgießen und beiseitestellen.",
      "In einer großen Schüssel die gekochte Pasta mit der Schlagsahne, 70 g des geriebenen Käses, Salz, Pfeffer und der optionalen Muskatnuss vermischen.",
      "Die Pasta-Mischung gleichmäßig in die vorbereitete Auflaufform geben.",
      "Den restlichen geriebenen Käse (30 g) gleichmäßig über die Pasta streuen.",
      "Die Auflaufform für 15-20 Minuten in den vorgeheizten Ofen stellen, oder bis der Käse goldbraun ist und die Sauce blubbernd heiß ist.",
      "Vor dem Servieren 5 Minuten ruhen lassen."
    ]
  },
  {
    "title": "Pasta all'Emulsione di Formaggio",
    "ingredients": [
      "200 g Pasta (z.B. Bucatini oder Spaghetti)",
      "200 ml Schlagsahne (mind. 30% Fett)",
      "100 g frisch geriebener Käse (vorzugsweise Pecorino Romano oder reifer Parmesan)",
      "reichlich frisch gemahlener schwarzer Pfeffer",
      "50-100 ml Nudelkochwasser",
      "eine Prise Salz (vorsichtig, da Käse salzig ist)"
    ],
    "steps": [
      "Einen großen Topf mit Salzwasser zum Kochen bringen. Die Pasta nach Packungsanleitung al dente kochen. Kurz vor Ende der Kochzeit etwa 150 ml Nudelkochwasser entnehmen und beiseite stellen.",
      "In einer großen, tiefen Pfanne oder einem Wok bei niedriger bis mittlerer Hitze die Schlagsahne erwärmen. Den reichlich gemahlenen schwarzen Pfeffer hinzufügen und kurz anrösten, bis er duftet (nicht braun werden lassen).",
      "Die abgegossene Pasta (nicht zu trocken) direkt in die Pfanne zur Sahne geben. Sofort den geriebenen Käse hinzufügen und mit einer Zange oder einem Löffel gründlich vermengen.",
      "Nach und nach das beiseite gestellte, heiße Nudelkochwasser (1-2 Esslöffel auf einmal) unter ständigem Rühren hinzufügen. Das Ziel ist es, eine seidige Emulsion zu schaffen, bei der sich Käse, Sahne und Wasser zu einer cremigen Sauce verbinden. Dies erfordert Geduld und kontinuierliches Rühren.",
      "Weiter rühren und eventuell mehr Nudelwasser hinzufügen, bis die Sauce die gewünschte, glänzende und cremige Konsistenz erreicht hat und perfekt an der Pasta haftet.",
      "Mit einer winzigen Prise Salz abschmecken, falls nötig (Pecorino ist sehr salzig!). Sofort heiß servieren."
    ]
  }
];









  getIngredients(): Ingredient[] {
    return this.ingredientList;
  }

  addIngredient(item: Ingredient): void {
    this.ingredientList.push(item);

  }

  deleteIngredient(index: number): void {
    this.ingredientList.splice(index, 1);
  }

  resetArray() {
    this.ingredientList = []
    this.preferenceList = []
  }


  submitData() {
    this.router.navigate(['/loading-page']);

    const payload = {
      ingredients: this.ingredientList,
      preferences: this.preferenceList
    };

    console.log('Sende an n8n:', payload);

    this.http.post<Recipe[]>(this.webhookUrl, payload).subscribe({
      next: (response) => {
        this.recipes = response;
        console.log(this.recipes)

        this.resetArray();
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.error('Webhook Fehler:', error);
      }
    });
  }
}
