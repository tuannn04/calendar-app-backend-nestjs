import {registerDecorator, ValidationArguments} from 'class-validator';

export default function IsISO8601Format() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsIso8601Format',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [propertyName],
            options: {message: '$property must be in ISO8601 format'},
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const dateParsed = new Date(Date.parse(value));
                    return dateParsed.toISOString() === value;
                },
            },
        });
    };
}