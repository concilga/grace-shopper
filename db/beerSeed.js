require("dotenv").config();
const client = require("./");

async function getBeerSeed() {
    const beers = [
        {
          "name": "Buzz",
          "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
          "image_url": "https://images.punkapi.com/v2/keg.png",
          "abv": 4.5,
          "brewery": "Brewdogs",
          "style": "IPA",
          "price": 10.99
        },
        {
          "id": 2,
          "name": "Trashy Blonde",
          "description": "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.",
          "image_url": "https://images.punkapi.com/v2/2.png",
          "abv": 4.1,
          "brewery": "Brewdogs",
          "style": "Pale Ale",
          "price": 11.99
        },
        {
          "id": 3,
          "name": "Berliner Weisse With Yuzu - B-Sides",
          "description": "Japanese citrus fruit intensifies the sour nature of this German classic.",
          "image_url": "https://images.punkapi.com/v2/keg.png",
          "abv": 4.2,
          "brewery": "Brewdogs",
          "style": "Berliner Weisse",
          "price": 12.99
        },
        {
          "id": 4,
          "name": "Pilsen Lager",
          "description": "Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.",
          "image_url": "https://images.punkapi.com/v2/4.png",
          "abv": 6.3,
          "brewery": "Brewdogs",
          "style": "lager",
          "price": 12.99
        },
        {
          "id": 5,
          "name": "Avery Brown Dredge",
          "description": "An Imperial Pilsner in collaboration with beer writers. Tradition. Homage. Revolution. We wanted to showcase the awesome backbone of the Czech brewing tradition, the noble Saaz hop, and also tip our hats to the modern beers that rock our world, and the people who make them.",
          "image_url": "https://images.punkapi.com/v2/5.png",
          "abv": 7.2,
          "brewery": "Brewdogs",
          "style": "Imperial Pilsner",
          "price": 11.99
        },
        {
          "id": 6,
          "name": "Electric India",
          "description": "Re-brewed as a spring seasonal, this beer which appeared originally as an Equity Punk shareholder creation retains its trademark spicy, fruity edge. A perfect blend of Belgian Saison and US IPA, crushed peppercorns and heather honey are also added to produce a genuinely unique beer.",
          "image_url": "https://images.punkapi.com/v2/6.png",
          "abv": 5.2,
          "brewery": "Brewdogs",
          "style": "IPA",
          "price": 10.99
        },
        {
          "id": 7,
          "name": "AB:12",
          "description": "An Imperial Black Belgian Ale aged in old Invergordon Scotch whisky barrels with mountains of raspberries, tayberries and blackberries in each cask. Decadent but light and dry, this beer would make a fantastic base for ageing on pretty much any dark fruit - we used raspberries, tayberries and blackberries beause they were local.",
          "image_url": "https://images.punkapi.com/v2/7.png",
          "abv": 11.2,
          "brewery": "Brewdogs",
          "style": "Imperial Belgian Ale",
          "price": 13.99
        },
        {
          "id": 8,
          "name": "Fake Lager",
          "description": "Fake is the new black. Fake is where it is at. Fake Art, fake brands, fake breasts, and fake lager. We want to play our part in the ugly fallout from the Lager Dream. Say hello to Fake Lager a zesty, floral 21st century faux masterpiece with added BrewDog bitterness.",
          "image_url": "https://images.punkapi.com/v2/8.png",
          "abv": 4.7,
          "brewery": "Brewdogs",
          "style": "Pilsner",
          "price": 8.99
        },
        {
          "id": 9,
          "name": "AB:07",
          "description": "Whisky cask-aged imperial scotch ale. Beer perfect for when the rain is coming sideways. Liquorice, plum and raisin temper the warming alcohol, producing a beer capable of holding back the Scottish chill.",
          "image_url": "https://images.punkapi.com/v2/9.png",
          "abv": 12.5,
          "brewery": "Brewdogs",
          "style": "Scotch Ale",
          "price": 16.99
        },
        {
          "id": 10,
          "name": "Bramling X",
          "description": "Good old Bramling Cross is elegant, refined, assured, (boring) and understated. Understated that is unless you hop the living daylights out of a beer with it. This is Bramling Cross re-invented and re-imagined, and shows just what can be done with English hops if you use enough of them. Poor Bramling Cross normally gets lost in a woeful stream of conformist brown ales made by sleepy cask ale brewers. But not anymore. This beer shows that British hops do have some soul, and is a fruity riot of blackberries, pears, and plums. Reminds me of the bramble, apple and ginger jam my grandmother used to make.",
          "image_url": "https://images.punkapi.com/v2/10.png",
          "abv": 7.5,
          "brewery": "Brewdogs",
          "style": "IPA",
          "price": 12.79
        },
        {
          "id": 11,
          "name": "Misspent Youth",
          "description": "The brainchild of our small batch brewer, George Woods. A dangerously drinkable milk sugar- infused Scotch Ale.",
          "image_url": "https://images.punkapi.com/v2/keg.png",
          "abv": 7.3,
          "brewery": "Brewdogs",
          "style": "Scotch Ale",
          "price": 13.79
        },
        {
          "id": 12,
          "name": "Arcade Nation",
          "description": "Running the knife-edge between an India Pale Ale and a Stout, this particular style is one we truly love. Black IPAs are a great showcase for the skill of our brew team, balancing so many complex and twisting flavours in the same moment. The citrus, mango and pine from the hops – three of our all-time favourites – play off against the roasty dryness from the malt bill at each and every turn.",
          "image_url": "https://images.punkapi.com/v2/12.png",
          "abv": 5.3,
          "brewery": "Brewdogs",
          "style": "IPA",
          "price": 9.99
        },
        {
          "id": 13,
          "name": "Movember",
          "description": "A deliciously robust, black malted beer with a decadent dark, dry cocoa flavour that provides an enticing backdrop to the Cascade hops.",
          "image_url": "https://images.punkapi.com/v2/13.png",
          "abv": 4.5,
          "brewery": "Brewdogs",
          "style": "Black Malt",
          "price": 10.97
        },
        {
          "id": 14,
          "first_brewed": "02/2010",
          "description": "A fusion of caramel malt flavours and punchy New Zealand hops. A session beer you can get your teeth into.",
          "image_url": "https://images.punkapi.com/v2/14.png",
          "abv": 4.5,
          "brewery": "Brewdogs",
          "style": "Red Ale",
          "price": 9.97
        },
        {
          "id": 15,
          "name": "Mixtape 8",
          "description": "This recipe is for the Belgian Tripel base. A blend of two huge oak aged beers – half a hopped up Belgian Tripel, and half a Triple India Pale Ale. Both aged in single grain whisky barrels for two years and blended, each beer brings its own character to the mix. The Belgian Tripel comes loaded with complex spicy, fruity esters, and punchy citrus hop character.",
          "image_url": "https://images.punkapi.com/v2/15.png",
          "abv": 14.5,
          "brewery": "Brewdogs",
          "style": "Belgian Tripel: Old belgian, American new wave, Scotish whisky",
          "price": 20.99
        },
        {
          "id": 16,
          "name": "Libertine Porter",
          "description": "An avalanche of cross-continental hop varieties give this porter a complex spicy, resinous and citrusy aroma, with a huge malt bill providing a complex roasty counterpoint. Digging deeper into the flavour draws out cinder toffee, bitter chocolate and hints of woodsmoke.",
          "image_url": "https://images.punkapi.com/v2/16.png",
          "abv": 6.1,
          "brewery": "Brewdogs",
          "style": "Porter",
          "price": 13.99
        },
        {
          "id": 17,
          "name": "AB:06",
          "description": "Our sixth Abstrakt, this imperial black IPA combined dark malts with a monumental triple dry-hop, using an all-star team of some of our favourite American hops. Roasty and resinous.",
          "image_url": "https://images.punkapi.com/v2/17.png",
          "abv": 11.2,
          "brewery": "Brewdogs",
          "style": "Imerial Black IPA",
          "price": 17.99
        },
        {
          "id": 18,
          "name": "Russian Doll, India Pale Ale",
          "description": "The levels of hops vary throughout the range. We love hops, so all four beers are big, bitter badasses, but by tweaking the amount of each hop used later in the boil and during dry- hopping, we can balance the malty backbone with some unexpected flavours. Simcoe is used in the whirlpool for all four beers, and yet still lends different characters to each",
          "image_url": "https://images.punkapi.com/v2/18.png",
          "abv": 6,
          "brewery": "Brewdogs",
          "style": "IPA",
          "price": 10.99
        },
        {
          "id": 19,
          "name": "Hello My Name Is Mette-Marit",
          "description": "We sent this beer to Norway where it was known as 'Hello, my name is Censored’. You can make up your own mind as to why. This brew was a red berry explosion, with a reisnous bitter edge layered with dry berry tartness.",
          "image_url": "https://images.punkapi.com/v2/19.png",
          "abv": 8.2,
          "brewery": "Brewdogs",
          "style": "LingonBerry Double IPA",
          "price": 13.99
        },
        {
          "id": 20,
          "name": "Rabiator",
          "description": "Imperial Wheat beer / Weizenbock brewed by a homesick German in leather trousers. Think banana bread, bubble gum and David Hasselhoff.",
          "image_url": "https://images.punkapi.com/v2/keg.png",
          "abv": 10.27,
          "brewery": "Brewdogs",
          "style": "Imerial Wheat Beer, Weizenbock",
          "price": 17.99
        },
        {
          "id": 22,
          "name": "Devine Rebel (w/ Mikkeller)",
          "description": "Two of Europe's most experimental, boundary-pushing brewers, BrewDog and Mikkeller, combined forces to produce a rebellious beer that combined their respective talents and brewing skills. The 12.5% Barley Wine fermented well, and the champagne yeast drew it ever closer to 12.5%. The beer was brewed with a single hop variety and was going to be partially aged in oak casks.",
          "image_url": "https://images.punkapi.com/v2/22.png",
          "abv": 12.5,
          "brewery": "Brewdogs",
          "style": "Oak aged Barley Wine",
          "price": 19.99
        },
        {
          "id": 23,
          "name": "Storm",
          "description": "Dark and powerful Islay magic infuses this tropical sensation of an IPA. Using the original Punk IPA as a base, we boosted the ABV to 8% giving it some extra backbone to stand up to the peated smoke imported directly from Islay.",
          "image_url": "https://images.punkapi.com/v2/23.png",
          "abv": 8,
          "brewery": "Brewdogs",
          "style": "Whisky Aged IPA",
          "price": 13.99
        },
        {
          "id": 24,
          "name": "The End Of History",
          "description": "The End of History: The name derives from the famous work of philosopher Francis Fukuyama, this is to beer what democracy is to history. Complexity defined. Floral, grapefruit, caramel and cloves are intensified by boozy heat.",
          "image_url": "https://images.punkapi.com/v2/24.png",
          "abv": 55,
          "brewery": "Brewdogs",
          "style": "Legally Liquor",
          "price": 500
        },
        {
          "id": 25,
          "name": "Bad Pixie",
          "description": "2008 Prototype beer, a 4.7% wheat ale with crushed juniper berries and citrus peel.",
          "image_url": "https://images.punkapi.com/v2/25.png",
          "abv": 4.7,
          "brewery": "Brewdogs",
          "style": "Spiced Wheat Beer",
          "price": 8.99
        }
    ]
    return beers;
}

module.exports = getBeerSeed;