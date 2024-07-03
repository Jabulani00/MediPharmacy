import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {

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

    goToCOVID19(){
      {this.router.navigate(['/covid19']).then(() => {window.location.reload();});  
    }}

}
