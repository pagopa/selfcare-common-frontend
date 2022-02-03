# SelfCare's common components & features
This library contains utility, components and features built for the selfcare project.

# Configuration
In order to use these components it's necessary to set the following keys of the CONFIG object imported from /config/env as first things inside the application:

| Key | Type | Description | DefaultValue |
| URL_FE.LOGIN | string | The url of the login page | /auth/login |
| URL_FE.LOGOUT | string | The url of the logout page | /auth/logout |
| URL_FE.ASSISTANCE | string | The url of the assistance page | /assistenza |
| MOCKS.MOCK_USER | boolean | If the application should configure a logged mocked User usable in DEV environment | false |
| ANALYTICS.* |  | See [analitics feature](#analytics) | |
| CONSENT.* |  | See [consent management feature](#consent-management) | |

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
| mbTitle | number | N | The margin bottom of the title |
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

# Utility functions
## api-utils
### onRedirectToLogin: (store: EnhancedStore) => void
To show an error popup to inform of the not valid session

### buildFetchApi = (timeoutMs: number = 300000) => fetch
Return the implementation of fetch configured with a timeout

### extractResponse <R>(response: t.Validation<TypeofApiResponse<any>>, successHttpStatus: number, onRedirectToLogin: () => void, notValidTokenHttpStatus: number | null = 401, notAuthorizedTokenHttpStatus: number | null = 403, emptyResponseHttpStatus: number | null = 404): Promise<R>
Extract the response of a @pagopa/openapi-codegen-ts generated client rest invocation having status code successHttpStatus.
If notValidTokenHttpStatus is not null and the returned status is equal to notValidTokenHttpStatus, it will call the onRedirectToLogin function and will schedule the redirect towards logout path.
If notAuthorizedTokenHttpStatus is  not null and the returned status is equal to notAuthorizedTokenHttpStatus, it will throw an Error with message "Operation not allowed".
If emptyResponseHttpStatus is  not null and the returned status is equal to emptyResponseHttpStatus, it will return a promise that resolve to null value.
Other statuses will return will throw a generic error.

## constants
### STORAGE_KEY_USER: string
The key used to store in the session storage the loggedUser in selfcare projects

### STORAGE_KEY_TOKEN: string
The key used to store in the session storage the logged user token in selfcare projects

### roleLabels: { [key in UserRole]: { shortLabel: string; longLabel: string } }
The short and long labels used for the roles of selfcare's projects

## routes-utils
### resolvePathVariables: (path: string, pathVariables: { [key: string]: string }): string
It will resolve the path variables in path using the provided map

## storage-utils
### storageDelete: (key: string) => void
It will delete a key from the local session storage

### storageWrite: (key: string, value: StorageValue, type: StorageValueType) => void
It will store a key/value pair in the local session storage

### function storageRead: (key: string, type: StorageValueType) => void
It will read a key from the local session storage

## utils
### formatDateAsLongString: (date: Date) => string
It will return a string representing the provided date in the italian format gg mmm aaaa

## fixSwagger20ArraySchemaDef.js
An utility script to use when generating the stub through @pagopa/openapi-codegen-ts in order to handle the REST api whose operations returns an array of objects

# Common decorators used in pagopa/selfcare react projects
## withLogin
This feature is based on react-redux library and require to register the reducer build in userSlice into the application's redux store.
This decorator has to be applied to components whose acces require an active session.
Accessing to the components decorated with it without a session will brought to the login page.
It's possible to modify the login path changing the value in [CONFIG.URL_FE.LOGIN](#Configuration) inside the index.tsx file

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

The error will be notified as a GENERIC_ERROR through the [analytcs feature](#analytics)

## UserNotifyHandle
This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to dispatch User Notifies in order to display a pop up or a toast notification.

To use this feature you have to put UserNotifyHandle in your App as a child of a redux Provider component.
In order to dispatch a User Notify, you have to use the custom hook useUserNotify which will return a fuction to be used to dispatch the User Notify.

The user notify to be submitted has type UserNotify which has the following fields:

| Field | Type | Mandatory | Description |
|-------|------|-----------|-------------|
| id | string | Y | The identifier used to recognize the user notify: it cannot be possible to have the same error id at the same time |
| title | string | Y | / The title to show in the popup or toast |
| message | React.ReactNode | Y | The body to show in the popup or toast |
| logo | React.ElementType | N | If component === 'Toast'. The logo to be rendered. As default a confirm logo will be used |
| leftBorderColor | string | N | If component === 'Toast'. The color used for the left border |
| onConfirm | () => void | N | If component === 'SessionModal'. If defined, it will render a confirm button which will execute this function |
| confirmLabel | string | N | If component === 'SessionModal'. If present, this string will rappresent the confirm button label |
| onClose | () => void | N | If defined, it will be executed when closing the popup |
| closeLabel | string | N | If component === 'SessionModal'. The close button label |
| component | string | N | Can render a SessionModal or Toast component |

## UnloadEventHandler
This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to intercept when the user try to exit from the current page and ask him if he wants to continue or not.

To use this feature you have to put UnloadEventHandler in your App as a child of a redux Provider component.
In order to use this feature you have to use the custom hook useUnloadEventInterceptor, which will return an object having the following keys:
1.  registerUnloadEvent: an arrow function which takes two optional parameters to customize the title and the description of the pop-up opened when invoking the exitAction function (see below) and enable the functionality.
2.  unregisterUnloadEvent: an arrow function to call in order to disable this functionality.

If you wont to enable immediately this functionality when invoking the custom hook you can use the hook useUnloadEventInterceptorAndActivate, which will enable the functionality and will disable it when unmounting the component.

In order to show a custom pop-up when the user trigger an exit action you have to use the custom hook useUnloadEventOnExit which will return an arrow function to invoke instead of the exit action passing to it the exitAction itself.

When the exitAction is the Logout you can use the custom hook useUnloadEventLogout which is the customization of the useUnloadEventOnExit using the logout as an exit action.

## Analytics
This feature allow to track the application events through an analytics tool.
The actual version of the library make use of [mixpanel tool](https://mixpanel.com/) to handle the tracking.

In order to start the analytics you have to call the initAnalytics method imported from the service/analyticsService module, otherwise this feature will be ignored

This feature can be configured with the following keys of the [CONFIG](#Configuration) object (each key has the ANALYTCS. prefix):

| Key | Type | Description | DefaultValue |
|-----|------|-------------|--------------|
| ENABLED | boolean | If disabled, it will do nothing (except for event having name GENERIC_ERROR, if disabled, these events will be printed through console.error) | false |
| MOCK | boolean | If true, it will print the event through the console.log function | false |
| DEBUG | boolean | If the mixpanel's debug feature should be enabled | false |
| TOKEN | string | The token to use when sending event data | |
| API_HOST | string | The url where to send mixpanel events | `https://api-eu.mixpanel.com` |
| PERSISTENCE | string | Where to store session data, possible values are cookie or localStorage | localStorage |
| LOG_IP | boolean | If the ip should be sent | false |
| LOG_IP | boolean | If the ip should be sent | false |
| PROPERTY_BLACKLIST | Array<string> | If the ip should be sent | ["$current_url", "$initial_referrer", "$referrer"] |
| ADDITIONAL_PROPERTIES | {[key: string]: string} | An object containing a fixed set of properties to send every time, overridden if the actual event will report the same properties | {} |
| ADDITIONAL_PROPERTIES_IMPORTANT | {[key: string]: string} | As ADDITIONAL_PROPERTIES, but these properties will take the precedence overriding events conflicting properties | {} |

## Consent management
This feature allows the automatic enabling of the [analytics feature](#analytics) only when the user accept to send that data.

The tool used is [OneTrust](#https://www.onetrust.it/), and in order to be able to use it, you have:
1. to put the [script](#https://about.gitlab.com/handbook/marketing/inbound-marketing/digital-experience/onetrust-cookie-consent/#implementation) tag obtained when registering to the service inside the head section of your index.html file.
2. import the consentManagementConfigure.ts script inside your index.ts file (after the configuration of the common library)