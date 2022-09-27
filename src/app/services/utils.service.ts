import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  public selectedOption: string = ""
  public searchText: string = ""
  public key = "";
  public reverse: boolean = false;

  constructor() { }



  sort(key: any) {
    this.key = key
    this.reverse = !this.reverse
  }
}
