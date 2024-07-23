import { Component, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/dischempharmacy/models/pharmacy.model'; // Adjust the import path as necessary
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-dischempharmacy',
  templateUrl: './dischempharmacy.page.html',
  styleUrls: ['./dischempharmacy.page.scss'],
})
export class DischempharmacyPage implements OnInit {

  pharmacies: Pharmacy[] = [];
  filteredPharmacies: Pharmacy[] = [];
  selectedProvince: string = '';
  selectedRegion: string = '';
  streetAddress: string = '';

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

  constructor(
    private db: AngularFirestore

  ) {}

  ngOnInit() {
   
  }

  image1 = "https://static.za-specials.com/images/shops/dis-chem-thumbnail.png";
}
