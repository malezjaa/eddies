import { type ClassValue, clsx } from "clsx";

export function mergeCss(...inputs: ClassValue[]) {
  return clsx(inputs);
}
