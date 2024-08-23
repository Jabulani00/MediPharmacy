import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { MenuController, Platform } from '@ionic/angular';

import { Pharmacy } from 'src/app/dischempharmacy/models/pharmacy.model';
import { PharmacyService } from 'src/app/services/pharmacy.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  selectedRole: string = '';
  
  firstname: string = '';
  lastname: string = '';
  idnumber: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirm_password: string = '';

  // CUSTOMER DOC
  CustomerIDdoc: File | null = null;
  CustomerProofofAddress: File | null = null;
  CustomerBankStatement: File | null = null;

  // DRIVER DOC
  vehicleDoc: File | null = null;
  driverIDdocument: File | null = null;
  licenseDoc: File | null = null;
  pdpDoc: File | null = null;
  DriverInsuranceDocuments: File | null = null;

  // PHARMACY DOC
  PharmacyInsuranceDocuments: File | null = null;
  registrationDoc: File | null = null;
  certificateDoc: File | null = null;
  proofOfAddressDoc: File | null = null;

  // DISPATCHER DOC
  dispatcherResume: File | null = null;
  dispatcherIDdocument: File | null = null;
  dispatcherSAPSdocuments: File | null = null;
  dispatcherInsuranceDocuments: File | null = null;

  /*********************FIELDS FOR PHARMACY REGISTRATION*********************/
  
  // province, 
  // region, 
  // street address 
  // working hours.
  selectedProvince: string = '';
  selectedRegion: string = '';
  streetAddress: string = '';
  pharmacyBrandType: string = '';
  openingHoursMonFri: string = '';
  closingHoursMonFri: string = '';
  openingHoursSat: string = '';
  closingHoursSat: string = '';
  openingHoursHolidays: string = '';
  closingHoursHolidays: string = '';

  /********************************************PHARMACY BY PROVINCES**************************************/
  provinces = [
    { label: 'Province 1', value: 'KwaZulu-Natal' },
    { label: 'Province 2', value: 'Eastern Cape' },
    { label: 'Province 3', value: 'Free State' },
    { label: 'Province 4', value: 'Gauteng' },
    { label: 'Province 5', value: 'Limpopo' },
    { label: 'Province 6', value: 'Mpumalanga' },
    { label: 'Province 7', value: 'Northern Cape' },
    { label: 'Province 8', value: 'North West' },
    { label: 'Province 9', value: 'Western Cape' },
  ];
  /********************************************PHARMACY BY PROVINCES**************************************/


  /********************************************PHARMACY BY REGIONS**************************************/
  regions = [
    { label: 'Region 1', value: '--Gauteng-- City of Johannesburg Metropolitan Municipality' },
    { label: 'Region 2', value: '--Gauteng-- City of Tshwane Metropolitan Municipality' },
    { label: 'Region 3', value: '--Gauteng-- Ekurhuleni Metropolitan Municipality' },
    { label: 'Region 4', value: '--Gauteng-- Sedibeng District Municipality' },
    { label: 'Region 5', value: '--KwaZulu-Natal-- eThekwini Metropolitan Municipality' },
    { label: 'Region 6', value: '--KwaZulu-Natal-- iLembe District Municipality' },
    { label: 'Region 7', value: '--KwaZulu-Natal-- King Cetshwayo District Municipality' },
    { label: 'Region 8', value: '--KwaZulu-Natal-- Ugu District Municipality' },
    { label: 'Region 9', value: '--KwaZulu-Natal-- uMgungundlovu District Municipality' },
    { label: 'Region 10', value: '--KwaZulu-Natal-- uMkhanyakude District Municipality' },
    { label: 'Region 11', value: '--KwaZulu-Natal-- uMzinyathi District Municipality' },
    { label: 'Region 12', value: '--KwaZulu-Natal-- uThukela District Municipality' },
    { label: 'Region 13', value: '--KwaZulu-Natal-- Zululand District Municipality' },
    { label: 'Region 14', value: '--Eastern Cape-- Amatole' },
    { label: 'Region 15', value: '--Eastern Cape-- Chris Hani' },
    { label: 'Region 16', value: '--Eastern Cape-- Joe Gqabi' },
    { label: 'Region 17', value: '--Eastern Cape-- Nelson Mandela Bay Metro' },
    { label: 'Region 18', value: '--Eastern Cape-- O.R. Tambo' },
    { label: 'Region 19', value: '--Eastern Cape-- Sarah Baartman' },
    { label: 'Region 20', value: '--Free State-- Fezile Dabi' },
    { label: 'Region 21', value: '--Free State-- Lejweleputswa' },
    { label: 'Region 22', value: '--Free State-- Mangaung' },
    { label: 'Region 23', value: '--Free State-- Thabo Mofutsanyana' },
    { label: 'Region 24', value: '--Limpopo-- Capricorn District Municipality' },
    { label: 'Region 25', value: '--Limpopo-- Mopani District Municipality' },
    { label: 'Region 26', value: '--Limpopo-- Sekhukhune District Municipality' },
    { label: 'Region 27', value: '--Limpopo-- Vhembe District Municipality' },
    { label: 'Region 28', value: '--Limpopo-- Waterberg District Municipality' },
    { label: 'Region 29', value: '--Mpumalanga-- Ehlanzeni District Municipality' },
    { label: 'Region 30', value: '--Mpumalanga-- Gert Sibande District Municipality' },
    { label: 'Region 31', value: '--Mpumalanga-- Nkangala District Municipality' },
    { label: 'Region 32', value: '--Northern Cape-- Frances Baard District Municipality' },
    { label: 'Region 33', value: '--Northern Cape-- John Taolo Gaetsewe District Municipality' },
    { label: 'Region 34', value: '--Northern Cape-- Namakwa District Municipality' },
    { label: 'Region 35', value: '--Northern Cape-- Pixley ka Seme District Municipality' },
    { label: 'Region 36', value: '--North West-- Bojanala Platinum District Municipality' },
    { label: 'Region 37', value: '--North West-- Dr Kenneth Kaunda District Municipality' },
    { label: 'Region 38', value: '--North West-- Dr Ruth Segomotsi Mompati District Municipality' },
    { label: 'Region 39', value: '--North West-- Ngaka Modiri Molema District Municipality' },
    { label: 'Region 40', value: '--Western Cape-- Cape Winelands District Municipality' },
    { label: 'Region 41', value: '--Western Cape-- Central Karoo District Municipality' },
    { label: 'Region 42', value: '--Western Cape-- City of Cape Town Metropolitan Municipality' },
    { label: 'Region 43', value: '--Western Cape-- Garden Route District Municipality' },
    { label: 'Region 44', value: '--Western Cape-- Overberg District Municipality' },
    { label: 'Region 45', value: '--Western Cape-- West Coast District Municipality' },
  ];
  /********************************************PHARMACY BY REGIONS**************************************/

  /*************PHARMACY BRANDTYPES***********/
  pharmacyBrandTypes = [
    {value:'Dischem Pharmacy'}, 
    {value:'Clicks Pharmacy'}, 
    {value:'Medirite Pharmacy'}, 
    {value:'Link Pharmacy'},
    {value:'Alpha Pharmacy'}, 
    {value:'Pick n Pay Pharmacy'}, 
    {value:'Netcare Pharmacy'}, 
    {value:'Medicine Shoppe Pharmacy'},
    {value:'Pharmacist Direct'}, 
    {value:'Springbok Pharmacy'},
  ];
  /*************PHARMACY BRANDTYPES***********/

  /*************WORKING HOURS***********/
  times: Array<{ value: string }> = [
    { value: '00:00 AM' },
    { value: '01:00 AM' },
    { value: '02:00 AM' },
    { value: '03:00 AM' },
    { value: '04:00 AM' },
    { value: '05:00 AM' },
    { value: '06:00 AM' },
    { value: '07:00 AM' },
    { value: '08:00 AM' },
    { value: '09:00 AM' },
    { value: '10:00 AM' },
    { value: '12:00 PM' },
    { value: '13:00 PM' },
    { value: '14:00 PM' },
    { value: '15:00 PM' },
    { value: '16:00 PM' },
    { value: '17:00 PM' },
    { value: '18:00 PM' },
    { value: '19:00 PM' },
    { value: '20:00 PM' },
    { value: '21:00 PM' },
    { value: '22:00 PM' },
    { value: '23:00 PM' },
  ];
  /*************WORKING HOURS***********/

  /*********************FIELDS FOR PHARMACY REGISTRATION*********************/

  constructor(
    private db: AngularFirestore,
    
    private Auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private menu: MenuController,
    private platform: Platform, 
    private pharmacyService: PharmacyService

  ) {}

  ngOnInit() {
    // TODO: Implement ngOnInit lifecycle method
    // This is a placeholder comment to avoid lint errors
  }

  validateRegion(): boolean {
    const selectedRegionProvince = this.selectedRegion.split('--')[1]?.trim();
    return selectedRegionProvince === this.selectedProvince;
  }

  closeMenu(event: Event){
    this.menu.close('main-content');
    event.stopPropagation();
  }

  async Register() {
    if (this.selectedRole == '') {
      this.presentAlert("Please select a role");
      return;
    }
    if (this.firstname == '') {
      this.presentAlert("Enter your first name");
      return;
    }
    if (this.lastname == '') {
      this.presentAlert("Enter your surname");
      return;
    }
    if (this.idnumber == '') {
      this.presentAlert("Enter your ID number");
      return;
    }
    if (this.email == '') {
      this.presentAlert("Enter email Address");
      return;
    }
    if (this.phone == '') {
      this.presentAlert("Enter your phone number");
      return;
    }
    if (this.password == '') {
      this.presentAlert("Enter password");
      return;
    }
    if (this.password !== this.confirm_password) {
      this.presentAlert("Passwords do not match");
      return;
    }

    // Validate role-specific documents
    if (this.selectedRole === 'Customer' 
      && (
        !this.CustomerIDdoc ||
        !this.CustomerProofofAddress ||
        !this.CustomerBankStatement
      )) {
        this.presentAlert("Please upload all required documents for Customer role");
        return;
      }

    // Validation check for Driver role
    if (this.selectedRole === 'Driver' 
      && (
      !this.vehicleDoc || 
      !this.driverIDdocument ||
      !this.licenseDoc || 
      !this.DriverInsuranceDocuments ||
      !this.pdpDoc
      )) {
        this.presentAlert("Please upload all required documents for the Driver role");      
        return;
    }
    if (this.selectedRole === 'Pharmacy' 
      && (
        !this.registrationDoc || 
        !this.certificateDoc || 
        !this.PharmacyInsuranceDocuments ||
        !this.proofOfAddressDoc 
      )) {
        this.presentAlert("Please upload all required documents for Pharmacy role");
      return;
    }
    if (this.selectedRole === 'Dispatcher' 
      && (
        !this.dispatcherResume ||
        !this.dispatcherIDdocument ||
        !this.dispatcherSAPSdocuments ||
        !this.dispatcherInsuranceDocuments
      )) {
        this.presentAlert("Please upload all required documents for Dispatcher role");
      return;
    }

    const loader = await this.loadingController.create({
      message: 'Registering you...',
      cssClass: 'custom-loader-class'
    });

    await loader.present();

    try {
      const userCredential = await this.Auth.createUserWithEmailAndPassword(this.email, this.password);
      if (userCredential.user) {
        const userData: any = {
          name: this.firstname,
          email: this.email,
          status: "pending",
          role: this.selectedRole,
        };

        if (this.selectedRole === 'Customer') {
          userData.CustomerIDdoc = this.CustomerIDdoc ? await this.uploadFile(this.CustomerIDdoc) : null;
          userData.CustomerProofofAddress = this.CustomerProofofAddress ? await this.uploadFile(this.CustomerProofofAddress) : null;
          userData.CustomerBankStatement = this.CustomerBankStatement ? await this.uploadFile(this.CustomerBankStatement) : null;
        }
        // DRIVER DOC
        else if (this.selectedRole === 'Driver') {
          userData.vehicleDoc = this.vehicleDoc ? await this.uploadFile(this.vehicleDoc) : null;
          userData.driverIDdocument = this.driverIDdocument ? await this.uploadFile(this.driverIDdocument) : null;
          userData.licenseDoc = this.licenseDoc ? await this.uploadFile(this.licenseDoc) : null;
          userData.DriverInsuranceDocuments = this.DriverInsuranceDocuments ? await this.uploadFile(this.DriverInsuranceDocuments) : null;
          userData.pdpDoc = this.pdpDoc ? await this.uploadFile(this.pdpDoc) : null;  
        } 

        // CUSTOMER DOC
        

        // PHARMACY DOC
        else if (this.selectedRole === 'Pharmacy') {
          userData.PharmacyInsuranceDocuments = this.PharmacyInsuranceDocuments ? await this.uploadFile(this.PharmacyInsuranceDocuments) : null;
          userData.registrationDoc = this.registrationDoc ? await this.uploadFile(this.registrationDoc) : null;
          userData.certificateDoc = this.certificateDoc ? await this.uploadFile(this.certificateDoc) : null;
          userData.proofOfAddressDoc = this.proofOfAddressDoc ? await this.uploadFile(this.proofOfAddressDoc) : null;

          // province, 
          // region, 
          // street address 
          // working hours.
          userData.province = this.selectedProvince;
          userData.region = this.selectedRegion;
          userData.streetAddress = this.streetAddress;
          userData.pharmacyBrandType = this.pharmacyBrandType;
          userData.openingHoursMonFri = this.openingHoursMonFri;
          userData.closingHoursMonFri = this.closingHoursMonFri;
          userData.openingHoursSat = this.openingHoursSat;
          userData.closingHoursSat = this.closingHoursSat;
          userData.openingHoursHolidays = this.openingHoursHolidays;
          userData.closingHoursHolidays = this.closingHoursHolidays;
        }

        // DISPATCHER
        else if (this.selectedRole === 'Dispatcher') {
          userData.dispatcherResume = this.dispatcherResume ? await this.uploadFile(this.dispatcherResume) : null;
          userData.dispatcherIDdocument = this.dispatcherIDdocument ? await this.uploadFile(this.dispatcherIDdocument) : null;
          userData.dispatcherSAPSdocuments = this.dispatcherSAPSdocuments ? await this.uploadFile(this.dispatcherSAPSdocuments) : null;
          userData.dispatcherInsuranceDocuments = this.dispatcherInsuranceDocuments ? await this.uploadFile(this.dispatcherInsuranceDocuments) : null;
        }

        await this.db.collection('Users').add(userData);
        loader.dismiss();
        console.log('User data added successfully');
        this.router.navigate(['/profile']);
      }
    } catch (error: any) {
      loader.dismiss();
      console.error('Error during registration:', error);
      this.presentAlert(error.message);
    }
  }
  

  async uploadFile(file: File): Promise<string> {
    const filePath = `documents/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    try {
      await task;
      const downloadURL = await fileRef.getDownloadURL().toPromise();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  onFileSelected(event: any, docType: string) {
    const file = event.target.files[0];
    switch (docType) {
      // DRIVER DOC
      case 'vehicle':
        this.vehicleDoc = file;
        break;
      case 'iddocumentDriver':
        this.driverIDdocument = file;
        break;
      case 'license':
        this.licenseDoc = file;
        break;
      case 'driverinsurance':
        this.DriverInsuranceDocuments = file;
        break;
      case 'pdp':
        this.pdpDoc = file;
        break;

      // PHARMACY DOC
      case 'pharmacyinsurance':
        this.PharmacyInsuranceDocuments = file;
        break;
      case 'registration':
        this.registrationDoc = file;
        break;
      case 'certificate':
        this.certificateDoc = file;
        break;
      case 'proofOfAddress':
        this.proofOfAddressDoc = file;
        break;

      // DISPATCHER DOC
      case 'resume':
        this.dispatcherResume = file;
        break;  
      case 'iddocument':
        this.dispatcherIDdocument = file;
        break;
      case 'sapsdocument':
        this.dispatcherSAPSdocuments = file;
        break;  
      case 'dispactherinsurance':
        this.dispatcherInsuranceDocuments = file;
        break;    

      // CUSTOMER DOC
      case 'customeriddocucment':
        this.CustomerIDdoc = file;
        break;  
      case 'proofofaddress':
        this.CustomerProofofAddress = file;
        break;
      case 'bankingdetails':
        this.CustomerBankStatement = file;
        break;  
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  onRoleChange() {
    // Reset form fields if a new role is selected
    this.firstname = '';
    this.lastname = '';
    this.idnumber = '';
    this.email = '';
    this.phone = '';
    this.password = '';
    this.confirm_password = '';
  }

  onProvinceChange() {
    if(this.selectedProvince = '' )
    {
      this.selectedRegion = '';
    }else{
       this.selectedRegion;
       return;
    }
   // Reset the region when the province changes
  }
}
