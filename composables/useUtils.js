import { MEDIA_PATH_PREFIX, BASE_URL } from "~/constants";

export default function useUtils() {
  const getMediaPath = (path) => {
    if (!path) return '';
    return `${BASE_URL}/${MEDIA_PATH_PREFIX}${path}`;
  }

  return {
    getMediaPath
  };
}