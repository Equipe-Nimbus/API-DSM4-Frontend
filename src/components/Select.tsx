import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    width: string;
    error?: string;
    options: string[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, width, error, options, ...rest}, ref) =>{
    return (
        <>
            <div className='flex flex-col '>  
                {label && 
                <label htmlFor={rest.name} className="text-text-on-background text-sm font-normal">
                    {label}
                </label>}
                <select ref={ref} {...rest} className={`${width} border border-neutral-65 text-base rounded-md px-3 py-2 focus:border-primary-65 focus:outline-none focus:ring-0`}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                {error && <span className="text-error-60 text-sm">{error}</span>}
            </div>
        </>
    )
})

Select.displayName = 'Select';
export default Select;