type AppCheckboxProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  name?: string
  required?: boolean
}

const AppCheckbox = ({
  label,
  checked,
  onChange,
  name,
  required = false,
}: AppCheckboxProps) => {
  return (
    <label className="flex items-center space-x-2 text-sm cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={required}
        className="w-4 h-4 my-3 accent-[#E89B4C] rounded focus:outline-none"
      />
      <span>{label}</span>
    </label>
  )
}

export default AppCheckbox