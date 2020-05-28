import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../shared/user";
import { ModalController } from '@ionic/angular';
import { RegisterPage } from "../register/register.page";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    })

    storage.get('user').then(user  => {
      if  (user)  {
        this.user = user;
        this.loginForm
          .patchValue({
            'username': this.user.username,
            'password': this.user.password
          })
      }
      else {
        console.log('User not defined');
      }
    })
  }

  ngOnInit() {
    
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;

    if (this.loginForm.get('remember').value){
      this.storage.set('user', this.user)
    } else {
      this.storage.remove('user');
    }
    this.dismiss();
  }

  async presentRegisterModal() {
    this.dismiss();
    const modal = await this.modalController.create({
      component: RegisterPage
    });
    await modal.present();
  }

}
