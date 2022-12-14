# Material UI

__Quick Links:__

* [Angular Material](https://material.angular.io/)
* [Google Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)
* [Flex Layout Demo](https://tburleson-layouts-demos.firebaseapp.com/#/docs)
* [Angular AG Grid](https://www.ag-grid.com/angular-data-grid/)

> Prerequisite: [NodeJS](https://nodejs.org/en/download/)
> and [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli@14.1.1`

## 1. Angular Material

Install the [Angular 14 Material](https://v14.material.angular.io/guides) dependency to the project:

```shell
ng add @angular/material@14.2.7
```

This will automatically add some imports to the [index.html](../organizer-ui/src/index.html) which include
the [Google Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons).

Create the [material-module.ts](../organizer-ui/src/app/material-module.ts) to import all material modules at once for
easier usage. To use the `material-module.ts`, it is required to import it in
the [app.module.ts](../organizer-ui/src/app/app.module.ts).

```ts
@NgModule({
    imports: [
        MaterialModule
    ],
})
export class AppModule {
}
```

After the import, all [Angular Material Components](https://material.angular.io/components) are available in the
application.

### 1.1. Custom Theme

> Full Guide: [Angular Material Theming](https://material.angular.io/guide/theming)

First of all it is required to create a [custom-palette.scss](../organizer-ui/src/styles/custom-palette.scss) with the
required colors for `primary, accent & warn`. Then it is required to define a `custom theme` like in
the [material-theme.scss](../organizer-ui/src/styles/material-theme.scss).

After the import in the [styles.scss](../organizer-ui/src/styles.scss), the custom theme gets applied.

To make a dynamic theme, it is required to create scoped themes within `css-classes`. These classes can be applied on
the first level of material style (usually the `<body class="mat-typography mat-app-background">` in
the [index.html](../organizer-ui/src/index.html)):

```js
document.getElementById('index-body').className = 'my-theme-class mat-typography mat-app-background';
```

### 2.1. Custom Fonts

Custom fonts can be created like this:

```scss
@font-face {
  font-family: "font-name";
  font-style: normal;
  font-weight: 400;
  src: url("material-ui.md") format("truetype")
}
```

The source can be files like `.ttf` as `truetype` or `.woff` as `woff`. The definition can be at the same place as the
theme. Then the font can be applied to the `typography` of the theme, to style all material components. For all plain
HTML elements, it needs to be applied in the [styles.scss](../organizer-ui/src/styles.scss) as well.

## 2. Flex Layout

To structure the layout, the [Angular Flex Layout](https://github.com/angular/flex-layout) is used. It helps to align
content easily and is defined in the HTML. To not cluster too many tags into the HTML, most of the time only `<div>`s
have an applied layout.

Get more information on the [Flex Layout Demo](https://tburleson-layouts-demos.firebaseapp.com/#/docs).

* Layout `row` aligns first `horizontal` and then `vertical`.
* Layout `column` aligns first `vertical` and then `horizontal`.

__Example:__

```
<div fxLayout="column" fxLayoutAlign="start center" >
```

## 3. Data Grid Libraries

The Angular Material Library already includes a table, but it is often not suitable for large data and high flexibility.
Therefore, it is useful to import another library for especially __data grids__.

### 3.1. AG Grid Community

Install the [Angular AG Grid](https://www.ag-grid.com/angular-data-grid/getting-started/) dependency to the project:

```shell
npm install --save ag-grid-community
npm install --save ag-grid-angular
```

After that the `AgGridModule` can be imported into the [app.module.ts](../organizer-ui/src/app/app.module.ts):

```ts
@NgModule({
    imports: [
        AgGridModule
    ],
})
export class AppModule {
}
```

And the style can be imported into the [styles.scss](../organizer-ui/src/styles.scss):

```
@import 'ag-grid-community/styles/ag-grid.css';
@import 'ag-grid-community/styles/ag-theme-alpine.css';
```
