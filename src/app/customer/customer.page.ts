import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  constructor(
    private router: Router, 
    private menu: MenuController, 
    private platform: Platform
  ) { }

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
    this.router.navigate(['/signup']);
  }

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
  // goToHOMEpage(){
  //   {this.router.navigate(['/home']).then(() => {window.location.reload();});  
  // }}
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

  
  image1 = 'https://img.icons8.com/?size=100&id=96378&format=png&color=000000';
  image2 = 'https://img.icons8.com/?size=100&id=96369&format=png&color=000000';
  image3 = 'https://img.icons8.com/?size=100&id=3KZLbUW2c5k8&format=png&color=000000';
  image4 = 'https://img.icons8.com/?size=100&id=w2QWoSZwRbBC&format=png&color=000000';
  image5 = 'https://img.icons8.com/?size=100&id=IqOjfaWLBgco&format=png&color=000000';
  image6 = 'https://img.icons8.com/?size=100&id=YiP7pNVh3jYW&format=png&color=000000';


}
