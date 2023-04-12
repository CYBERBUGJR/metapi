# Assignment 2: JavaScript

In this second assignment, you are tasked with adding interactivity to the __Artmart__ website using JavaScript.

You should build the website inside the `www` folder. It already contains a complete sample solution for A1, so you don't have to re-implement all of the HTML and CSS for the static part of the website. It also contains JavaScript fragments to use as starting points for A2. Take a look at what's there and figure out what remains to be done.

## What you need to do

- Familiarize yourself with the [Metropolitan Museum of Art Collection API][Met API], in particular the *Search* and *Object* endpoints. You will use this API throughout the rest of this course to access public domain images and metadata of artworks from the collection of the Metropolitan Museum of Art of New York City.

  > :warning: The automated tests intercept and mock all external API requests. You need to code against the real API, but you should be aware that the mocked API might return different results (while still fulfilling the same contract). This is by design.

- On the __Search__ page, the user should be able to search for artworks.
  - Use the query parameter `q` to store the current search term.
  - Use the [Met API] to search for and show artworks and their metadata.
  - If no search term is given, display a selection of highlights from the collection. The object IDs for the highlighted artworks can be found in `highlights.json`.
  - Consider only artworks that actually have images.
  - Return only the first 100 results per search.
  - Link the artwork image of each search result to the corresponding __Framing__ page.
  - During a search, instead of "Search our collection of more than 400,000 artworks", it should say `Searching for “<term>”…` where `<term>` is the search term. When the search is done, it should say `Found <number> artworks for “<term>”` where `<number>` is the number of results. Take care to properly pluralize "artworks", depending on the number of results, and to use the same exact punctuation as given here.

- On the __Framing__ page, the user should be able to configure a frame for a selected artwork.
  - Use a query parameter `objectID` to identify the artwork that is being framed. If the object does not exist, the user should be redirected to the __Search__ page.
  - Use the [Met API] to show the artwork and its metadata.
  - Use the helper functions in `frame.js` to add a frame preview to the artwork and dynamically update it whenever the print size, frame width, frame style, mat width, or mat color change.
  - Use the query parameters `printSize`, `frameStyle`, `frameWidth`, `matColor`, and `matWidth` to optionally pre-set the framing controls, so that other pages can link to a specific configuration. The width values should be given in millimeters.
  - Connect the frame width and mat width text fields with their respective range sliders, so that changing the value of the slider changes the value in the text field, and vice versa.
  - Ensure that only valid values can be entered for frame and mat width. The frame width can range from 2–5&nbsp;cm and the mat width from 0–10&nbsp;cm, both with 1&nbsp;mm steps.
  - Use the helper functions in `frame.js` to calculate the price of a particular framing.
  - When the "Add to Cart" button is pressed, add the selected artwork with its framing configuration to the shopping cart (see below for details) and redirect the user to the __Cart__ page.

- On the __Cart__ page, the user should be able to manage their shopping cart.
  - Use the local storage key `cart` to store the shopping cart. You should represent the cart as a JSON array of objects containing an `objectID` and the framing parameters, but nothing more. In particular, the cart should not contain the artwork metadata or the calculated price of each item.
  - For each item in the cart, show a preview of the framed artwork using the [Met API] and the helper functions in `frame.js`. The preview image should link to the corresponding __Framing__ page.  
  - For each item in the cart, show the usual metadata (artist, title, date) and a textual description of the configuration. The description should be like "Medium print in a 3.3&nbsp;cm natural frame with a 1.7&nbsp;cm mint mat." or "Small print in a 5&nbsp;cm classic frame." (if the mat has width zero).
  - Show the price of each item, as well as the sum total.
  - Allow the user to remove items from the cart by clicking on the circled "x". Removing an item from the cart should not cause the page to reload. The price total should be recalculated though.
  - Display the most recently added item on top.
  - If there are no items in the cart, show the message "There are no items in your shopping cart." and nothing else (except for the usual page header).

- The __Checkout__ page should allow the user to finalize their order.
  - If there are no items in the shopping cart, the user should be redirected to the (empty) __Cart__ page.
  - Calculate and show the subtotal for all items in the cart.
  - Show the available shipping destinations by populating the country `<select>` element with options corresponding to the countries in `shipping.json`. The text content of each option should be the country's `displayName` and the value of each option should be the country's `isoCode`.
  - Calculate and show the shipping costs using the selected country's `price` and `freeShippingThreshold` from `shipping.json`. If the subtotal is above the free shipping threshold, the shipping costs are zero and you should display "Shipping Costs: Free", with "Free" in bold style. If the threshold has not been reached, display "(Free shipping from: € `<freeShippingThreshold>`)" below the actual shipping costs and in 0.65 em font size, but only if free shipping is actually possible for the selected country.
  - Calculate and show the total price including shipping costs.
  - The pay button doesn't have to do anything (yet).

- On each page, next to the "Cart" link in the navigation, show the number of items in the shopping cart (in parentheses), except if there are no items in the cart.

- On each page where you access the [Met API], cache responses from the *Object* endpoint using local storage.

[Met API]: https://metmuseum.github.io

## Additional notes

- Parts of the assignment might be ambiguous and there might be some gaps in the specification. You will have to make some judgement calls. Let the tests be your guide.

- If something is not covered by the tests *but specified in the assignment*, then we expect you to implement it. We might run additional tests on our end. Inversely, if something is not specified in the assignment *but expected by the tests*, then we also expect you to implement it.

- This assignment is about **JavaScript**. You can use all the latest and greatest features of the current ECMAScript version (provided they are actually implemented in the current range of browsers). However, you are not allowed to use any third party libraries or frameworks. You are also not allowed to use TypeScript, or any other language that compiles down to JavaScript.

- You are not required to take backwards-compatibility into account. You can code against the latest versions of Chrome, Safari, Edge, and Firefox. You *will* need to ensure cross-browser and cross-platform compatibility, but within reason.

- **Keep it simple.** Don't read too much into the assignment. Try the simplest solution that could possibly work. Don't do anything fancy. There are no extra points for over-engineering.

- **This is a solo exercise.** You are required to solve it on your own. We encourage you to discuss the assignment with your coursemates, to ask questions on TUWEL, and to participate in the tutor hours. However, you will ultimately need to write your own code. You are not allowed to copy someone else's solution or solutions from previous years. *We have automated systems that check for plagiarism.*

## Tests

The `test` folder contains automated tests with which you can measure your progress.

> :warning: **Do not modify anything in the `test` folder.** For the final assessment, we will entirely replace this folder with our own (which also might include additional tests). If your code only works with modifications of the test scripts (no matter how trivial!) it will not pass the final tests.

Every time you push a commit to GitHub, the tests will be run automatically on GitHub's servers. To see the results, you have to go to your repository on GitHub and click on the *Actions* tab. There you will see all past test runs. Click on the latest run and look at the *Artifacts* field to download the test report.

If you wish to run the tests locally on your machine, you need to do the following:

1. Install [Node.js](https://nodejs.org). We recommend at least `node v19.0.0`, together with `npm v8.19.2` or later.

2. Navigate to the `test` directory of this project.

3. If this is your first time running the tests, install the dependencies of the test framework using `npm install`. You only need to do this once.

4. Run `npm test` to run all the tests and print out your point total. For details, see the generated `report.html` file.

> :warning: Please note that due to differences between platforms, it is possible that the results you get locally on your machine differ from those shown on GitHub. **What counts for your grade are the points you see on GitHub.**

## Development web server

Due to browser security features such as [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), it can be quite a hassle to develop websites purely with static files. For your convenience, you can start a local web server serving the `www` directory by issuing the following command inside the `test` directory:

    npm run server

> Note: you need to have installed the test framework dependencies first, see above.
