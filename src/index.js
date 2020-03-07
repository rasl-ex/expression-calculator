function eval() {
    // Do not use eval!!!
    return;
}

const operator = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
}

function calculate(expr) {
    let newExpr = expr.split(" ");

    function calc(n1, n2) {
        for (let i = 1; i < newExpr.length - 1; i++) {
            if (newExpr[i] == n1 || newExpr[i] == n2) {
                newExpr[i] = operator[newExpr[i]](+newExpr[i - 1], +newExpr[i + 1]);
                newExpr.splice(i - 1, 3, newExpr[i]);
                i--;
            }
        }
    }

    calc("*", "/");
    calc("+", "-");

    return +newExpr[0];
}

function typeError(expr) {
    let check = expr.replace(/\s+/g, "");
    if (check.includes("/0")) {
        throw new Error("TypeError: Division by zero.");
    }
    if (check.replace(/[(]/g, "").length != check.replace(/[)]/g, "").length) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
}

function expressionCalculator(expr) {
    typeError(expr);

    expr = expr.replace(/\s+/g, "").replace(/(\*|\/|\+|\-)/g, " $& ");

    if (expr.match(/\(/g) != null) {
        for (let i = expr.match(/\(/g).length; i != 0; i--) {
            let calculation = expr.match(/(\([0-9\+\/\*\-\. ]+\))/g)[0];
            console.log(calculation);
            let expression = calculation.slice(1, calculation.length - 1);
            expr = expr.replace(calculation, calculate(expression));
        }
    }

    return calculate(expr);
}

module.exports = {
    expressionCalculator
}