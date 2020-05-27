import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
    private emailComposer: EmailComposer
  ) { }

  ngOnInit() {
  }

  sendEmail() {
    let email = {
      to: 'confusion@food.net',
      subject: '[Confusion] Query',
      body: 'Dear Sir/Madam:',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}
