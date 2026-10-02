package cl.dsy1104.fonda.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = BebidaValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface BebidaValida {
    String message() default "Bebida no válida";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
