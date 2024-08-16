
import { Component, VERSION, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //https://stackoverflow.com/questions/49629712/how-to-reset-refresh-tab-body-data-in-angular-material-if-user-move-from-one-tab
  name = 'Angular ' + VERSION.major;
  win: Window;
  @ViewChild(AppComponent) private appComponent: AppComponent;
change: string = 'no change'

  constructor(private router: Router) {
    
  }

  open() {
    const windowsid = 'newwindow';
    localStorage.setItem('openwindowId', windowsid);
    this.win = window.open(
      'https://docs.google.com/viewerng/viewer?url=https://files.fm/down.php?i%3Dsdymh2y6',
      windowsid
    );
   window.onvrdisplayfocus = this.refreshParent
    console.log(window.name)
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  close() {
    const name = localStorage.getItem('openwindowId');
    window.name = name;
    window.open('', localStorage.getItem('openwindowId')).close();
    window.close();
    if (name) {
      localStorage.removeItem(name);
    }
  }

  refreshParent() {
       // window.location.reload();
        this.change = 'change'
        console.log('change')
    }
}
