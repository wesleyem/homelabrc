import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './utils/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'homelabrc';
  settings: any;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
      this.configService.getSettings().subscribe((settings) => {
        this.settings = settings;
        console.log('Loaded settings:', this.settings);
      })
  }
}
