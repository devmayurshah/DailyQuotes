import { GOOGLE_TEST_ADMOB } from '../utils/constants';

type InterstitialCallback = () => void;

/**
 * Modular AdMob integration service for Flutter Android.
 * Uses Google's official test IDs. Designed for easy swap to production IDs.
 */
export class AdMobService {
  private static categoryOpenCounter = 0;
  private static isInitialized = false;

  static initialize(): void {
    if (this.isInitialized) return;
    console.log('[AdMob Service] Initialized with Google Test Ad IDs:', GOOGLE_TEST_ADMOB);
    this.isInitialized = true;
  }

  static getBannerAdUnitId(): string {
    return GOOGLE_TEST_ADMOB.bannerAdUnitId;
  }

  static getNativeAdUnitId(): string {
    return GOOGLE_TEST_ADMOB.nativeAdUnitId;
  }

  static getInterstitialAdUnitId(): string {
    return GOOGLE_TEST_ADMOB.interstitialAdUnitId;
  }

  /**
   * Tracks category opening. Triggers interstitial ad every 5th category opened.
   * Returns true if interstitial should be shown.
   */
  static onCategoryOpened(showAdCallback: InterstitialCallback): boolean {
    this.categoryOpenCounter += 1;
    console.log(`[AdMob Service] Category open count: ${this.categoryOpenCounter}`);
    
    if (this.categoryOpenCounter % 5 === 0) {
      console.log('[AdMob Service] Triggering Interstitial Ad (Every 5th category open)');
      showAdCallback();
      return true;
    }
    return false;
  }

  static resetCounter(): void {
    this.categoryOpenCounter = 0;
  }
}
