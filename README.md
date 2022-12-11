# Who should use this template

This template is for people who want to build a web-extension for either firefox, chrome or both.

If follows the guides on [Browser Extensions Documentation on MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions?retiredLocale=de)

## Usage

1. Create a Repository from this template ([more info](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template))
2. replace the following placeholders globally:
    - `<your-project-name>`
    - `<your-project-description>`
3. Start the project locally

    ```bash
    npm install

    # serve firefox compatible extension
    npm run start:firefox
    # serve chrome compatible extension
    npm run start:chrome
    ```

4. Add the unpacked extension to your browser 
    - [firefox guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
    - [chrome guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

## Example Content

The template includes a basic example of a web-extension that lists visited websites and allows to visit one of them by clicking on its link in the popup.

The template includes basic messaging examples between the web-extension scripts running in different environments.

## Technologies used

- node 18
- React 18
- emotion (css-in-js)
- webpack
- typescript
