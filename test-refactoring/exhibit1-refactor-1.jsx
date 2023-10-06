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

it.each`
    seatArea       | expectedNormalPrice | expectedPremiumPrice
    ${"furthest"}  | ${200}              | ${150}
    ${"closer"}    | ${250}              | ${200}
    ${"standing"}  | ${500}              | ${400}
    ${"frontmost"} | ${800}              | ${600}
    ${"hitouch"}   | ${1500}             | ${1200}
`(
    `Should display normal pricing and premium pricing for seat area $seatArea when customer is premium member`, 
    () => {
        mockSelector.selectedSeatArea.mockReturnValue(seatArea);
        mockSelector.isPremiumMember.mockReturnValue(true);
        renderPriceComponent(MOCK_DATA)

        expect(priceComponent.at(0).prop('data-price')).toEqual(expectedNormalPrice);
        expect(priceComponent.at(1).prop('data-price')).toEqual(expectedPremiumPrice);
    }
);
