import { JSDOM } from 'jsdom';
import { streakCounter } from '../src';
import { formattedDate } from '../src/utils';

describe('basic test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});

describe('streakCounter', () => {
  let mokLocalStorage: Storage;
  beforeEach(() => {
    const mokJSDom = new JSDOM('', { url: 'https://localhost' });

    mokLocalStorage = mokJSDom.window.localStorage;
  });
  afterEach(() => {
    mokLocalStorage.clear();
  });
  it('should return a streak object with currentCount, startDate and lastLoginDate', () => {
    // const mockLocalStorage = ''; // We initialzed localstorage var above
    const date = new Date();
    const streak = streakCounter(mokLocalStorage, date);

    expect(streak.hasOwnProperty('currentCount')).toBe(true);
    expect(streak.hasOwnProperty('startDate')).toBe(true);
    expect(streak.hasOwnProperty('lastLoginDate')).toBe(true);
  });
  it('should return a streak starting at 1 and keep track of lastLoginDate', () => {
    const date = new Date();
    const streak = streakCounter(mokLocalStorage, date);

    function formattedDate(date: Date): string {
      // to return date in string format
      return date.toLocaleDateString('en-US');
    }

    const dateFormatted = formattedDate(date);

    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(dateFormatted);
  });
  it('should store the streak in localStorage', () => {
    const date = new Date();
    const key = 'streak';
    streakCounter(mokLocalStorage, date);

    const streakAsString = mokLocalStorage.getItem(key);
    expect(streakAsString).not.toBeNull();
  });
  describe('with a pre-populated streak', () => {
    let mokLocalStorage: Storage;
    beforeEach(() => {
      const mokJSDom = new JSDOM('', { url: 'https://localhost' });

      mokLocalStorage = mokJSDom.window.localStorage;

      const date = new Date();

      const streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date),
      };

      mokLocalStorage.setItem('streak', JSON.stringify(streak));
    });
    afterEach(() => {
      mokLocalStorage.clear;
    });
    it('should return the streak from localStorage', () => {
      const date = new Date('1/22/2023');
      const streak = streakCounter(mokLocalStorage, date);

      expect(streak.startDate).toBe('1/22/2023');
    });
    it('should increment the streak', () => {
      const date = new Date('1/23/2023');
      const streak = streakCounter(mokLocalStorage, date);

      expect(streak.currentCount).toBe(2);
    });
    it('should not increment the streak when login days not consecutive', () => {
      const date = new Date('1/22/2023');
      const streak = streakCounter(mokLocalStorage, date);

      expect(streak.currentCount).toBe(1);
    });
    it('should save the incremented streak to localStorage', () => {
      const key = 'streak';
      const date = new Date('1/23/2023');
      streakCounter(mokLocalStorage, date);
      const dateUpdated = new Date('1/25/2023');
      const streakUpdated = streakCounter(mokLocalStorage, dateUpdated);
      const streakAsString = mokLocalStorage.getItem(key);
      const streak = JSON.parse(streakAsString || '');

      expect(streak.currentCount).toBe(1);
    });
    it('should reset if not consecutive', () => {
      const date = new Date('1/23/2023');
      const streak = streakCounter(mokLocalStorage, date);

      expect(streak.currentCount).toBe(2);

      const dateUpdated = new Date('1/25/2023');
      const streakUpdated = streakCounter(mokLocalStorage, dateUpdated);

      expect(streakUpdated.currentCount).toBe(1);
    });
    it('should not reset the streak for same dayt login', () => {
      const date = new Date('1/23/2023');
      streakCounter(mokLocalStorage, date);
      const dateUpdated = new Date('1/23/2023');
      const streakUpdated = streakCounter(mokLocalStorage, dateUpdated);

      expect(streakUpdated.currentCount).toBe(2);
    });
  });
});
