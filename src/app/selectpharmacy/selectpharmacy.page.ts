import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-selectpharmacy',
  templateUrl: './selectpharmacy.page.html',
  styleUrls: ['./selectpharmacy.page.scss'],
})
export class SelectpharmacyPage implements OnInit {

  image1="https://static.za-specials.com/images/shops/dis-chem-thumbnail.png";
  image2="https://iconape.com/wp-content/files/is/264213/svg/264213.svg";
  image3="https://www.pngkey.com/png/full/352-3520039_pharmacy-logos-medirite-medirite-logo-png.png";
  image4="https://tse1.mm.bing.net/th?id=OIP.pCj8keMmT_SnhYUe13EaQQHaHa&pid=Api&P=0&h=220";
  image5="https://www.alphapharmacies.co.za/wp-content/uploads/2020/11/Alpha-Pharm-Logo-FAQ.png";
  image6="https://img.offers-cdn.net/assets/uploads/stores/za/logos/200x72/pick-n-pay-pharmacy.jpg";
  image7="https://www.thinklocal.co.za/images/D2OS73vPxeT6zRcW/424846377546296_163_fs.jpg";
  image8="https://ssmscdn.yp.ca/image/resize/1b3d0d6c-6c81-40d7-aaef-683fddcbd994/ypui-d-mp-pic-gal-lg/the-medicine-shoppe-pharmacy-1.jpg";
  image9="https://www.healthpoint.co.nz/assets/resized/aa/a5nj4mmf5umz92oyduw2-0-270-0-270.jpg?k=8033d0ff45";
  image10="https://tse1.mm.bing.net/th?id=OIP.I8TzMkKdarl56T219n4WLgAAAA&pid=Api&P=0&h=220";

  constructor(private router: Router, private loadingController: LoadingController, private menu: MenuController, private platform: Platform) { }

  ngOnInit() {
  }

  goToDischemPharmacy()
  {
    this.router.navigate(['/dischempharmacy']).then(() => {window.location.reload();});
  }

  goToClicksPharmacy()
  {
    this.router.navigate(['/clickspharmacy']).then(() => {window.location.reload();});
  }

  goToLinkPharmacy()
  {
    this.router.navigate(['/linkpharmacy']).then(() => {window.location.reload();});
  }

  goToMediritePharmacy()
  {
    this.router.navigate(['/mediritepharmacy']).then(() => {window.location.reload();});
  }

  goToAlphaPharmacy()
  {
    this.router.navigate(['/alphapharmacy']).then(() => {window.location.reload();});
  }

  goToPicknPayPharmacy()
  {
    this.router.navigate(['/picknpaypharmacy']).then(() => {window.location.reload();});
  }

  goToNetcarePharmacy()
  {
    this.router.navigate(['/netcarepharmacy']).then(() => {window.location.reload();});
  }

  goToMedicineShoppePharmacy()
  {
    this.router.navigate(['/medicineshoppepharmacy']).then(() => {window.location.reload();});
  }

  goToPharmacistDirect()
  {
    this.router.navigate(['/pharmacistdirect']).then(() => {window.location.reload();});
  }

  goToSpringbokPharmacy()
  {
    this.router.navigate(['/springbokpharmacy']).then(() => {window.location.reload();});
  }


}
