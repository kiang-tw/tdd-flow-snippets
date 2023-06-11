it.each`
    seatingArea     | useDiscountCode | expectedFullPrice   | canSeeDiscountedPrice | discountedPrice
    ${"furthest"}   | ${false}        | ${200}              | ${false}              | ${150}
    ${"closer"}     | ${false}        | ${250}              | ${false}              | ${200}
    ${"standing"}   | ${false}        | ${500}              | ${false}              | ${400}
    ${"frontmost"}  | ${false}        | ${800}              | ${false}              | ${600}
    ${"hitouch"}    | ${false}        | ${1500}             | ${false}              | ${1200}
    ${"furthest"}   | ${true}         | ${200}              | ${true}               | ${150}
    ${"closer"}     | ${true}         | ${250}              | ${true}               | ${200}
    ${"standing"}   | ${true}         | ${500}              | ${true}               | ${400}
    ${"frontmost"}  | ${true}         | ${800}              | ${true}               | ${600}
    ${"hitouch"}    | ${true}         | ${1500}             | ${true}               | ${1200}
`(
    ```Should display its price(s) correctly, 
        given useDiscountCode : $useDiscountCode 
        and seatingArea : $seatingArea```, 
    () => {
        mockSelector.selectedSeatingArea.mockReturnValue(seatingArea);
        mockSelector.useDiscountCode.mockReturnValue(useDiscountCode);
        renderPriceComponent(MOCK_DATA)

        if (canSeeDiscountedPrice) {
            expect(priceComponent.at(0).prop('data-price')).toEqual(expectedFullPrice);
            expect(priceComponent.at(1).prop('data-price')).toEqual(discountedPrice);
        } else {
            expect(priceComponent.prop('data-price')).toEqual(expectedNormalPrice);
        }
    }
);
