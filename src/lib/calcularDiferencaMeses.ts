export function calcularDiferencaMeses(date1: Date, date2: Date) {
    var years = date2.getFullYear() - date1.getFullYear();
    var months = date2.getMonth() - date1.getMonth();
    var days = date2.getDate() - date1.getDate();

    if (days < 0) {
        months--;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    var monthsDiff = years * 12 + months;

    return monthsDiff;
}