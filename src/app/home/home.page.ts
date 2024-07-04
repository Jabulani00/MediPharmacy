import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
//import { FireauthService } from '../services/fireauth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(//private fireAuth: FireauthService,
    private router: Router, 
    private menu: MenuController, 
    private platform: Platform
  ) {}

  closeMenu(event: Event){
    this.menu.close('main-content');
    event.stopPropagation();
  }

  ngOnInit() {
     // TODO: Implement ngOnInit lifecycle method
    // This is a placeholder comment to avoid lint errors
   }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goSignUp() {
    this.router.navigate(['/register']);
  }

  //Logout Method
  // logout(){
  //   this.fireAuth.logout();
  // }

  // goToLOGIN(){
  //   {this.router.navigate(['/login']).then(() => {window.location.reload();});  
  // }}
  // goToSIGNUP(){
  //   {this.router.navigate(['/signup']).then(() => {window.location.reload();});  
  // }}
  goToPROFILE(){
    {this.router.navigate(['/profile']).then(() => {window.location.reload();});  
  }}  
  goToABOUTMEDDASH(){
    {this.router.navigate(['/about-med-dash']).then(() => {window.location.reload();});  
  }}
  goToBECOMEADRIVER(){
    {this.router.navigate(['/become-a-driver']).then(() => {window.location.reload();});  
  }}
  goToCARDPAYMENT(){
    {this.router.navigate(['/card-payment']).then(() => {window.location.reload();});  
  }}
  goToFAQS(){
    {this.router.navigate(['/faqs']).then(() => {window.location.reload();});  
  }}
  goToHELP(){
    {this.router.navigate(['/help']).then(() => {window.location.reload();});  
  }}
  goToORDERHISTORY(){
    {this.router.navigate(['/order-history']).then(() => {window.location.reload();});  
  }}
  goToREGISTERYOURPHARMACY(){
    {this.router.navigate(['/register-your-pharmacy']).then(() => {window.location.reload();});  
  }}
  goToHOMEpage(){
    {this.router.navigate(['/home']).then(() => {window.location.reload();});  
  }}
  goToTERMSANDCONDITIONS(){
    {this.router.navigate(['/terms-andconditions']).then(() => {window.location.reload();});  
  }}

  swiperSlideChanged(e: any){
    console.log('changed: ', e);
  }

  images = [
    'https://medypharmasist.com/wp-content/uploads/2022/06/banner1.jpg',
    'https://zeelabpharmacy.com/public/img/home_order.png',
    'https://th.bing.com/th/id/OIP.gfccJ4fRYrsbolNOvJuyswHaDX?rs=1&pid=ImgDetMain',
    'https://i.pinimg.com/originals/5f/68/87/5f6887f6061b674e822c3340622c25f4.png',
    'https://livinghealthy24.com/manager/assets/images/offer4.png',
  ];

  image1 = [
    'https://www.flaticon.com/free-icon/chat-bubbles_13874995?k=1717093363603&log-in=google',
  ];
  image2 = [
    'https://www.flaticon.com/free-icon/yes_1582114?term=hand+press&page=3&position=26&origin=search&related_id=1582114',
  ];
  image3 = [
    'https://www.flaticon.com/free-icon/delivery-boy_2331708?term=delivery+motorbike&page=1&position=28&origin=search&related_id=2331708',
  ];
  image4 = [
    'https://www.flaticon.com/free-icon/delivery-box_6615107?term=delivery+package&page=1&position=6&origin=search&related_id=6615107',
  ]

}
