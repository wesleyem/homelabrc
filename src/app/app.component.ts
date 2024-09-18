import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  messenger: MessengerService;

  constructor(private _messenger: MessengerService) {
    this.messenger = _messenger;
  }
}
