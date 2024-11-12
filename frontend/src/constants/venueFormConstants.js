export const INITIAL_VENUE_DATA = {
    venueName: '',
    country: '',
    capacity: '',
    venueType: '',
    proximityToNature: '',
    venueWebsite: '',
    relationToVenue: '',
    // Ratings all start at 0
    food: 0,
    sleepingComfort: 0,
    commonSpaces: 0,
    facilitationReadiness: 0,
    overallRating: 0,
    // Other fields
    levelOfSelfHosting: '',
    veggieVeganFriendly: false,
    canCookYourself: false,
    imageUrl: '',
    googleMapsLink: '',
};

export const STEP_DESCRIPTIONS = {
    1: "Step 1/3. Please add basic data",
    2: "Step 2/3. Please give us your opinion",
    3: "Step 3/3. Some other optional information",
};

export const FORM_STEPS = {
    BASIC_INFO: 1,
    RATINGS: 2,
    ADDITIONAL_INFO: 3,
    THANKS: 4,
};
