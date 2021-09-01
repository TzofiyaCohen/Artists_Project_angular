import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public httpClient: HttpClient) { }

  addArtist(artistDetails: any): Observable<any> {
    return this.httpClient.post('http://localhost:3001/api/addArtist', artistDetails)
  }

  addArtistSong(songDetails: any): Observable<any> {
    return this.httpClient.post('http://localhost:3001/api/addArtistSong', songDetails)
  }

  deleteArtistSong(songDetails: any): Observable<any> {
    return this.httpClient.post('http://localhost:3001/api/deleteArtistSong', songDetails)
  }

  getArtists(): Observable<any> {
    return this.httpClient.get('http://localhost:3001/api/getArtists')
  }

  deleteArtist(artistID: string): Observable<any> {
    return this.httpClient.delete('http://localhost:3001/api/deleteArtist/' + artistID)
  }


}

