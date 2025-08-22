import {ComponentRef, createComponent, NgZone} from '@angular/core';
import {AppComponent} from './app.component';
import {createApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';

export class AngularWebComponent extends HTMLElement {
  private componentRef: ComponentRef<AppComponent> | null = null;
  private host?: HTMLDivElement;

  async connectedCallback() {
    // create host and append to DOM
    this.host ??= document.createElement('div');
    if (!this.host.isConnected) this.appendChild(this.host);

    // create application
    const appRef = await createApplication({
      providers: [
        (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone }: [],
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: Aura
          }
        })
      ]
    });

    // create component
    if (!this.componentRef) {
      this.componentRef = createComponent(AppComponent, {
        environmentInjector: appRef.injector,
        hostElement: this.host
      })
    }

    // run change detection
    appRef.attachView(this.componentRef.hostView);
    this.componentRef.changeDetectorRef.detectChanges();
  }

  // IMPORTANT: don't destroy here; route reuse temporarily disconnets us
  disconnectedCallback() {
    // no-op
  }

  // call this for real teardown
  dispose() {
    this.componentRef?.destroy();
    this.componentRef = null;
    this.host?.remove();
    this.host = undefined;
  }
}
