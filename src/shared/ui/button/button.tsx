import type { ButtonProps } from "./types";
import { style } from "./styles";

export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", ...rest } = props;

  return <button className={`${style.base} ${style.variants[variant]} ${className}`} {...rest} />;
}
