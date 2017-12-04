import { PlacesService } from '../../services/places';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../models/place';

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: Place;
  index: number;

  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private placesSrv: PlacesService
  ) {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }

  onDelete() {
    this.placesSrv.deletePlace(this.index);
    this.onLeave();
  }

}
