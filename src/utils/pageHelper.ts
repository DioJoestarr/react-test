import { ApiResponsePage } from "../types/api";

export function getNextPage(data: ApiResponsePage<any>) {
  const nextPage = data.meta.paging.links.next;
  return nextPage || undefined;
}
