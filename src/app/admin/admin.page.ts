import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // export.sendActivationEmail = function.firestore.document('users/{userId}')
  // .onUpdate((change, context) => {
  //   const newValue = change.after.data();
  //   const previousValue = change.before.data();

  //   if(newValue.status === 'active' && previousValue! == 'active')
  //     {
  //       //Send email 
  //       const msg = {
  //         to: newValue.email,
  //         from: 'medi@pharm.com';
  //         subject: 'Account Activation',
  //         text: 'Your account is now active and is ready to use.';
  //       };
  //       //send the email
  //       return sgMail.send(msg);
  //     }
  //     return null;
  // });

}
