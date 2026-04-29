import type { TextFieldProps } from "./types";
import { style } from "./styles";

export function TextField(props: TextFieldProps) {
  const { label, error, className = "", id, ...rest } = props;

  return (
    <div className="flex flex-col">
      {label && (
        <label className={style.labelBase} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${style.inputBase} ${error ? style.inputError : style.inputDefault} ${className}`}
        {...rest}
      />
      {error && <span className={style.errorBase}>{error}</span>}
    </div>
  );
}
