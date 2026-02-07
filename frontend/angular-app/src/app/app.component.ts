import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { ApiService } from "./services/api.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(private api: ApiService) {}

  reconnect() {
    this.api.loginAll().subscribe({
      next: () => alert("Successfully Authenticated with both APIs"),
      error: (err) => alert("Login failed. Ensure both APIs are running."),
    });
  }
}
