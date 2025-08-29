# Patrick Keaveny's Coding Challenge for Akkio AI

## Description

Hey folks! Thanks so much for considering me for the position of Senior Frontend Developer at Akkio. At the bottom of this README, you can find instructions for setting up and running this project locally. 

## Project Overview

### Acceptance Criteria

Based on the prompt, I determined the following acceptance criteria for a completed project: 

1) On load, there should be two user inputs for Saturation and Lightness.
2) After selecting saturation and lightness, a grid should appear with relevant color swatches based on what is selected. 
3) Each item in the grid should have the visualized color, the color name, and RGB value.
4) The grid should be responsive
5) The grid should account for any performance tradeoffs

### Dependencies

- Vue.js (Vue 3)
- Vite
- PrimeVue
- Tailwind CSS
- TypeScript

While I'm familiar with Vue.js and Vite, I'm not as familiar with PrimeVue, so this was a fun challenge and learning experience getting PrimeVue set up. 

For PrimeVue, I decided to use a pre-made theme (Aura) and opted for tree shaking with an auto import resolver in order to reduce time spent manually importing dependencies in the main.ts file. I also configured it to use Tailwind CSS to make the helper classes available which saved me a lot of time on styling. 

### Design Considerations

I decided to use a Slider with an optional Input element for each user input because I find the Slider component is an easy to use, accessible component that users are familiar with and can easily configure. The Input is there for experienced users who already know the saturation and lightness values and who don't want to mess with the Slider. 

Instead of calling the API each time a value is updated, I've seen more success building user inputs with a "Submit" button for 2 main reasons: 

1) User has completely filled out the information and is expecting a change to happen when clicking a button (User Experience)
2) We only call the API when the button is clicked, not when a ref value changes (Performance)

### Dev Considerations

In order to only display unique values in the grid, I decided to filter out the response from the API and compare that with the swatches that already exist in the UI so we're not showing duplicates and don't show colors whose name is closely matched to an existing color. The drawback is that we don't know which colors are closely matched until we request information from the API, so this will be a slight performance hit as the frontend filters out duplicates. 

To account for this, instead of getting all possible swatches, we set a limit of 50 and then request 50 swatches at a time. This soft pagination allows the application to not get overloaded with requests to the API, while still getting relevant information for the user. I also changed the button label to "Get More Swatches" and added a disabled state to the button when the limit is 360 so the user knows when there is more data to fetch, and when there's no more swatches to display.

## Constraints

In order to complete this project in under 4 hours, there are a few things I descoped in order to make the project feature complete. If given more time, I would have addressed the following: 

1) Create a true Pagination grid with Arrow and Numbered buttons to navigate through the pages of swatches
2) Add a "Clear" button to reset the user inputs and the grid
3) Add a "Reset" button to reset the grid to the initial state (currently just accomplished this with watchers)
4) Move the components into child components so they can be reused
5) Add controls to the table such as Sorting and Filtering

## Project Setup

This project requires Node.js >= 16 and yarn. If you don't have yarn installed, you can install it with npm:

```sh
npm install -g yarn
```

## Install dependencies

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```
