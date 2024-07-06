import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PharmacyPageRoutingModule } from './pharmacy-routing.module';

import { PharmacyPage } from './pharmacy.page';
import { ReactiveFormsModule } from '@angular/forms'; 

import { ManageInventoryCardComponent } from 'src/app/manage-inventory-card/manage-inventory-card.component';
import { ManageOrdersCardComponent } from 'src/app/manage-orders-card/manage-orders-card.component';
import { ManageDeliveryCardComponent } from 'src/app/manage-delivery-card/manage-delivery-card.component';
import { PrepareOrderCardComponent } from 'src/app/prepare-order-card/prepare-order-card.component';
import { GenerateReportCardComponent } from 'src/app/generate-report-card/generate-report-card.component';
import { ReportIssuesCardComponent } from 'src/app/report-issues-card/report-issues-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PharmacyPageRoutingModule
  ],
  declarations: [
    PharmacyPage,
    ManageInventoryCardComponent,
    ManageOrdersCardComponent,
    ManageDeliveryCardComponent,
    PrepareOrderCardComponent,
    GenerateReportCardComponent,
    ReportIssuesCardComponent
  ]
})
export class PharmacyPageModule {}
