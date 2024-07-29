// export class Pharmacy {
//     id: string;
//     firstname: string;
//     lastname: string;
//     idnumber: string;
//     email: string;
//     phone: string;
//     password: string;
//     confirm_password: string;
//     pharmacyinsurance: string;
//     registration: string;
//     certificate: string;
//     proofOfAddress: string;
//     streetAddress: string;
//     province: string;
//     region: string;
//     pharmacyBrandType: string;
//     openingHoursMonFri: string;
//     closingHoursMonFri: string;
//     openingHoursSat: string;
//     closingHoursSat: string;
//     openingHoursHolidays: string;
//     closingHoursHolidays: string;
  
//     constructor(
//       id: string,
//       firstname: string,
//       lastname: string,
//       idnumber: string,
//       email: string,
//       phone: string,
//       password: string,
//       confirm_password: string,
//       pharmacyinsurance: string,
//       registration: string,
//       certificate: string,
//       proofOfAddress: string,
//       streetAddress: string,
//       province: string,
//       region: string,
//       pharmacyBrandType: string,
//       openingHoursMonFri: string,
//       closingHoursMonFri: string,
//       openingHoursSat: string,
//       closingHoursSat: string,
//       openingHoursHolidays: string,
//       closingHoursHolidays: string
//     ) {
//       this.id = id;
//       this.firstname = firstname;
//       this.lastname = lastname;
//       this.idnumber = idnumber;
//       this.email = email;
//       this.phone = phone;
//       this.password = password;
//       this.confirm_password = confirm_password;
//       this.pharmacyinsurance = pharmacyinsurance;
//       this.registration = registration;
//       this.certificate = certificate;
//       this.proofOfAddress = proofOfAddress;
//       this.streetAddress = streetAddress;
//       this.province = province;
//       this.region = region;
//       this.pharmacyBrandType = pharmacyBrandType;
//       this.openingHoursMonFri = openingHoursMonFri;
//       this.closingHoursMonFri = closingHoursMonFri;
//       this.openingHoursSat = openingHoursSat;
//       this.closingHoursSat = closingHoursSat;
//       this.openingHoursHolidays = openingHoursHolidays;
//       this.closingHoursHolidays = closingHoursHolidays;
//     }
//   }
  
// src/app/pharmacy.model.ts
export interface Pharmacy {
    id: string;
    firstname: string;
    lastname: string;
    idnumber: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
    pharmacyinsurance: string;
    registration: string;
    certificate: string;
    proofOfAddress: string;
    streetAddress: string;
    province: string;
    region: string;
    pharmacyBrandType: string;
    openingHoursMonFri: string;
    closingHoursMonFri: string;
    openingHoursSat: string;
    closingHoursSat: string;
    openingHoursHolidays: string;
    closingHoursHolidays: string;
    role: string;  // Added role here
    status: string; // Added status here
  }
  