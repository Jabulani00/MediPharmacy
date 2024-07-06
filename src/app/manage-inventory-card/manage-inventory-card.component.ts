import { Component, OnInit } from '@angular/core';

interface InventoryItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-manage-inventory-card',
  templateUrl: './manage-inventory-card.component.html',
  styleUrls: ['./manage-inventory-card.component.scss'],
})
export class ManageInventoryCardComponent implements OnInit {
  newItem: InventoryItem = {
    name: '',
    quantity: 0,
    price: 0,
  };

  inventory: InventoryItem[] = [];
  showInventory: boolean = false;

  constructor() { }

  ngOnInit() {}

  addItem() {
    if (this.newItem.name && this.newItem.quantity > 0 && this.newItem.price > 0) {
      this.inventory.push({ ...this.newItem });
      this.newItem = { name: '', quantity: 0, price: 0 };
    }
  }

  removeItem(item: InventoryItem) {
    const index = this.inventory.indexOf(item);
    if (index > -1) {
      this.inventory.splice(index, 1);
    }
  }

  toggleInventory() {
    this.showInventory = !this.showInventory;
  }
}
