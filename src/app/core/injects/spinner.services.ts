import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  /**
   * Contains in-progress loading requests
   */
  loadingMap: Map<string, boolean> = new Map<string, boolean>();
  /**
   * Controls to show or hide the block modals
   */
  block: boolean;

  constructor() {
  }

  /**
   * Show the spinner default
   */
  show(): void {
    this.block = true;
  }

  /**
   * Hide the current spinner
   */
  hide(): void {
    this.block = false;
  }

  /**
   * Sets the loadingSub property value based on the following:
   * - If loading is true, add the provided url to the loadingMap with a true value, set loadingSub value to true
   * - If loading is false, remove the loadingMap entry and only when the map is empty will we set loadingSub to false
   * This pattern ensures if there are multiple requests awaiting completion, we don't set loading to false before
   * other requests have completed. At the moment, this function is only called from the @link{HttpRequestInterceptor}
   * @param loading boolean
   * @param url string
   */
  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
    if (loading) {
      this.loadingMap.set(url, loading);
      this.block = true;
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      setTimeout(() => this.block = false, 0);
    }
  }

  /**
   * Check for lost or cancelled url
   * @param url string
   */
  checkUrlOrphan(url: string): boolean {
    return this.loadingMap.has(url);
  }
}
