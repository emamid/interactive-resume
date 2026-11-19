import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-year-range',
  templateUrl: './year-range.html',
  styleUrl: './year-range.scss',
})
export class YearRange {
  readonly startDate = input<string>();
  readonly endDate = input<string>();
  readonly withParens = input(false);

  protected readonly years = computed(() => {
    const startDate = this.startDate();
    const endDate = this.endDate();
    const startYear = startDate ? new Date(startDate).getFullYear() : null;
    const endYear = endDate ? new Date(endDate).getFullYear() : null;
    if (startYear === endYear) {
      return `${startYear}`;
    }
    return endYear ? `${startYear} - ${endYear}` : `${startYear} -`;
  });
}
