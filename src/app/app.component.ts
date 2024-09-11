import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './utils/config.service';
import { LoggerService } from './utils/logger.service';
import { Settings } from './models/settings';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'homelabrc';
  settings: Settings;

  constructor(
    private configService: ConfigService,
    private logger: LoggerService
  ) {
    // this.settings = new Settings(configService.getSettings());
    this.settings = configService.getSettings();
    this.title = this.settings?.title || "Default Title";
    console.log(this.settings.layout?.one.two.threeOne);
    this.logger.info(`Loaded settings for: ${this.settings?.title}`);
  }

  setTitle() : void {

  }
}
