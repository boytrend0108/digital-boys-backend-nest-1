import { registerDecorator, type ValidationArguments } from 'class-validator';

export function StartWith(prefix: string) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'startWith',
      target: object.constructor,
      propertyName,
      constraints: [prefix],
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must start with "${prefix}"`;
        },
      },
    });
  };
}
