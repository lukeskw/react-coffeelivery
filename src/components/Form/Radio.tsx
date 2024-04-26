import { InputHTMLAttributes, LegacyRef, forwardRef } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  isSelected: boolean
}

export const Radio = forwardRef(function Radio(
  { children, isSelected, ...rest }: Props,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <label
      className="flex w-full items-center gap-3 rounded-md border border-transparent bg-neutral-200
      p-4 text-xs uppercase leading-relaxed text-stone-600 transition-all duration-200 hover:bg-neutral-300
       data-[state='true']:border-violet-600 data-[state='true']:bg-violet-100
      "
      data-state={isSelected}
    >
      <input
        className="hidden accent-violet-600"
        type="radio"
        ref={ref}
        {...rest}
      />
      {children}
    </label>
  )
})
