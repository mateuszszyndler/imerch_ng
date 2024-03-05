import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeUrl',
})
export class SanitizeUrlPipe implements PipeTransform {
  transform(input: string): string {
    if (!input) {
      return '';
    }
    // Make the string lowercase, remove all non-alphanumeric characters except for spaces, hyphens, and underscores, replace spaces with hyphens, and then replace multiple hyphens with a single one.
    return input
      .toLowerCase()
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
  }
}
