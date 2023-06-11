it.each`
    seatingArea    | expectedFullPrice
    ${"furthest"}  | ${200}
    ${"closer"}    | ${250}
    ${"standing"}  | ${500}
    ${"frontmost"} | ${800}
    ${"hitouch"}   | ${1500}
`(
    ```Should display full pricing for seat area $seatingArea 
       when customer does not use discount code```, 
    () => {
        mockSelector.selectedSeatingArea.mockReturnValue(seatingArea);
        mockSelector.useDiscountCode.mockReturnValue(false);
        renderPriceComponent(MOCK_DATA)
        const displayPrice = priceComponent.prop('data-price')
        expect(displayPrice).toEqual(expectedFullPrice);
    }
);

it.each`
    seatingArea    | expectedFullPrice   | expectedDiscountedPrice
    ${"furthest"}  | ${200}              | ${150}
    ${"closer"}    | ${250}              | ${200}
    ${"standing"}  | ${500}              | ${400}
    ${"frontmost"} | ${800}              | ${600}
    ${"hitouch"}   | ${1500}             | ${1200}
`(
    ```Should display normal pricing and discounted pricing for seat area $seatingArea
       when customer is using discount code```, 
    () => {
        mockSelector.selectedSeatingArea.mockReturnValue(seatingArea);
        mockSelector.useDiscountCode.mockReturnValue(true);
        renderPriceComponent(MOCK_DATA)

        expect(priceComponent.at(0).prop('data-price')).toEqual(expectedFullPrice);
        expect(priceComponent.at(1).prop('data-price')).toEqual(expectedDiscountedPrice);
    }
);
