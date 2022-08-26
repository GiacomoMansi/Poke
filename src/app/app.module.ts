import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {PokemonSearchComponent} from './components/pokemon-cards/pokemon-cards.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SearchPipeModule} from 'ng2-search-filter'
import {Ng2OrderModule} from "ng2-order-pipe";
import {FormsModule} from '@angular/forms';
import {SearchPipe} from './pipes/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    PokemonSearchComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    Ng2OrderModule,
    NgxPaginationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
