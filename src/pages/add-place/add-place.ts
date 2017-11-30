import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 25.761681,
    lng: -80.191788
  };
  locationIsSet = false;

  constructor(
    private modalCtrl: ModalController
  ){}
  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(
      SetLocationPage,
      {location: this.location, isSet: this.locationIsSet}
    );
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }
}
