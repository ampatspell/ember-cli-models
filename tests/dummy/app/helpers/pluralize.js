import { helper } from '@ember/component/helper';

export function pluralize(params) {
  let [ singular, plural, count ] = params;
  if(count === 1) {
    return singular;
  }
  return plural;
}

export default helper(pluralize);
