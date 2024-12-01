import { FC,  ReactElement } from 'react';
import cn from 'classnames'
import css from './Button.module.scss'

interface ButtonProps {
    className?: string
    children: ReactElement | string
    onClickHandler ?: () => void
}

const Button:FC<ButtonProps> = ({children, className, onClickHandler}) => {
    return (
        <button className={cn(css.button, className)} onClick={onClickHandler}>
            {children}
        </button>
    );
};

export default Button;