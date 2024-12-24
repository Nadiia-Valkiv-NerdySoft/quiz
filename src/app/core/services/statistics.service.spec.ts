import { TestBed } from '@angular/core/testing';
import { StatisticsService } from './statistics.service';
import { INITIAL_STATISTIC } from '../../shared/models/statistic.model';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let localStorageMock: { getItem: jest.Mock };

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsService);
  });

  it('should return INITIAL_STATISTIC when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const result = service.getStatistic();

    expect(result).toEqual(INITIAL_STATISTIC);
  });
});
