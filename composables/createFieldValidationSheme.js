import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const createFiedlValidationRules = (field, field_type = "str") => {
    let validator;

    switch (field_type) {
        case "bool":
        case "boll": // на всякий случай
            validator = zod.boolean();
            break;
        case "num":
            validator = zod.number();
            break;
        case "date":
            validator = zod.coerce.date().transform((val) => val.toISOString());
            break;
        default:
            validator = zod.string("negru pidarasu");
            break;
    }

    // Обязательное поле
    if (field.rules?.required === true) {
        if (field_type === "bool") {
            validator = validator.refine((val) => val === true, {
                message: field.messages?.required || "Required field",
            });
        } else if (field_type === "str") {
            validator = validator.min(
                1,
                field.messages?.required || "Required field",
            );
        }
    }

    // Email
    if (field_type === "str" && field.rules?.email === true) {
        validator = validator.email(field.messages?.email || "Invalid email");
    }

    // Минимум символов (только если задано)
    if (
        field_type === "str" &&
        typeof field.rules?.min === "number" &&
        field.rules.min > 0
    ) {
        validator = validator.min(
            field.rules.min,
            field.messages?.min || `Min value ${field.rules.min}`,
        );
    }

    // Максимум символов (только если задано)
    if (
        field_type === "str" &&
        typeof field.rules?.max === "number" &&
        field.rules.max > 0
    ) {
        validator = validator.max(
            field.rules.max,
            field.messages?.max || `Max value ${field.rules.max}`,
        );
    }

    return toTypedSchema(validator);
};
