import * as zod from 'zod';

export const formSchema = zod.object({
    firstname: zod.string().min(2, "Имя слишком короткое"),
    email: zod.string().email("Неверный email"),
    phone: zod.string().min(10, "Телефон обязателен"),
});
