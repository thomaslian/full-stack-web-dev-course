import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})

export class ReservationPage implements OnInit {

  reservationForm: FormGroup;


  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      guests: 3,
      smoking: false,
      dateTime: ['', Validators.required]
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    console.log(this.reservationForm.value);
    this.dismiss();
  }

}
