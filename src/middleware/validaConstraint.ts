import { Request } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

async function validationBody< T extends object>(
    entityClass: new (...args: any[]) => T,
    req: Request
) {
    try {
        const entity = plainToInstance(entityClass, req.body);
        const validationErrors = await validate(entity);

        if (validationErrors.length > 0) {
            const errors = validationErrors.map(error => {
                const { property, constraints } = error;
                return { property, constraints };
            });
            return errors;
        }
        return null;
    }catch (error) {
        console.log(error);
    }
}

export default validationBody;
