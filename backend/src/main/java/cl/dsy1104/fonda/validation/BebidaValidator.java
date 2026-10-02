package cl.dsy1104.fonda.validation;

import cl.dsy1104.fonda.dto.BebidaRequest;
import cl.dsy1104.fonda.model.TipoBebida;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class BebidaValidator implements ConstraintValidator<BebidaValida, BebidaRequest> {

    @Override
    public boolean isValid(BebidaRequest request, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();
        boolean valido = true;

        if (request.getTipo() == TipoBebida.ALCOHOLICA) {
            if (request.getGradosAlcohol() == null) {
                context.buildConstraintViolationWithTemplate("gradosAlcohol es obligatorio para bebidas alcohólicas")
                        .addPropertyNode("gradosAlcohol")
                        .addConstraintViolation();
                valido = false;
            } else if (request.getGradosAlcohol() < 0.5 || request.getGradosAlcohol() > 45) {
                context.buildConstraintViolationWithTemplate("gradosAlcohol debe estar entre 0.5 y 45")
                        .addPropertyNode("gradosAlcohol")
                        .addConstraintViolation();
                valido = false;
            }

            if (request.getAzucarPorLitro() != null) {
                context.buildConstraintViolationWithTemplate("azucarPorLitro debe ser null para bebidas alcohólicas")
                        .addPropertyNode("azucarPorLitro")
                        .addConstraintViolation();
                valido = false;
            }
        }

        if (request.getTipo() == TipoBebida.SIN_ALCOHOL) {
            if (request.getAzucarPorLitro() == null) {
                context.buildConstraintViolationWithTemplate("azucarPorLitro es obligatorio para bebidas sin alcohol")
                        .addPropertyNode("azucarPorLitro")
                        .addConstraintViolation();
                valido = false;
            } else if (request.getAzucarPorLitro() < 0) {
                context.buildConstraintViolationWithTemplate("azucarPorLitro debe ser mayor o igual a cero")
                        .addPropertyNode("azucarPorLitro")
                        .addConstraintViolation();
                valido = false;
            }

            if (request.getGradosAlcohol() != null) {
                context.buildConstraintViolationWithTemplate("gradosAlcohol debe ser null para bebidas sin alcohol")
                        .addPropertyNode("gradosAlcohol")
                        .addConstraintViolation();
                valido = false;
            }

            if (request.getCertificada() != null) {
                context.buildConstraintViolationWithTemplate("certificada debe ser null para bebidas sin alcohol")
                        .addPropertyNode("certificada")
                        .addConstraintViolation();
                valido = false;
            }
        }

        return valido;
    }
}
