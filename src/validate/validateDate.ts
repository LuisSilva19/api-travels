import { ValidationOptions, ValidationArguments, registerDecorator } from 'class-validator';

export function IsCustomDateString(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isCustomDateString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') {
                        return false;
                    }
                
                    const iso8601Pattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/;
                    if (!iso8601Pattern.test(value)) {
                        return false;
                        }
                
                    const date = new Date(value);
                    if (isNaN(date.getTime())) {
                        return false; 
                        }
                    
                    return true; 
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} deve ser uma data válida.`;
                },
            },
        });
    };
}

