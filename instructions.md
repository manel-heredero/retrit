# PROJECT OVERVIEW

You will be building the frontend of a website containing up to 300 retreat venues. Users can navigate the venues as gallery (one card per venue) and they will be able to filter based on a few parameters, such as country, continent or capacity, amongst others.

You will be using MongoDB, express and node.js for the backend, and Vite as frontend framework with React with JavaScript and Chakra for the frontend, plus any other libraries that might be necessary for the project. Potentially we can also use Shadcn for component templates.

The backend API and database setup is already in place, under the folder "backend".

In short, this is a project with MERN and Vite as framework.

# CORE FUNCTIONALITIES

1. The gallery is shown in the homepage, with a pagination of up to 6 venues per page.
2. There are two main types of venues: Reviewed Venues and Non-reviewed venues. In any views or filters, the Reviewed Venues are shown on top.
3. The gallery contains the venues as cards with some basic information (venue name, venue image, reviewed/non-reviewed, country, capacity and type of location)
4. Also on the homepage the user can filter the venues using three dropdown options (region, capacity and type of location). When filtering, it shows the reviewed venues first, then it shows the venues that match the filter but are not reviewed. Finally it shows all other venues that have null in that field.
5. When clicking on the card, the user is taken to the venue url, which contains all information about the venue.
6. There is a button to "add venue" with which users can add new venues and review them.
7. There is no login functionality, but when submitting a venue the user is asked to submit their name and email address (required fields), informing them that that information will be confidential and now shown on the website.
8. There is a blog section with some articles about retreats and offsites.
9. The navbar contains: logo on the left (which leads to "home"), and "about", "blog" and a button "Submit Venue".

## FUNCTIONALITIES FOR SUBMITTING A NEW VENUE

1. There are three steps to submit a new venue:
   - Basic venue details (required)
   - Review information (optional) for "Food", "Sleeping Comfort", "Common Spaces", "Facilitation Readiness" and overall rating
   - Other review information: Veggie/Vegan Friendly?, Can you cook yourself?, Level of Self-Hosting, venue website, google maps link, Image.

## BLOG FUNCTIONALITIES

1. The blog section contains some articles about retreats and offsites.
2. The articles are shown in the blog page with a pagination of up to 6 articles per page.
3. When clicking on the article, the user is taken to the article url, which contains all information about the article.

# CREATING AND EDITING ARTICLES

Article File Structure:
backend/
├── data/
│ └── articles/
│ ├── images/ # Store article images here
│ └── content/ # Store .md files here
├── scripts/
│ ├── importArticles.js # Script to import articles to MongoDB
│ ├── listArticles.js # Script to list all articles
│ ├── editArticle.js # Script to edit existing articles
│ └── createArticleTemplate.js # Script to create new articles
└── package.json

## Required Fields for Articles

- title: String (required)
- author: String (required)
- date: Date (required, format: YYYY-MM-DD)
- readTime: String (required, format: "X min read")
- image: String (required, path to image)
- tags: Array of Strings (optional)
- content: Markdown content (required)
- slug: String (auto-generated from title)

## Scripts to create and edit articles

1. To create a new article, run the command "npm run new-article title-in-slug-format" and follow the instructions.
2. The article will be created in the backend/data/articles/content folder.
3. The article will be added to the database by running "npm run import-articles".
4. To list all articles, run the command "npm run list-articles".
5. To edit an article, run the command "npm run edit-article <slug>".

## FIELDS FOR EACH VENUE

Required Fields:

- VenueID: Number (unique identifier)
- Venue Name: String
- Country Code: String (Three-letter ISO 3166)
- Location Type: ['Remote', 'Village', 'Small Town', 'Big Town', 'Very very urban']
- Proximity to Nature: ['Very much in nature', 'Moderate access', 'Little access']
- Capacity: ['Up to 7 people', 'Between 7 and 15 people', 'Between 15 and 30 people', 'Between 30 and 60 people', 'Between 60 and 100 people', 'More than 100 people']

Auto-populated Fields:

- Country Name: String (derived from Country Code)
- Region: String (derived from Country Code)
- Sub-Region: String (derived from Country Code)

Optional Fields:

- Venue Website: URL (must start with http:// or https://)
- Google Maps Link: URL (must start with http:// or https://)
- Ratings (all default to null):
  - Overall Rating: Number (1-5)
  - Common Spaces Rating: Number (1-5)
  - Food Rating: Number (1-5)
  - Sleeping Comfort Rating: Number (1-5)
- Veggie Friendly: Boolean
- Can Cook Self: Boolean
- Image: Mixed type

# DOCUMENTATION

## STYLE GUIDE

- Use Chakra UI for styling.
- Use the colors defined in the theme.js file.
- Colors are per https://coolors.co/palette/606c38-283618-fefae0-dda15e-bc6c25
- Use the fonts defined in the theme.js file.

# CODING EXAMPLES FOR SPECIFIC FUNCTIONALITIES

## COUNTRY SELECTION

For selecting a country when creating a new venue, it's best to implement this feature using a combination of frontend and backend approaches. Here's how you could structure it:

### Frontend:

1. Create a dropdown component for country selection.
2. Store the country data (code, name, region, sub-region) in a JSON file or a JavaScript object in the frontend.
3. Use this data to populate the dropdown options.
4. When a user selects a country, send only the country code to the backend.

Frontend Implementation:

```
import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';
import countriesData from './countriesData.json';

function CountrySelector({ onSelect }) {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <Select value={selectedCountry} onChange={handleChange}>
      <option value="">Select a country</option>
      {countriesData.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </Select>
  );
}

export default CountrySelector;
```

### Backend

1. Validate the received country code against a list of valid codes.
2. Store only the country code in the database for each venue.
3. When sending venue data to the frontend, include the country code.

Backend implementation:

```
const validCountryCodes = ['USA', 'GBR', 'FRA', /* ... */]; // All country codes

app.post('/api/venues', (req, res) => {
  const { countryCode, ...otherVenueData } = req.body;

  if (!validCountryCodes.includes(countryCode)) {
    return res.status(400).json({ error: 'Invalid country code' });
  }

  // Save venue with country code to database
  // ...

  res.status(201).json({ message: 'Venue created successfully' });
});
```

6.  Backend:
    Validate the received country code against a list of valid codes.
    Store only the country code in the database for each venue.
    When sending venue data to the frontend, include the country code.
    This approach offers several advantages:
1.  Reduced database size and query complexity by storing only the country code.
    Faster form submission as only a small piece of data (country code) is sent.
    Flexibility to update country names or regions without changing the database.
    Consistent data across the application.

# CURRENT FILE STRUCTURE

# APPENDICES

## APPENDIX 1 - COUNTRY CODES TABLE

| Country Code | Country Name                                         | Region   | Sub-Region                      |
| ------------ | ---------------------------------------------------- | -------- | ------------------------------- |
| AFG          | Afghanistan                                          | Asia     | Southern Asia                   |
| ALA          | Åland Islands                                        | Europe   | Northern Europe                 |
| ALB          | Albania                                              | Europe   | Southern Europe                 |
| DZA          | Algeria                                              | Africa   | Northern Africa                 |
| ASM          | American Samoa                                       | Oceania  | Polynesia                       |
| AND          | Andorra                                              | Europe   | Southern Europe                 |
| AGO          | Angola                                               | Africa   | Sub-Saharan Africa              |
| AIA          | Anguilla                                             | Americas | Latin America and the Caribbean |
| ATA          | Antarctica                                           |          |                                 |
| ATG          | Antigua and Barbuda                                  | Americas | Latin America and the Caribbean |
| ARG          | Argentina                                            | Americas | Latin America and the Caribbean |
| ARM          | Armenia                                              | Asia     | Western Asia                    |
| ABW          | Aruba                                                | Americas | Latin America and the Caribbean |
| AUS          | Australia                                            | Oceania  | Australia and New Zealand       |
| AUT          | Austria                                              | Europe   | Western Europe                  |
| AZE          | Azerbaijan                                           | Asia     | Western Asia                    |
| BHS          | Bahamas                                              | Americas | Latin America and the Caribbean |
| BHR          | Bahrain                                              | Asia     | Western Asia                    |
| BGD          | Bangladesh                                           | Asia     | Southern Asia                   |
| BRB          | Barbados                                             | Americas | Latin America and the Caribbean |
| BLR          | Belarus                                              | Europe   | Eastern Europe                  |
| BEL          | Belgium                                              | Europe   | Western Europe                  |
| BLZ          | Belize                                               | Americas | Latin America and the Caribbean |
| BEN          | Benin                                                | Africa   | Sub-Saharan Africa              |
| BMU          | Bermuda                                              | Americas | Northern America                |
| BTN          | Bhutan                                               | Asia     | Southern Asia                   |
| BOL          | Bolivia, Plurinational State of                      | Americas | Latin America and the Caribbean |
| BES          | Bonaire, Sint Eustatius and Saba                     | Americas | Latin America and the Caribbean |
| BIH          | Bosnia and Herzegovina                               | Europe   | Southern Europe                 |
| BWA          | Botswana                                             | Africa   | Sub-Saharan Africa              |
| BVT          | Bouvet Island                                        | Americas | Latin America and the Caribbean |
| BRA          | Brazil                                               | Americas | Latin America and the Caribbean |
| IOT          | British Indian Ocean Territory                       | Africa   | Sub-Saharan Africa              |
| BRN          | Brunei Darussalam                                    | Asia     | South-eastern Asia              |
| BGR          | Bulgaria                                             | Europe   | Eastern Europe                  |
| BFA          | Burkina Faso                                         | Africa   | Sub-Saharan Africa              |
| BDI          | Burundi                                              | Africa   | Sub-Saharan Africa              |
| CPV          | Cabo Verde                                           | Africa   | Sub-Saharan Africa              |
| KHM          | Cambodia                                             | Asia     | South-eastern Asia              |
| CMR          | Cameroon                                             | Africa   | Sub-Saharan Africa              |
| CAN          | Canada                                               | Americas | Northern America                |
| CYM          | Cayman Islands                                       | Americas | Latin America and the Caribbean |
| CAF          | Central African Republic                             | Africa   | Sub-Saharan Africa              |
| TCD          | Chad                                                 | Africa   | Sub-Saharan Africa              |
| CHL          | Chile                                                | Americas | Latin America and the Caribbean |
| CHN          | China                                                | Asia     | Eastern Asia                    |
| CXR          | Christmas Island                                     | Oceania  | Australia and New Zealand       |
| CCK          | Cocos (Keeling) Islands                              | Oceania  | Australia and New Zealand       |
| COL          | Colombia                                             | Americas | Latin America and the Caribbean |
| COM          | Comoros                                              | Africa   | Sub-Saharan Africa              |
| COG          | Congo                                                | Africa   | Sub-Saharan Africa              |
| COD          | Congo, Democratic Republic of the                    | Africa   | Sub-Saharan Africa              |
| COK          | Cook Islands                                         | Oceania  | Polynesia                       |
| CRI          | Costa Rica                                           | Americas | Latin America and the Caribbean |
| CIV          | Côte d'Ivoire                                        | Africa   | Sub-Saharan Africa              |
| HRV          | Croatia                                              | Europe   | Southern Europe                 |
| CUB          | Cuba                                                 | Americas | Latin America and the Caribbean |
| CUW          | Curaçao                                              | Americas | Latin America and the Caribbean |
| CYP          | Cyprus                                               | Asia     | Western Asia                    |
| CZE          | Czechia                                              | Europe   | Eastern Europe                  |
| DNK          | Denmark                                              | Europe   | Northern Europe                 |
| DJI          | Djibouti                                             | Africa   | Sub-Saharan Africa              |
| DMA          | Dominica                                             | Americas | Latin America and the Caribbean |
| DOM          | Dominican Republic                                   | Americas | Latin America and the Caribbean |
| ECU          | Ecuador                                              | Americas | Latin America and the Caribbean |
| EGY          | Egypt                                                | Africa   | Northern Africa                 |
| SLV          | El Salvador                                          | Americas | Latin America and the Caribbean |
| GNQ          | Equatorial Guinea                                    | Africa   | Sub-Saharan Africa              |
| ERI          | Eritrea                                              | Africa   | Sub-Saharan Africa              |
| EST          | Estonia                                              | Europe   | Northern Europe                 |
| SWZ          | Eswatini                                             | Africa   | Sub-Saharan Africa              |
| ETH          | Ethiopia                                             | Africa   | Sub-Saharan Africa              |
| FLK          | Falkland Islands (Malvinas)                          | Americas | Latin America and the Caribbean |
| FRO          | Faroe Islands                                        | Europe   | Northern Europe                 |
| FJI          | Fiji                                                 | Oceania  | Melanesia                       |
| FIN          | Finland                                              | Europe   | Northern Europe                 |
| FRA          | France                                               | Europe   | Western Europe                  |
| GUF          | French Guiana                                        | Americas | Latin America and the Caribbean |
| PYF          | French Polynesia                                     | Oceania  | Polynesia                       |
| ATF          | French Southern Territories                          | Africa   | Sub-Saharan Africa              |
| GAB          | Gabon                                                | Africa   | Sub-Saharan Africa              |
| GMB          | Gambia                                               | Africa   | Sub-Saharan Africa              |
| GEO          | Georgia                                              | Asia     | Western Asia                    |
| DEU          | Germany                                              | Europe   | Western Europe                  |
| GHA          | Ghana                                                | Africa   | Sub-Saharan Africa              |
| GIB          | Gibraltar                                            | Europe   | Southern Europe                 |
| GRC          | Greece                                               | Europe   | Southern Europe                 |
| GRL          | Greenland                                            | Americas | Northern America                |
| GRD          | Grenada                                              | Americas | Latin America and the Caribbean |
| GLP          | Guadeloupe                                           | Americas | Latin America and the Caribbean |
| GUM          | Guam                                                 | Oceania  | Micronesia                      |
| GTM          | Guatemala                                            | Americas | Latin America and the Caribbean |
| GGY          | Guernsey                                             | Europe   | Northern Europe                 |
| GIN          | Guinea                                               | Africa   | Sub-Saharan Africa              |
| GNB          | Guinea-Bissau                                        | Africa   | Sub-Saharan Africa              |
| GUY          | Guyana                                               | Americas | Latin America and the Caribbean |
| HTI          | Haiti                                                | Americas | Latin America and the Caribbean |
| HMD          | Heard Island and McDonald Islands                    | Oceania  | Australia and New Zealand       |
| VAT          | Holy See                                             | Europe   | Southern Europe                 |
| HND          | Honduras                                             | Americas | Latin America and the Caribbean |
| HKG          | Hong Kong                                            | Asia     | Eastern Asia                    |
| HUN          | Hungary                                              | Europe   | Eastern Europe                  |
| ISL          | Iceland                                              | Europe   | Northern Europe                 |
| IND          | India                                                | Asia     | Southern Asia                   |
| IDN          | Indonesia                                            | Asia     | South-eastern Asia              |
| IRN          | Iran, Islamic Republic of                            | Asia     | Southern Asia                   |
| IRQ          | Iraq                                                 | Asia     | Western Asia                    |
| IRL          | Ireland                                              | Europe   | Northern Europe                 |
| IMN          | Isle of Man                                          | Europe   | Northern Europe                 |
| ISR          | Israel                                               | Asia     | Western Asia                    |
| ITA          | Italy                                                | Europe   | Southern Europe                 |
| JAM          | Jamaica                                              | Americas | Latin America and the Caribbean |
| JPN          | Japan                                                | Asia     | Eastern Asia                    |
| JEY          | Jersey                                               | Europe   | Northern Europe                 |
| JOR          | Jordan                                               | Asia     | Western Asia                    |
| KAZ          | Kazakhstan                                           | Asia     | Central Asia                    |
| KEN          | Kenya                                                | Africa   | Sub-Saharan Africa              |
| KIR          | Kiribati                                             | Oceania  | Micronesia                      |
| PRK          | Korea, Democratic People's Republic of               | Asia     | Eastern Asia                    |
| KOR          | Korea, Republic of                                   | Asia     | Eastern Asia                    |
| KWT          | Kuwait                                               | Asia     | Western Asia                    |
| KGZ          | Kyrgyzstan                                           | Asia     | Central Asia                    |
| LAO          | Lao People's Democratic Republic                     | Asia     | South-eastern Asia              |
| LVA          | Latvia                                               | Europe   | Northern Europe                 |
| LBN          | Lebanon                                              | Asia     | Western Asia                    |
| LSO          | Lesotho                                              | Africa   | Sub-Saharan Africa              |
| LBR          | Liberia                                              | Africa   | Sub-Saharan Africa              |
| LBY          | Libya                                                | Africa   | Northern Africa                 |
| LIE          | Liechtenstein                                        | Europe   | Western Europe                  |
| LTU          | Lithuania                                            | Europe   | Northern Europe                 |
| LUX          | Luxembourg                                           | Europe   | Western Europe                  |
| MAC          | Macao                                                | Asia     | Eastern Asia                    |
| MDG          | Madagascar                                           | Africa   | Sub-Saharan Africa              |
| MWI          | Malawi                                               | Africa   | Sub-Saharan Africa              |
| MYS          | Malaysia                                             | Asia     | South-eastern Asia              |
| MDV          | Maldives                                             | Asia     | Southern Asia                   |
| MLI          | Mali                                                 | Africa   | Sub-Saharan Africa              |
| MLT          | Malta                                                | Europe   | Southern Europe                 |
| MHL          | Marshall Islands                                     | Oceania  | Micronesia                      |
| MTQ          | Martinique                                           | Americas | Latin America and the Caribbean |
| MRT          | Mauritania                                           | Africa   | Sub-Saharan Africa              |
| MUS          | Mauritius                                            | Africa   | Sub-Saharan Africa              |
| MYT          | Mayotte                                              | Africa   | Sub-Saharan Africa              |
| MEX          | Mexico                                               | Americas | Latin America and the Caribbean |
| FSM          | Micronesia, Federated States of                      | Oceania  | Micronesia                      |
| MDA          | Moldova, Republic of                                 | Europe   | Eastern Europe                  |
| MCO          | Monaco                                               | Europe   | Western Europe                  |
| MNG          | Mongolia                                             | Asia     | Eastern Asia                    |
| MNE          | Montenegro                                           | Europe   | Southern Europe                 |
| MSR          | Montserrat                                           | Americas | Latin America and the Caribbean |
| MAR          | Morocco                                              | Africa   | Northern Africa                 |
| MOZ          | Mozambique                                           | Africa   | Sub-Saharan Africa              |
| MMR          | Myanmar                                              | Asia     | South-eastern Asia              |
| NAM          | Namibia                                              | Africa   | Sub-Saharan Africa              |
| NRU          | Nauru                                                | Oceania  | Micronesia                      |
| NPL          | Nepal                                                | Asia     | Southern Asia                   |
| NLD          | Netherlands, Kingdom of the                          | Europe   | Western Europe                  |
| NCL          | New Caledonia                                        | Oceania  | Melanesia                       |
| NZL          | New Zealand                                          | Oceania  | Australia and New Zealand       |
| NIC          | Nicaragua                                            | Americas | Latin America and the Caribbean |
| NER          | Niger                                                | Africa   | Sub-Saharan Africa              |
| NGA          | Nigeria                                              | Africa   | Sub-Saharan Africa              |
| NIU          | Niue                                                 | Oceania  | Polynesia                       |
| NFK          | Norfolk Island                                       | Oceania  | Australia and New Zealand       |
| MKD          | North Macedonia                                      | Europe   | Southern Europe                 |
| MNP          | Northern Mariana Islands                             | Oceania  | Micronesia                      |
| NOR          | Norway                                               | Europe   | Northern Europe                 |
| OMN          | Oman                                                 | Asia     | Western Asia                    |
| PAK          | Pakistan                                             | Asia     | Southern Asia                   |
| PLW          | Palau                                                | Oceania  | Micronesia                      |
| PSE          | Palestine, State of                                  | Asia     | Western Asia                    |
| PAN          | Panama                                               | Americas | Latin America and the Caribbean |
| PNG          | Papua New Guinea                                     | Oceania  | Melanesia                       |
| PRY          | Paraguay                                             | Americas | Latin America and the Caribbean |
| PER          | Peru                                                 | Americas | Latin America and the Caribbean |
| PHL          | Philippines                                          | Asia     | South-eastern Asia              |
| PCN          | Pitcairn                                             | Oceania  | Polynesia                       |
| POL          | Poland                                               | Europe   | Eastern Europe                  |
| PRT          | Portugal                                             | Europe   | Southern Europe                 |
| PRI          | Puerto Rico                                          | Americas | Latin America and the Caribbean |
| QAT          | Qatar                                                | Asia     | Western Asia                    |
| REU          | Réunion                                              | Africa   | Sub-Saharan Africa              |
| ROU          | Romania                                              | Europe   | Eastern Europe                  |
| RUS          | Russian Federation                                   | Europe   | Eastern Europe                  |
| RWA          | Rwanda                                               | Africa   | Sub-Saharan Africa              |
| BLM          | Saint Barthélemy                                     | Americas | Latin America and the Caribbean |
| SHN          | Saint Helena, Ascension and Tristan da Cunha         | Africa   | Sub-Saharan Africa              |
| KNA          | Saint Kitts and Nevis                                | Americas | Latin America and the Caribbean |
| LCA          | Saint Lucia                                          | Americas | Latin America and the Caribbean |
| MAF          | Saint Martin (French part)                           | Americas | Latin America and the Caribbean |
| SPM          | Saint Pierre and Miquelon                            | Americas | Northern America                |
| VCT          | Saint Vincent and the Grenadines                     | Americas | Latin America and the Caribbean |
| WSM          | Samoa                                                | Oceania  | Polynesia                       |
| SMR          | San Marino                                           | Europe   | Southern Europe                 |
| STP          | Sao Tome and Principe                                | Africa   | Sub-Saharan Africa              |
| SAU          | Saudi Arabia                                         | Asia     | Western Asia                    |
| SEN          | Senegal                                              | Africa   | Sub-Saharan Africa              |
| SRB          | Serbia                                               | Europe   | Southern Europe                 |
| SYC          | Seychelles                                           | Africa   | Sub-Saharan Africa              |
| SLE          | Sierra Leone                                         | Africa   | Sub-Saharan Africa              |
| SGP          | Singapore                                            | Asia     | South-eastern Asia              |
| SXM          | Sint Maarten (Dutch part)                            | Americas | Latin America and the Caribbean |
| SVK          | Slovakia                                             | Europe   | Eastern Europe                  |
| SVN          | Slovenia                                             | Europe   | Southern Europe                 |
| SLB          | Solomon Islands                                      | Oceania  | Melanesia                       |
| SOM          | Somalia                                              | Africa   | Sub-Saharan Africa              |
| ZAF          | South Africa                                         | Africa   | Sub-Saharan Africa              |
| SGS          | South Georgia and the South Sandwich Islands         | Americas | Latin America and the Caribbean |
| SSD          | South Sudan                                          | Africa   | Sub-Saharan Africa              |
| ESP          | Spain                                                | Europe   | Southern Europe                 |
| LKA          | Sri Lanka                                            | Asia     | Southern Asia                   |
| SDN          | Sudan                                                | Africa   | Northern Africa                 |
| SUR          | Suriname                                             | Americas | Latin America and the Caribbean |
| SJM          | Svalbard and Jan Mayen                               | Europe   | Northern Europe                 |
| SWE          | Sweden                                               | Europe   | Northern Europe                 |
| CHE          | Switzerland                                          | Europe   | Western Europe                  |
| SYR          | Syrian Arab Republic                                 | Asia     | Western Asia                    |
| TWN          | Taiwan, Province of China                            |          |                                 |
| TJK          | Tajikistan                                           | Asia     | Central Asia                    |
| TZA          | Tanzania, United Republic of                         | Africa   | Sub-Saharan Africa              |
| THA          | Thailand                                             | Asia     | South-eastern Asia              |
| TLS          | Timor-Leste                                          | Asia     | South-eastern Asia              |
| TGO          | Togo                                                 | Africa   | Sub-Saharan Africa              |
| TKL          | Tokelau                                              | Oceania  | Polynesia                       |
| TON          | Tonga                                                | Oceania  | Polynesia                       |
| TTO          | Trinidad and Tobago                                  | Americas | Latin America and the Caribbean |
| TUN          | Tunisia                                              | Africa   | Northern Africa                 |
| TUR          | Türkiye                                              | Asia     | Western Asia                    |
| TKM          | Turkmenistan                                         | Asia     | Central Asia                    |
| TCA          | Turks and Caicos Islands                             | Americas | Latin America and the Caribbean |
| TUV          | Tuvalu                                               | Oceania  | Polynesia                       |
| UGA          | Uganda                                               | Africa   | Sub-Saharan Africa              |
| UKR          | Ukraine                                              | Europe   | Eastern Europe                  |
| ARE          | United Arab Emirates                                 | Asia     | Western Asia                    |
| GBR          | United Kingdom of Great Britain and Northern Ireland | Europe   | Northern Europe                 |
| USA          | United States of America                             | Americas | Northern America                |
| UMI          | United States Minor Outlying Islands                 | Oceania  | Micronesia                      |
| URY          | Uruguay                                              | Americas | Latin America and the Caribbean |
| UZB          | Uzbekistan                                           | Asia     | Central Asia                    |
| VUT          | Vanuatu                                              | Oceania  | Melanesia                       |
| VEN          | Venezuela, Bolivarian Republic of                    | Americas | Latin America and the Caribbean |
| VNM          | Viet Nam                                             | Asia     | South-eastern Asia              |
| VGB          | Virgin Islands (British)                             | Americas | Latin America and the Caribbean |
| VIR          | Virgin Islands (U.S.)                                | Americas | Latin America and the Caribbean |
| WLF          | Wallis and Futuna                                    | Oceania  | Polynesia                       |
| ESH          | Western Sahara                                       | Africa   | Northern Africa                 |
| YEM          | Yemen                                                | Asia     | Western Asia                    |
| ZMB          | Zambia                                               | Africa   | Sub-Saharan Africa              |
| ZWE          | Zimbabwe                                             | Africa   | Sub-Saharan Africa              |
