import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {AppComponent} from './app.component';
import {PokemonSearchComponent} from './components/pokemon-cards/pokemon-cards.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from './pipes/search.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { OrderModule } from 'ngx-order-pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
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
    FormsModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
