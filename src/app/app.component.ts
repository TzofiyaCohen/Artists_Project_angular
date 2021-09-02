import { Component, OnInit } from '@angular/core';
import { HttpService } from './Services/http.service';
import { SharedDataService } from './Services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Artists project';

  constructor(private httpService: HttpService, public sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.httpService.getArtists()
      .subscribe(dataArtists => {
        this.sharedDataService.updateArtists(dataArtists)
      }, err => {
        console.log(err)
      })
  }

  deleteArtistSong(song: string, artist_id: string) {
    if (song !== null) {
      this.httpService.deleteArtistSong({ song, artist_id })
        .subscribe(res => {
          console.log(res)
          this.sharedDataService.artists.value.forEach(artist => {
            console.log(artist)
            if (artist.artist_id == artist_id)
              artist.songs = artist.songs.filter(song_ => song_ !== song)
          });
        }, err => {
          console.log(err)
        })
    }
  }

  sortBy(event: any) {
    this.sharedDataService.updateSortByFild(event.target.value)
  }

  updateIsAsc() {
    this.sharedDataService.updateIsAsc()
  }

  addNewArtistSong(artist_id: string, song: any) {
    let songDetails = {
      artist_id: artist_id,
      song: song.value
    }
    if (song.value !== "") {
      this.httpService.addArtistSong(songDetails)
        .subscribe(res => {
          if (res !== "Song already exist") {
            this.sharedDataService.artists.value.forEach(artist => {
              if (artist.artist_id == artist_id)
                artist.songs = res.songs
            });
          }
          else alert("Song already exist")
        }, err => {
          console.log(err)
        })
    }
    else alert("Please enter song name")
  }

  deleteArtist(id: string) {
    this.httpService.deleteArtist(id)
      .subscribe(res => {
        console.log(res)
        let result
        // this.sharedDataService.sharedArtists.subscribe(artists => result = artists.filter(art => art.artist_id !== id))
        result = this.sharedDataService.artists.value.filter(art => art.artist_id !== id)
        this.sharedDataService.updateArtists(result)
      }, err => {
        console.log(err)
      })
  }
}