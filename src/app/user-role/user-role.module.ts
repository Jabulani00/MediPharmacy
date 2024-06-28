import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserRolePageRoutingModule } from './user-role-routing.module';
import { UserRolePage } from './user-role.page';
import { UserDocumentsModalComponent } from '../user-documents-modal/user-documents-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRolePageRoutingModule
  ],
  declarations: [UserRolePage, UserDocumentsModalComponent]
})
export class UserRolePageModule {}