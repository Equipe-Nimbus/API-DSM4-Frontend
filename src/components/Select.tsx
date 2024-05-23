import React from "react";

export interface Option {
    value: string;
    label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    width: string;
    error?: string;
    options: Option[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, width, error, options, defaultValue, ...rest}, ref) =>{
    return (
        <>
            <div className='flex flex-col '>  
                {label && 
                <label htmlFor={rest.id} className="text-text-on-background text-sm font-normal">
                    {label}
                </label>}
                <select ref={ref} {...rest} defaultValue={defaultValue} className={`${width} border border-neutral-65 text-base rounded-md px-3 py-2 focus:border-primary-65 focus:outline-none focus:ring-0`}>
                    <option value="">Selecione uma opção</option>
                    {options?.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {error && <span className="text-error-60 text-sm">{error}</span>}
            </div>
        </>
    )
})

Select.displayName = 'Select';
export default Select;