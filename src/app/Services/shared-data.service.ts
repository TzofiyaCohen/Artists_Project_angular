import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  artists = new BehaviorSubject([{ artist_id: "208488791", artist_name: "Tzofiya", image: "", songs: ["Snunit", "job"], birth: "11/12/1996" }]);
  sharedArtists = this.artists.asObservable();

  isAsc = new BehaviorSubject(true);
  sharedIsAsc = this.isAsc.asObservable();

  sortByFild = new BehaviorSubject("artist_name");
  sharedSortByFild = this.sortByFild.asObservable();

  updateArtists(artists: any) {
    this.artists.next(artists)
  }

  updateIsAsc() {
    this.isAsc.next(!this.isAsc.value)
  }

  updateSortByFild(sortByFild: any) {
    this.sortByFild.next(sortByFild)
  }


}
