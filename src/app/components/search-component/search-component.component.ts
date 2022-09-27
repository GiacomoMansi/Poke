import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  public selectedOption: string = ""
  public options = [
    {name: "all", value: ""},
    {name: "grass", value: "grass"},
    {name: "normal", value: "normal"},
    {name: "fighting", value: "fighting"},
    {name: "poison", value: "poison"},
    {name: "ground", value: "ground"},
    {name: "rock", value: "rock"},
    {name: "bug", value: "bug"},
    {name: "ghost", value: "ghost"},
    {name: "steel", value: "steel"},
    {name: "fire", value: "fire"},
    {name: "water", value: "water"},
    {name: "electric", value: "electric"},
    {name: "psychic", value: "psychic"},
    {name: "ice", value: "ice"},
    {name: "dragon", value: "dragon"},
    {name: "dark", value: "dark"},
    {name: "fairy", value: "fairy"},
  ]
  constructor() { }

  ngOnInit() {

  }
  //Input per la ricerca
  searchText: string = "";
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>()

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.searchText)
  }

  //Ordine alfabetico, tipo, statistiche
  key = "";
  reverse: boolean = false;

  sort(key: any,) {
    this.key = key
    this.reverse = !this.reverse
  }

  //Configurazione paginazione
  config = {
    itemsPerPage: 30,
    currentPage: 1,
  };
}
