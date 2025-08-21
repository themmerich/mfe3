import {ComponentRef, createComponent, NgZone} from '@angular/core';
import {AppComponent} from './app.component';
import {createApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

export class AngularWebComponent extends HTMLElement {
  private componentRef: ComponentRef<AppComponent> | null = null;
  private host?: HTMLDivElement;

  async connectedCallback() {
    this.host = document.createElement('div');


    const appRef = await createApplication({
      providers: [
        (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone }: [],
        provideRouter(routes),
      ]
    });

    // create component
    this.componentRef = createComponent(AppComponent, {
      environmentInjector: appRef.injector,
      hostElement: this.host
    })

    // append to DOM
    this.appendChild(this.host);
  }

  disconnectedCallback() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
