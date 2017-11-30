import { PlacePage } from '../place/place';
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacesService } from '../../services/places';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: Place[];
  constructor(
    public modalCtrl: ModalController,
    private placesSrv: PlacesService
  ) {

  }

  ionViewWillEnter() {
    this.places = this.placesSrv.loadPlaces();
  }

  onOpenPlace(place: Place) {
    const modal = this.modalCtrl.create(PlacePage, {place: place});
    modal.present();
  }
}
