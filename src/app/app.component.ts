import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigurationService } from './configuration.service';
import { MessengerService } from './util/messenger/messenger.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'homelabrc';

  constructor(
    private configService: ConfigurationService,
    private messengerService: MessengerService,
  ) {
    const settings = this.configService.settings;
    this.title = settings.title!;
  }
}
