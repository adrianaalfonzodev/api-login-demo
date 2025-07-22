type AppInputProps = {
  type?: React.HTMLInputTypeAttribute
  value: string
  onChange: (value: string) => void
  placeholder?: string
  name?: string
  required?: boolean
}

const AppInput = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  name,
  required = false
}: AppInputProps) => {
  return (
    <div className="input w-full">
      <input
        className="w-full"
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default AppInput
