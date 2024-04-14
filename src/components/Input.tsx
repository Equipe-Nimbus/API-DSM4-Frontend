import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    width: string;
    error?: string;
    mask?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, width, error, disabled, ...rest}, ref) => {
    return (
        <div className='flex flex-col '>  
            {label && 
            <label htmlFor={rest.id} className="text-text-on-background text-sm font-normal">
                {label}
            </label>}
            <input ref={ref} {...rest} disabled={disabled} className={`${width} ${disabled ? 'text-text-on-background-disabled bg-neutral-90/10' : 'text-text-on-background'} border border-neutral-65 text-base rounded-md px-3 py-2 focus:border-primary-65 focus:outline-none focus:ring-0`}/>
            {error?.length && <span className="text-error-60 text-sm">{error}</span>}
        </div>
    )
});

Input.displayName = 'Input';
export default Input;
