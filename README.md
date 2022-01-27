# Common components used to build pagopa/selfcare react projects
## Header
SelfCare Header component

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| withSecondHeader | Y | boolean | if true, it will render an other toolbar under the Header |
| onExitAction | N | (() => void) &#124; null | The function to be invoked when pressing the rendered logout button, if not defined it will redirect to the logout page, if setted to null it will no render the logout button. It's possible to modify the logout path changing the value in CONFIG.logout inside the index.tsx file |
| subHeaderChild | N | React.ReactNode | If withSecondHeader is true, this component will be rendered at the end of the secondary toolbar |

## Footer
SelfCare Footer component

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| assistanceEmail | string | N | The email to which the assistance button will ask to send an email |

## CustomAvatar
Avatar to use to load Organization logo

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| id | string | N | The id attribute added to the element |
| customSrc | string | N | The logo src |
| customAlt | string | N | The alt text showed instead of the image |
| customWidth | string | N | Logo width |
| customHeight | string | N | Logo height |
| loading | boolean | N | If true it will not display the component |

## CustomPagination
Selfcare custom table available pages component

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| page | Page | Y | The actual page |
| sort | string | N | The actual sort applied |
| onPageRequest | (r: PageRequest) => void | Y | The function to be invoked if the user change page |

## FilterModal
Modal used to show a list of values from which to choose a single value

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| open | boolean | Y | If the popup is to be displayed |
| handleClose | React.MouseEventHandler<HTMLButtonElement> | Y | The function to be invoked when clicking on exit button or selecting a value |
| title | string | Y | The popup title |
| filterModalConfig | FilterModalConfig<any, any> | N | See below  |
| height | string | N | The popup height |
| minHeight | string | N | The popup minHeight |

FilterModalConfig fields:
| Field | Type | Mandatory | Description |
|-------|------|-----------|-------------|
| data | Array<T> | Y | The list of values between to which choose |
| getLabel | (e: T) => string | Y | A function that will select the label to show |
| getValue | (e: T) => string | Y | A function that will select the value to return when selecting an item |
| onFilterChange | (v: V) => void | Y | The function invoked when selecting a value |

## SessionModal
Selfcare's popup

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| open | boolean | Y | If this component should be displayed or not |
| title | string | Y | The title to show in the popup |
| message | React.ReactNode | Y | The body to show in the popup |
| onConfirm | React.MouseEventHandler<HTMLButtonElement> | N | If defined, it will render a confirm button using this function as behavior |
| onConfirmLabel | string | N | The confirm label text |
| handleClose | React.MouseEventHandler<HTMLButtonElement> | Y | The function invoked when clicking on close button or in the showed X icon |
| handleExit | React.MouseEventHandler<HTMLButtonElement> | N | If defined, it allow to set a different behavior when clicking on X icon |
| onCloseLabel | string | N | Close button text |
| height | string | N | The popup height |
| minHeight | string | N | The popup minHeight |
| width | string | N | The popup width |

## TitleBox
Selfcare's page title

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| title | string | Y | The title to show |
| subTitle | string | N | The subtitle to show |
| mtTitle | number | N | The margin top of the title |
| mbTitle | GridSize | N | The margin bottom of the title |
| mbSubTitle | number | N | The margin bottom of the subtitle |
| variantTitle | Variant | N | The variant of the Typografy used for the title |
| variantSubTitle | Variant | N | The variant of the Typografy used for the subtitle |

## Toast
Selfcare's toast

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| open | boolean | Y | If this component should be displayed or not |
| logo | React.ElementType | N | The logo to be rendered. As default a confirm logo will be used |
| leftBorderColor | string | N | The color used for the left border. | 
| title | string | Y | The toast title |
| message | React.ReactNode | Y | The toast body |
| onCloseToast | ()=>void | Y | The function to be invoked when closing the toast |

## Ending Page
Selfcare's ending page

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| icon | React.ReactElement | N | The ending page icon |
| title | string | Y | The ending page title |
| description | string | Y | The ending page description | 
| buttonLabel | string | N | The ending page button label if any |
| onButtonClick | () => void | N | if defined it will show a button that will performe this action on click |

# Common decorators used in pagopa/selfcare react projects
## withLogin
This feature is based on react-redux library and require to register the reducer build in userSlice into the application's redux store.
This decorator has to be applied to components whose acces require an active session.
Accessing to the components decorated with it without a session will brought to the login page.
It's possible to modify the login path changing the value in CONFIG.login inside the index.tsx file

# Common features used in pagopa/selfcare react projects
## LoadingOverlay
This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to draw a loader when an async task to wait is running.

To use this feature you have to put LoadingOverlay in your App as a child of a redux Provider component.
In order to register the start of an async task you have to use the custom hook useLoading passing the id of the task to await, which will return a setter function used to start and end the loading behavior.

## ErrorBoundary
This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to dispatch errors in order to display a warning or the error page to the user.
Errors dispatched will be notified using errorService

To use this feature you have to put ErrorBOundary in your App as a child of a redux Provider component.
In order to dispatch an error you have to use the custom hook useErrorDispatcher which will return a fuction to be used to dispatch the error.

The error to be submitted has type AppError which has the following fields:

| Field | Type | Mandatory | Description |
|-------|------|-----------|-------------|
| id | string | Y | The identifier used to recognize the error: it cannot be possible to have the same error id at the same time |
| error | Error | Y | The Error thrown |
| errorInfo | ErrorInfo | N |  |
| blocking | boolean | Y | If true, this error will show the error page, not allowing the user to do anything, otherwise it will show a closable popup |
| techDescription | string | Y | A description of the error to send when notifying the error |
| displayableTitle | string | N | A text to show as title of the popup when a not blocking error occurs |
| displayableDescription | string | N | A text to show as body of the popup when a not blocking error occurs |
| onRetry | () => void | N | If defined, in case of not blocking error, it will render a retry button which will execute this function |
| onClose | () => void | N | If defined, in case of not blocking error, it will be executed when closing the popup |
| toNotify | boolean | Y | If true, it will notify the error |
| component | string | N | Can render a SessionModal or Toast component |

ASIS the notify consists just on the console.error invocation
