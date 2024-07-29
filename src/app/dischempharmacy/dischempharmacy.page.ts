import { Component, OnInit } from '@angular/core';
import { PharmacyService } from '../services/pharmacy.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dischempharmacy',
  templateUrl: './dischempharmacy.page.html',
  styleUrls: ['./dischempharmacy.page.scss'],
})
export class DischemPharmacyPage implements OnInit {
  pharmacies: any[] = [];
  categories: string[] = ['Anti-inflammatory', 'Pain and fever', 'Suppositories', 'Rubs & Ointments', 'Gout', 'Migraine', 'Aspirins'];
  products: any[] = []; // Full list of products
  filteredProducts: any[] = [];
  showProductSection: boolean = false;
  selectedPharmacy: any = null;
  selectedProduct: any = null;
  specialInstructions: string = '';
  quantity: number = 1;
  totalAmount: number = 0;
  isProductModalOpen: boolean = false;

  constructor(
    private pharmacyService: PharmacyService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getDischemPharmacies();
    this.getProducts(); // Load products when component initializes
  }

  getDischemPharmacies() {
    this.pharmacyService.getPharmaciesByBrand('Dischem Pharmacy').subscribe(data => {
      this.pharmacies = data;
    });
  }

  getProducts() {
    this.pharmacyService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data; // Initialize filteredProducts with all products
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
    // You might need to filter or load products based on the selected pharmacy
    this.filteredProducts = this.products; // Initially show all products
  }

  selectCategory(category: string) {
    console.log('Category selected:', category);
    this.filteredProducts = this.products.filter(product => product.category === category);
    this.showProductSection = true;
  }

  image1 = "https://static.za-specials.com/images/shops/dis-chem-thumbnail.png";
  
  async openProductModal(product: any) {
    this.selectedProduct = product;
    this.totalAmount = product.price;
    this.isProductModalOpen = true;
  }

  closeProductModal() {
    this.isProductModalOpen = false;
  }

  updateTotal() {
    this.totalAmount = this.selectedProduct.price * this.quantity;
  }

  addToCart() {
    // Implement the logic to add product to cart
    console.log(`Added ${this.quantity} of ${this.selectedProduct.name} to cart.`);
    this.closeProductModal();
    // Display toast notification (implement as needed)
  }
  
}
