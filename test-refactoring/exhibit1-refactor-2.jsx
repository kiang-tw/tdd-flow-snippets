it.each`
    seatArea       | expectedNormalPrice
    ${"furthest"}  | ${200}
    ${"closer"}    | ${250}
    ${"standing"}  | ${500}
    ${"frontmost"} | ${800}
    ${"hitouch"}   | ${1500}
`(
    `Should display normal pricing for seat area $seatArea when customer is not premium member`, 
    () => {
        mockSelector.selectedSeatArea.mockReturnValue(seatArea);
        mockSelector.isPremiumMember.mockReturnValue(false);
        renderPriceComponent(MOCK_DATA)
        const displayPrice = priceComponent.prop('data-price')
        expect(displayPrice).toEqual(expectedNormalPrice);
    }
);

describe('when customer is premium member', () => {
    beforeEach(() => { mockSelector.isPremiumMember.mockReturnValue(true); });

    it.each`
        seatArea       | expectedPremiumPrice
        ${"furthest"}  | ${150}
        ${"closer"}    | ${200}
        ${"standing"}  | ${400}
        ${"frontmost"} | ${600}
        ${"hitouch"}   | ${1200}
    `(
        `Should display premium pricing for seat area $seatArea`, 
        () => {
            mockSelector.selectedSeatArea.mockReturnValue(seatArea);
            mockSelector.isPremiumMember.mockReturnValue(true);
            renderPriceComponent(MOCK_DATA);

            expect(priceComponent.at(1).prop('data-price')).toEqual(expectedPremiumPrice);
        }
    );

    it.each`
        seatArea       | expectedNormalPrice
        ${"furthest"}  | ${200}
        ${"closer"}    | ${250}
        ${"standing"}  | ${500}
        ${"frontmost"} | ${800}
        ${"hitouch"}   | ${1500}
    `(
        `Should display normal pricing for seat area $seatArea in crossed out 
         format to indicate customer get better deal out of premium membership`, 
        () => {
            mockSelector.selectedSeatArea.mockReturnValue(seatArea);
            mockSelector.isPremiumMember.mockReturnValue(false);
            renderPriceComponent(MOCK_DATA);
            const displayPrice = priceComponent.prop('data-price').at(0);
            expect(displayPrice.prop('data-price')).toEqual(expectedNormalPrice);
            expect(displayPrice).toHaveClass('price-crossed-out');
        }
    );
})
