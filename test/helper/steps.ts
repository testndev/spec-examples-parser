import { test, expect } from '@playwright/test';
import ReportAttachments from './ReportAttachments';

export async function thenResultEqualsExpectedArray(testInfo, expectedList: any[], result: any[]) {
  await test.step('then result is equal to expected array of objects', async () => {
    ReportAttachments.addComparisonElements(testInfo, expectedList, result);
    expect(Array.isArray(result), { message: 'result is not a array, but: ' + typeof result }).toBe(true);
    expect(result, { message: 'result is not equal to expected array, represented in attachment' })
      .toStrictEqual(expectedList);
  });
}
