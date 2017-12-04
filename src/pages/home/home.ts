import { PlacePage } from '../place/place';
import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlacesService } from '../../services/places';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];
  constructor(
    public modalCtrl: ModalController,
    private placesSrv: PlacesService
  ) { }

  ngOnInit() {
    this.placesSrv.fetchPlaces()
    .then(
      (places: Place[]) => this.places = places
    )
  }

  ionViewWillEnter() {
    this.places = this.placesSrv.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
  }
}
