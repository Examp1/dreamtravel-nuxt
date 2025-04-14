import { MEDIA_PATH_PREFIX, BASE_URL } from "~/constants";
export default function (path) {
    return `${BASE_URL}/${MEDIA_PATH_PREFIX}${path}`;
}
