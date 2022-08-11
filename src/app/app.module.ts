import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonSearchComponent } from './pages/pokemon-search/pokemon-search.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonSearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
