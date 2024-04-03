import clsx from 'clsx';
import { IconType } from 'react-icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant: 'primary' | 'outline' | 'ghost';
    Icon?: IconType;
    iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({ text, variant, Icon, iconPosition, disabled, ...rest }) => {

    const buttonClassName = clsx('button', {
        'bg-primary-65 text-text-on-primary hover:bg-primary-54': variant === 'primary' && !disabled,
        'border border-secondary-54 text-text-on-outlinebutton hover:bg-secondary-74/20': variant === 'outline' && !disabled,
        'text-primary-65 hover:bg-primary-74/20': variant === 'ghost' && !disabled,
        'text-text-on-background-disabled': variant === 'ghost' && disabled
    });

    return (
        <>
            <button className={`px-4 py-2 text-sm font-semibold rounded-md duration-300 w-fit ${buttonClassName} flex gap-1 items-center`} disabled={disabled} {...rest}>
                {Icon && iconPosition === 'left' && <><Icon/></>}
                {text}
                {Icon && iconPosition === 'right' && <><Icon/></>}
            </button>
        </>
    )
}
