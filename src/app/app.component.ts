import { Component, OnInit } from '@angular/core';
import { HttpService } from './Services/http.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SortPipe } from './pipes/sort-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Artists project';
  addArtist = false;
  isAsc = true
  sortByFild = "artist_name"
  artists = [{ artist_id: "208488791", artist_name: "Tzofiya", image: "", songs: ["Snunit", "job"], birth: "11/12/1996" }]
  closeResult = '';

  constructor(private httpService: HttpService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.httpService.getArtists()
      .subscribe(artists => {
        this.artists = artists
        console.log("get all artists", artists)
      }, err => {
        console.log(err)
      })
  }

  deleteArtistSong(song: string, artist_id: string) {
    if (song !== null) {
      this.httpService.deleteArtistSong({ song, artist_id })
        .subscribe(res => {
          console.log(res)
          this.artists.forEach(artist => {
            if (artist.artist_id == artist_id)
              artist.songs = artist.songs.filter(song_ => song_ !== song)
          });
        }, err => {
          console.log(err)
        })
    }
  }

  sortBy(event: any) {
    console.log("sortBy", event.target.value)
    this.sortByFild = event.target.value
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
            this.artists.forEach(artist => {
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
        this.artists = this.artists.filter(art => art.artist_id !== id)
      }, err => {
        console.log(err)
      })
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addNewArtist(artist_id: any, artist_name: any, birth: any, image: any) {
    let artistDetails = {
      artist_id: artist_id.value,
      artist_name: artist_name.value,
      birth: birth.value,
      image: image.value
    }
    this.httpService.addArtist(artistDetails)
      .subscribe(res => {
        console.log(res)
        this.artists.push(res)
        SortPipe.prototype.transform(this.artists, [this.sortByFild, this.isAsc])
      }, err => {
        console.log(err)
      })
  }
}