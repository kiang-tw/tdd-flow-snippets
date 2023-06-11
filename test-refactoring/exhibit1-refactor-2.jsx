it.each`
    seatingArea    | expectedFullPrice
    ${"furthest"}  | ${200}
    ${"closer"}    | ${250}
    ${"standing"}  | ${500}
    ${"frontmost"} | ${800}
    ${"hitouch"}   | ${1500}
`(
    `Should display full pricing for seat zone $seatingArea`, 
    () => {
        mockSelector.selectedSeatingArea.mockReturnValue(seatingArea);
        renderPriceComponent(MOCK_DATA)
        const displayPrice = priceComponent.prop('data-price')

        expect(displayPrice).toEqual(expectedFullPrice);
    }
);

describe('when customer use discount code', () => {
    beforeEach(() => { mockSelector.useDiscountCode.mockReturnValue(true); });

    it.each`
        seatingArea    | expectedDiscountedPrice
        ${"furthest"}  | ${150}
        ${"closer"}    | ${200}
        ${"standing"}  | ${400}
        ${"frontmost"} | ${600}
        ${"hitouch"}   | ${1200}
    `(
        `Should display discounted pricing for seat area $seatingArea`, 
        () => {
            mockSelector.selectedSeatingArea.mockReturnValue(seatingArea);
            renderPriceComponent(MOCK_DATA);
            const displayPrice = priceComponent.prop('data-price')

            expect(displayPrice).toEqual(expectedDiscountedPrice);
        }
    );

    it.each`
        seatingArea    | expectedFullPrice
        ${"furthest"}  | ${200}
        ${"closer"}    | ${250}
        ${"standing"}  | ${500}
        ${"frontmost"} | ${800}
        ${"hitouch"}   | ${1500}
    `(
        ```Should display full pricing for seat area $seatingArea in crossed out 
           format to indicate customer get cheaper price when using discount code```, 
        () => {
            mockSelector.selectedSeatingArea.mockReturnValue(seatingArea);
            renderPriceComponent(MOCK_DATA);
            const displayPrice = priceComponent.prop('data-price').at(0);
            
            expect(displayPrice.prop('data-price')).toEqual(expectedFullPrice);
            expect(displayPrice).toHaveClass('price-crossed-out');
        }
    );
})
