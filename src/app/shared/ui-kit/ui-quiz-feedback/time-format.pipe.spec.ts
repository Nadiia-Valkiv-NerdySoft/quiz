import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  let pipe: TimeFormatPipe;

  beforeEach(() => {
    pipe = new TimeFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return 0 sec when value is 0', () => {
    expect(pipe.transform(0)).toBe('0 sec');
  });

  it('should return 1 min when value is 60', () => {
    expect(pipe.transform(60)).toBe('1 min');
  });

  it('should return 1 min 1 sec when value is 61', () => {
    expect(pipe.transform(61)).toBe('1 min 1 sec');
  });

  it('should return 2 min 1 sec when value is 121', () => {
    expect(pipe.transform(121)).toBe('2 min 1 sec');
  });
});
