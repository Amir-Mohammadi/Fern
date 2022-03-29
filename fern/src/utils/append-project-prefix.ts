import { ProjectPrefix } from '@Config';

export function appendProjectPrefix(key: string) {
  const projectPrefix = ProjectPrefix.ELESSEL;
  return `${projectPrefix}-${key}`;
}
