import {ComponentRef, NgZone} from '@angular/core';
import {AppComponent} from './app.component';
import {createApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

export class AngularWebComponent extends HTMLElement {
  private componentRef: ComponentRef<AppComponent> | null = null;
  private ngZone: NgZone | null = null;

  /*static get observedAttributes() {
    return ['title', 'message']; // Add your component's @Input properties
  }*/

  async connectedCallback() {
    const appRef = await createApplication({
      providers: [
        (globalThis as any).ngZone ? { provide: NgZone, useValue: (globalThis as any).ngZone }: [],
        provideRouter(routes),
        // add your providers here
      ]
    });

    this.ngZone = appRef.injector.get(NgZone);

    // create component
    this.componentRef = appRef.components.length > 0 ? appRef.components[0] as ComponentRef<AppComponent> : appRef.bootstrap(AppComponent);

    // set initial properties
    //this.updateComponentInputs();

    // subcribe to outputs
    //this.setupOutputListeners();

    // append to DOM
    this.appendChild(this.componentRef.location.nativeElement);
  }

  disconnectedCallback() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  /*attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue && this.componentRef) {
      this.updateComponentInputs();
    }
  }

  private updateComponentInputs() {
    if (!this.componentRef) return;

    this.ngZone?.run(() => {
      // map attributes to component inputs
      const title = this.getAttribute('title');
      const message = this.getAttribute('message');

      if (title !== null) {
        this.componentRef!.instance.title = title;
      }

      if (message !== null) {
        this.componentRef!.instance.message = message;
      }

      // trigger change detection
      this.componentRef!.changeDetectorRef.detectChanges();
    });
  }

  private setupOutputListeners() {
    if (!this.componentRef) return;

    // subscribe to component outputs and dispatch custom events
    this.componentRef.instance.messageEvent.subscribe((data: string) => {
      this.dispatchEvent(new CustomEvent('messageEvent', {
        detail: data,
        bubbles: true
      }));
    });
  }*/
}
