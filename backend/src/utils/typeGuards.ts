import QueryString from 'qs';

export function isValidTagList(tags: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]): tags is string[] {
  if (!(tags instanceof Array)) return false;
  return tags.every((tag) => typeof tag === 'string');
}
