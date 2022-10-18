import { Pipe, PipeTransform } from '@angular/core';
import {Pokemon} from "../components/pokemon-cards/pokemon-cards.component";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  public transform(value: Pokemon[], keys: string, term: string) {
    if (!term) return value;
    // @ts-ignore
    return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  }
}

