import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigurationService } from './configuration.service';
import { log } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'homelabrc';

  constructor(private configService: ConfigurationService) {}

  ngOnInit(): void {
    const settings = this.configService.getSettings();
    this.title = settings.title || this.title;
    log('Settings in app component:', settings);
  }
}
