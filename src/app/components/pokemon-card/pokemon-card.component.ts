import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() items: any; //riceve un oggetto dal padre(pokemon-cards)
  @Input() config: any; //configurazione paginazione

  constructor(public _pokemonService: PokemonService, public _utilsService: UtilsService) { }

 async ngOnInit() {
 }
}
