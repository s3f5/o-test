import * as React from 'react';
import { TextInput  } from 'react-native';
import type {TextInputProps} from 'react-native';
import { cn } from '~/lib/utils';

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(
    ({ className, placeholderClassName, ...props }, ref) => {
        return (
            <TextInput
                ref={ref}
                className={cn(
                    'h-12 rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground',
                    props.editable === false && 'opacity-50 web:cursor-not-allowed',
                    className
                )}
                placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };