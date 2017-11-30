import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation'
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
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
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

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
    .then(
      location => {
        loader.dismiss();
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      }
    )
    .catch(
      error => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Couldn\'t get a location, please pick it manually',
          duration: 2500
        })
        toast.present();
        console.log(error);
      }
    );
  }
}
