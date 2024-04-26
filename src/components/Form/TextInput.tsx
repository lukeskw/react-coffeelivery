import {
  FocusEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  LegacyRef,
  forwardRef,
  useState,
} from 'react'

import { FieldError } from 'react-hook-form'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  optional?: boolean
  containerProps?: HTMLAttributes<HTMLDivElement>
  error?: FieldError
}

export const TextInput = forwardRef(function TextInput(
  { optional, error, containerProps, onFocus, onBlur, ...rest }: Props,
  ref: LegacyRef<HTMLInputElement>,
) {
  const [isFocused, setIsFocused] = useState(false)

  function handleFocus(event: FocusEvent<HTMLInputElement, Element>) {
    setIsFocused(true)
    onFocus?.(event)
  }

  function handleBlur(event: FocusEvent<HTMLInputElement, Element>) {
    setIsFocused(false)
    onBlur?.(event)
  }

  return (
    <div className="flex flex-col gap-2" {...containerProps}>
      <label
        className="flex items-center justify-between rounded-md border border-neutral-200 bg-gray-200 transition-all duration-200 data-[state='blurred']:border-neutral-200 data-[state='focused']:border-yellow-600"
        data-state={isFocused ? 'focused' : 'blurred'}
      >
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          {...rest}
          className="w-full border-none bg-transparent p-3 text-stone-600 outline-none placeholder:text-zinc-500"
        />

        {optional ? (
          <span className="pr-3 text-sm italic leading-snug text-zinc-500">
            Optional
          </span>
        ) : null}
      </label>

      {error?.message ? (
        <p className="text-xs leading-snug text-red-500" role="alert">
          {error.message}
        </p>
      ) : null}
    </div>
  )
})
