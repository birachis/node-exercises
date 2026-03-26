import { sum, sub, mult, div } from "../../src/utils/sum";

describe("sum function", () => {

    //scenatios
    //scen 1. summation of positive numbers
    it("summation of positive numbers", () => {
        //Arrange Data
        const number1 = 12;
        const number2 = 12;
        const expectedResult = 24;

        //act
        const result = sum(number1, number2);

        //assert
        expect(result).toBe(expectedResult);
    });

    //scen 2. summation of negative numbers
    it("summation of negative numbers", () => {
        //Arrange Data
        const number1 = -12;
        const number2 = -12;
        const expectedResult = -24;

        //act
        const result = sum(number1, number2);

        //assert
        expect(result).toBe(expectedResult);
    });

    it("handles mixed-sign numbers", () => {
        expect(sum(10, -4)).toBe(6);
    });

});

describe("sub function", () => {

    //scenatios
    //scen 1. subtracting numbers
    it("subtracting positive numbers", () => {
        //Arrange Data
        const number1 = 24;
        const number2 = 12;
        const expectedResult = 12;

        //act
        const result = sub(number1, number2);

        //assert
        expect(result).toBe(expectedResult);
    });

    it("subtracting negative numbers", () => {
        //Arrange Data
        const number1 = -24;
        const number2 = -12;
        const expectedResult = -12;

        //act
        const result = sub(number1, number2);

        //assert
        expect(result).toBe(expectedResult);
    });

    it("subtracting zero", () => {
        expect(sub(8, 0)).toBe(8);
    });


});


describe("mult function", () => {

    //scenatios
    //scen 1. summation of positive numbers
    it("multiplication of positive numbers", () => {
        //Arrange Data
        const number1 = 12;
        const number2 = 2;
        const expectedResult = 24;

        //act
        const result = mult(number1, number2);

        //assert
        expect(result).toBe(expectedResult);
    });

    //scen 2. summation of negative numbers
    it("multiplication of negative numbers", () => {
        //Arrange Data
        const number1 = -12;
        const number2 = -2;
        const expectedResult = 24;

        //act
        const result = mult(number1, number2);

        //assert
        expect(result).toBe(expectedResult);
    });

    it("multiplication by zero", () => {
        expect(mult(4, 0)).toBe(0);
    });

});

describe("div function", () => {

    //scenatios
    //scen 1. summation of positive numbers
    it("division of positive numbers", () => {
        //Arrange Data
        const number1 = 24;
        const number2 = 2;
        const expectedResult = 12;

        //act
        const result = div(number1, number2);

        //assert
        expect(result).toBe(expectedResult);
    });

    //scen 2. summation of negative numbers
    it("division of negative numbers", () => {
        //Arrange Data
        const number1 = -24;
        const number2 = -2;
        const expectedResult = 12;

        //act
        const result = div(number1, number2);

        //assert
        expect(result).toBe(expectedResult);
    });

    //scen 2. summation of negative numbers
    it("division by zero", () => {
        //Arrange Data
        const number1 = 24;
        const number2 = 0;
        const result = div(number1, number2);

        //assert
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toBe("Division by zero is not allowed");
    });

    it("divides numbers resulting in decimal", () => {
        expect(div(7, 2)).toBe(3.5);
    });

});
