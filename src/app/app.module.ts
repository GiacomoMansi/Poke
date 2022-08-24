import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { PokemonSearchComponent } from './pages/pokemon-cards/pokemon-cards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    PokemonSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
