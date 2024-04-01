import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant: 'primary' | 'outline' | 'ghost';
}

export default function Button({ text, variant, ...rest }: ButtonProps) {

    const buttonClassName = clsx('button', {
        'bg-primary-65 text-text-on-primary hover:bg-primary-54': variant === 'primary',
        'border border-secondary-54 text-text-on-outlinebutton hover:bg-secondary-74/20': variant === 'outline',
        'text-primary-65 hover:bg-primary-74/20': variant === 'ghost',
    });

    return (
        <>
            <button className={`px-4 py-2 text-sm font-medium rounded-md duration-300 w-fit ${buttonClassName}`} {...rest}>{text}</button>
        </>
    )
}
