import { Component, OnInit } from '@angular/core';
import { AnimationsService } from '@appcore';

@Component({
  selector: 'mma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private animationService: AnimationsService) { }
  ngOnInit() {
    this.animationService.updateRouteAnimationType(
      true,
      true
    );
  }
}
