import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-terms-andconditions',
  templateUrl: './terms-andconditions.page.html',
  styleUrls: ['./terms-andconditions.page.scss'],
})
export class TermsAndconditionsPage implements OnInit {

  constructor(private router: Router,
    private menu: MenuController,
    private platform: Platform) { }

    closeMenu(event: Event): void {
      this.menu.close('main-content');
      event.stopPropagation();
    }  

    ngOnInit(): void {
      this.platform.backButton.subscribeWithPriority(0, () => {
        this.menu.isOpen('main-content').then(isOpen => {
          if (isOpen) {
            this.menu.close('main-content');
          }
        });
      });
  
      document.getElementById('backButton')?.addEventListener('click', this.goBack.bind(this));
    }
  
    getQueryParam(param: string): string | null {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
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

}
