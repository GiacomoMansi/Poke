import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, firstValueFrom, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  /**
   *
   * @param {HttpClient} http
   */
  constructor(public http: HttpClient) {
  }

  async getPokemon() {
    return await firstValueFrom(this.http.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500").pipe(
      catchError(this.handleError)
    ));
  }

  //Error Handler
  private handleError(error: HttpErrorResponse) {
    let errormessage = "";
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errormessage = `Error ${error.status}, `, error.error;
    }
    // Return an observable with a user-facing error message.
    errormessage += 'Something bad happened; please try again later.'
    return throwError(() => new Error(errormessage));
  }
}
