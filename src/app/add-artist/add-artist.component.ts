import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../Services/http.service';
import { SharedDataService } from '../Services/shared-data.service';
import { SortPipe } from '../pipes/sort-pipe';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {
  closeResult = '';

  constructor(private httpService: HttpService, private modalService: NgbModal, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {

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
        this.sharedDataService.artists.value.push(res)
        SortPipe.prototype.transform(this.sharedDataService.artists.value, [this.sharedDataService.sortByFild.value, this.sharedDataService.isAsc.value])
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

}
