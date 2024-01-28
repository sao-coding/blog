import clsx from "classix"
import { twMerge } from "tailwind-merge"

export const cx = (...classes: (string | boolean | null | undefined)[]): string => {
  return twMerge(clsx(...classes))
}
