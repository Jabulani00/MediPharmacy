import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { MenuController, Platform } from '@ionic/angular';

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
  
  // Additional fields for province, region, and working hours
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

  // Additional fields for document uploads
  // CUSTOMER DOC
  CustomerIDdoc: File | null = null;
  CustomerProofofAddress: File | null = null;
  CustomerBankStatement: File | null = null;

  // DRIVER DOC
  vehicleDoc: File | null = null;
  driverIDdocument: File | null = null;
  licenseDoc: File | null = null;
  pdpDoc: File | null = null;
  DrievrInsuranceDocuments: File | null = null;

  // PHARMACY DOC
  PharmacyInsuranceDocuments: File | null = null;
  registrationDoc: File | null = null;
  certificateDoc: File | null = null;
  proofOfAddressDoc: File | null = null;

  // DISPATCHER DOC
  dispatcherResume: File | null = null;
  dispatcherIDdocument: File | null = null;
  dispacherSAPSdocumnts: File | null = null;
  dispatcherInsuranceDocuments: File | null = null;

  provinces: string[] = [
    'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Gauteng',
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  regions: string[] = [

      '--Gauteng-- City of Johannesburg Metropolitan Municipality',
      '--Gauteng-- City of Tshwane Metropolitan Municipality',
      '--Gauteng-- Ekurhuleni Metropolitan Municipality',
      '--Gauteng-- Sedibeng District Municipality',
      
      '--KwaZulu-Natal-- eThekwini Metropolitan Municipality',
      '--KwaZulu-Natal-- iLembe District Municipality',
      '--KwaZulu-Natal-- King Cetshwayo District Municipality',
      '--KwaZulu-Natal-- Ugu District Municipality',
      '--KwaZulu-Natal-- uMgungundlovu District Municipality',
      '--KwaZulu-Natal-- uMkhanyakude District Municipality',
      '--KwaZulu-Natal-- uMzinyathi District Municipality',
      '--KwaZulu-Natal-- uThukela District Municipality',
      '--KwaZulu-Natal-- Zululand District Municipality',
      
      '--Eastern Cape-- Amatole',
      '--Eastern Cape-- Chris Hani',
      '--Eastern Cape-- Joe Gqabi',
      '--Eastern Cape-- Nelson Mandela Bay Metro',
      '--Eastern Cape--O.R. Tambo',
      '--Eastern Cape-- Sarah Baartman',
      
      '--Free State-- Fezile Dabi',
      '--Free State-- Lejweleputswa',
      '--Free State-- Mangaung',
      '--Free State-- Thabo Mofutsanyana',
      
      '--Limpopo-- Capricorn District Municipality',
      '--Limpopo-- Mopani District Municipality',
      '--Limpopo-- Sekhukhune District Municipality',
      '--Limpopo-- Vhembe District Municipality',
      '--Limpopo-- Waterberg District Municipality',
          
      '--Mpumalanga-- Ehlanzeni District Municipality',
      '--Mpumalanga-- Gert Sibande District Municipality',
      '--Mpumalanga-- Nkangala District Municipality',
      
      '--Northern Cape-- Frances Baard District Municipality',
      '--Northern Cape-- John Taolo Gaetsewe District Municipality',
      '--Northern Cape-- Namakwa District Municipality',
      '--Northern Cape-- Pixley ka Seme District Municipality',
      
      '--North West-- Bojanala Platinum District Municipality',
      '--North West-- Dr Kenneth Kaunda District Municipality',
      '--North West-- Dr Ruth Segomotsi Mompati District Municipality',
      '--North West-- Ngaka Modiri Molema District Municipality',
      
      '--Western Cape-- Cape Winelands District Municipality',
      '--Western Cape-- Central Karoo District Municipality',
      '--Western Cape-- City of Cape Town Metropolitan Municipality',
      '--Western Cape-- Garden Route District Municipality',
      '--Western Cape-- Overberg District Municipality',
      '--Western Cape-- West Coast District Municipality'
    ];


  pharmacyBrandTypes: string[] = [
    'Dischem Pharmacy', 
    'Clicks Pharmacy', 
    'Medirite Pharmacy', 
    'Link Pharmacy',
    'Alpha Pharmacy', 
    'Pick n Pay Pharmacy', 
    'Netcare Pharmacy', 
    'Medicine Shoppe Pharmacy',
    'Pharmacist Direct', 
    'Springbok Pharmacy'
  ];

  times: string[] = [
    '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  constructor(
    private db: AngularFirestore,
    private Auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private menu: MenuController,
    private platform: Platform
  ) {}

  ngOnInit() {
    // TODO: Implement ngOnInit lifecycle method
    // This is a placeholder comment to avoid lint errors
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

    if (this.selectedRole === 'Driver' 
      && (
        !this.vehicleDoc || 
        !this.driverIDdocument ||
        !this.licenseDoc || 
        !this.pdpDoc
      )) {
      this.presentAlert("Please upload all required documents for Driver role");
      return;
    }
    if (this.selectedRole === 'Pharmacy' 
      && (
        !this.registrationDoc || 
        !this.certificateDoc || 
        !this.proofOfAddressDoc 
      )) {
      this.presentAlert("Please upload all required documents for Pharmacy role");
      return;
    }
    if (this.selectedRole === 'Dispatcher' 
      && (
        !this.dispatcherResume ||
        !this.dispatcherIDdocument ||
        !this.dispacherSAPSdocumnts ||
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

        // Add role-specific data
        // DRIVER DOC
        if (this.selectedRole === 'Driver') {
          userData.vehicleDoc = this.vehicleDoc ? await this.uploadFile(this.vehicleDoc) : null;
          userData.driverIDdocument = this.driverIDdocument ? await this.uploadFile(this.driverIDdocument) : null;
          userData.licenseDoc = this.licenseDoc ? await this.uploadFile(this.licenseDoc) : null;
          userData.pdpDoc = this.pdpDoc ? await this.uploadFile(this.pdpDoc) : null;  
          userData.DrievrInsuranceDocuments = this.DrievrInsuranceDocuments ? await this.uploadFile(this.DrievrInsuranceDocuments) : null;
        } 
        // CUSTOMER DOC
        else if (this.selectedRole === 'Customer') {
          userData.CustomerIDdoc = this.CustomerIDdoc ? await this.uploadFile(this.CustomerIDdoc) : null;
          userData.CustomerProofofAddress = this.CustomerProofofAddress ? await this.uploadFile(this.CustomerProofofAddress) : null;
          userData.CustomerBankStatement = this.CustomerBankStatement ? await this.uploadFile(this.CustomerBankStatement) : null;
        }
        // PHARMACY DOC
        else if (this.selectedRole === 'Pharmacy') {
          userData.PharmacyInsuranceDocuments = this.PharmacyInsuranceDocuments ? await this.uploadFile(this.PharmacyInsuranceDocuments) : null;
          userData.registrationDoc = this.registrationDoc ? await this.uploadFile(this.registrationDoc) : null;
          userData.certificateDoc = this.certificateDoc ? await this.uploadFile(this.certificateDoc) : null;
          userData.proofOfAddressDoc = this.proofOfAddressDoc ? await this.uploadFile(this.proofOfAddressDoc) : null;

          // Province, region, and working hours data
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
          userData.dispacherSAPSdocumnts = this.dispacherSAPSdocumnts ? await this.uploadFile(this.dispacherSAPSdocumnts) : null;
          userData.dispatcherInsuranceDocuments = this.dispatcherInsuranceDocuments ? await this.uploadFile(this.dispatcherInsuranceDocuments) : null;
        }

        await this.db.collection('Users').add(userData);
        loader.dismiss();
        console.log('User data added successfully');
        this.router.navigate(['/profile']).then(() => {window.location.reload();});
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
      case 'driverinsurance':
        this.DrievrInsuranceDocuments = file;
        break;
      case 'vehicle':
        this.vehicleDoc = file;
        break;
      case 'license':
        this.licenseDoc = file;
        break;
      case 'iddocument':
        this.dispatcherIDdocument = file;
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
        this.dispacherSAPSdocumnts = file;
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
}
