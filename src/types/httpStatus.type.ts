import { HTTP_STATUS } from "@constants/httpStatus.constant";

export type THttpStatus = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];