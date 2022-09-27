import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }
  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }
}
