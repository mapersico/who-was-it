import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'who-was-it';
  data = signal("");

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/v1/test/hello-world').subscribe((res) => {
      this.data.set((res as any).data.message);
    });
  }
}
