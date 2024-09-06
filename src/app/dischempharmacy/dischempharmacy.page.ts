import { Component, OnInit } from '@angular/core';
import { PharmacyService } from '../services/pharmacy.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { CartServiceService } from '../services/cart-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dischempharmacy',
  templateUrl: './dischempharmacy.page.html',
  styleUrls: ['./dischempharmacy.page.scss'],
})
export class DischemPharmacyPage implements OnInit {
  pharmacies: any[] = [];
  categories: string[] = ['Anti-inflammatory', 'Pain and fever', 'Suppositories', 'Rubs & Ointments', 'Gout', 'Migraine', 'Aspirins'];
  products: any[] = [];
  filteredProducts: any[] = [];
  showProductSection: boolean = false;
  selectedPharmacy: any = null;
  selectedProduct: any = null;
  specialInstructions: string = '';
  quantity: number = 1;
  totalAmount: number = 0;
  isProductModalOpen: boolean = false;

  userEmail: string | null = null;  // Store the logged-in user's email

  constructor(
    private router: Router,
    private menu: MenuController,
    private platform: Platform,
    private pharmacyService: PharmacyService,
    private modalController: ModalController,
    private cartService: CartServiceService,
    private afAuth: AngularFireAuth  // Inject AngularFireAuth to get the logged-in user's details
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userEmail = user.email;  // Set the logged-in user's email
        this.getDischemPharmacies();
        this.getProducts();
      } else {
        // If user is not logged in, redirect to login page
        this.router.navigate(['/login']);
      }
    });

    this.platform.backButton.subscribeWithPriority(0, () => {
      this.menu.isOpen('main-content').then(isOpen => {
        if (isOpen) {
          this.menu.close('main-content');
        }
      });
    });

    document.getElementById('backButton')?.addEventListener('click', () => this.goBack());
  }

  image1 = "https://static.za-specials.com/images/shops/dis-chem-thumbnail.png";

  getDischemPharmacies() {
    this.pharmacyService.getPharmaciesByBrand('Dischem Pharmacy').subscribe(data => {
      this.pharmacies = data;
    });
  }

  getProducts() {
    this.pharmacyService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  selectPharmacy(pharmacy: any) {
    console.log('Selected pharmacy:', pharmacy);
    this.openProductSection(pharmacy);
  }

  goToShop(pharmacy: any) {
    console.log(`Going to shop for pharmacy: ${pharmacy.name}`);
    this.selectedPharmacy = pharmacy;
    this.openProductSection(pharmacy);
  }

  openProductSection(pharmacy: any) {
    console.log('Opening product section for:', pharmacy.name);
    this.selectedPharmacy = pharmacy;
    this.showProductSection = true;
    this.filteredProducts = this.products;
  }

  selectCategory(category: string) {
    console.log('Category selected:', category);
    this.filteredProducts = this.products.filter(product => product.category === category);
    this.showProductSection = true;
  }

  async openProductModal(product: any) {
    this.selectedProduct = product;
    this.quantity = 1; // Default quantity is 1
    this.totalAmount = product.price; // Initialize totalAmount to the product price
    this.isProductModalOpen = true;
  }

  closeProductModal() {
    this.isProductModalOpen = false;
  }

  updateTotal() {
    if (this.selectedProduct && typeof this.selectedProduct.price === 'number') {
      this.totalAmount = this.selectedProduct.price * this.quantity;
    } else {
      console.error('Invalid price or quantity:', this.selectedProduct?.price, this.quantity);
      this.totalAmount = 0; // Default to 0 or some other fallback value
    }
  }

  addToCart() {
    if (this.userEmail) {
      this.cartService.addItem(this.userEmail, this.selectedProduct, this.quantity);
      this.closeProductModal();
    } else {
      console.error('User is not logged in, unable to add to cart');
      this.router.navigate(['/login']);  // Redirect to login if the user is not authenticated
    }
  }

  goBack(): void {
    const source = this.getQueryParam('source');
    if (source === 'home') {
      this.router.navigateByUrl('/home');
    } else if (source === 'home-second') {
      this.router.navigateByUrl('/home-second');
    } else {
      window.history.back();
    }
  }

  closeMenu(event: Event): void {
    this.menu.close('main-content');
    event.stopPropagation();
  }

  goToHOMESECOND() {
    this.router.navigate(['/home-second']).then(() => window.location.reload());
  }

  goToABOUTMEDDASH() {
    this.router.navigate(['/about-med-dash']).then(() => window.location.reload());
  }

  goToHELP() {
    this.router.navigate(['/help']).then(() => window.location.reload());
  }

  goToShoppingcart() {
    this.router.navigate(['/shoppingcart']).then(() => window.location.reload());
  }

  getQueryParam(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  viewShoppingCart() {
    if (this.userEmail) {
      // Load cart items specific to the logged-in customer
      this.cartService.getCartItems(this.userEmail).subscribe(items => {
        // Assuming you're navigating to a shopping cart page
        this.router.navigate(['/shoppingcart']).then(() => {
          window.location.reload(); // Reload to ensure cart items are displayed
        });
      });
    } else {
      // Handle the case where the user email is not available
      console.error('User email is not available.');
    }
  }

}
