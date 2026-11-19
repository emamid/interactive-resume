import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPopover,
  IonTitle,
  IonToolbar,
  MenuController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { buildOutline, codeSlashOutline, homeOutline, pieChartOutline, pricetagOutline } from 'ionicons/icons';
import { filter, map } from 'rxjs';

interface FrameworkItem {
  imageSrc: string;
  url: string;
  value: string;
  text: string;
}

addIcons({ buildOutline, codeSlashOutline, homeOutline, pieChartOutline, pricetagOutline });

@Component({
  selector: 'app-root',
  imports: [
    IonApp,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuButton,
    IonPopover,
    IonTitle,
    IonToolbar,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly menu = inject(MenuController);
  private readonly router = inject(Router);
  protected readonly routeUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected readonly frameworkItems: FrameworkItem[] = [
    {
      imageSrc: '/icons/angular_logo.svg',
      url: '/angular_client/#',
      value: 'angular',
      text: 'Angular',
    },
    {
      imageSrc: '/icons/react_logo.svg',
      url: '/react_client/#',
      value: 'react',
      text: 'React',
    },
    {
      imageSrc: '/icons/svelte_logo.svg',
      url: '/svelte_client/#',
      value: 'svelte',
      text: 'Svelte',
    },
    {
      imageSrc: '/icons/vue_logo.svg',
      url: '/vue3_client/#',
      value: 'vue3',
      text: 'Vue 3',
    },
  ];

  protected readonly currentFramework = this.frameworkItems.find((item) => item.value === 'angular')!;
  protected readonly allowOverflow = computed(() => !this.routeUrl().startsWith('/api/rest'));

  protected closeMenu() {
    void this.menu.close();
  }
}
