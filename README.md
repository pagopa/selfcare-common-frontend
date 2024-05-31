# SelfCare's common components & features 
This library contains [utilities](#utilities), [components](#components), [decorators](#decorators), [custom hooks](#custom-hooks) and [features](#features) built for the selfcare project.

# Localization
This libray has been built using react-i18next and string inside of it are also localizated.
Actually the library contains the only "it" translation.
The translations for the keys of the common components can be overwritten using the resources used during configuration.
In order to configure it call the method configureI18n of the module locale/locale-utils which accept the following parameters:
| Param | Type | Mandatory | Description |
|-------|------|-----------|-------------|
| resources | Y | { [lang: string]: any } | a map containing the language as key and the map containing the key/translated messages as value. These values overwrite common's component keys if desired |
| defaultLanguage | N | string | as default it language |

# Configuration
In order to use these components it's necessary to set the following keys of the CONFIG object imported from /config/env as first things inside the application:

| Key | Type | Description | DefaultValue |
|-----|------|-------------|--------------|
| URL_FE.LOGIN_GOOGLE | string | The url of the google login page | /auth/google |
| URL_FE.LOGIN | string | The url of the login page | /auth/login |
| URL_FE.LOGOUT | string | The url of the logout page | /auth/logout |
| URL_FE.ASSISTANCE | string | The url of the assistance page | /assistenza |
| MOCKS.MOCK_USER | boolean | If the application should configure a logged mocked User usable in DEV environment | false |
| ANALYTICS.* |  | See [analitics feature](#analytics) | |
| CONSENT.* |  | See [consent management feature](#consent-management) | |

# Components
## Header
SelfCare Header component

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| withSecondHeader | Y | boolean | If true, it will render an other toolbar under the Header |
| productsList| N |Array`ProductEntity`| The list of products in header. Default []  |
| selectedPartyId | N | The party id selected |
| selectedProductId | N | The product id selected. Default selfcareProduct.id |
| partyList | N | Array`PartyEntity` | The parties list. Default [] |
| loggedUser | Y | `JwtUser | false` | The logged user or false if there is not a valid session |
| assistanceEmail | N | string | The email to which the assistance button will ask to send an email, if the user is not logged in, otherwise it will be redirect to the assistance form |
| onSelectedProduct | N | (product: ProductSwitchItem) => void | The function invoked when the user click on a product |
| onSelectedParty | N | (exitAction: () => void) => void | The function invoked when the user click on a party from the switch |
| onExit | N | (exitAction: () => void) => void | The function invoked when exiting from the application. As default it will just invoke the exitAction. Default exitAction => exitAction() | 
| enableLogin | N | boolean | If false, it will hide login/logout buttons. Default true |
| userActions | N | Array `<UserAction>` | The users actions inside the user dropdown. It's visible only if enableLogin and enableDropdown are true. Default [] |
| enableDropdown | N | boolean | If true the user dropdown in headerAccount component is visible. It's visible only if enableLogin is true. Default false | 
| addSelfcareProduct | N | boolean | If true it concatenates selfcareProduct with productsList. Default true| 


## Footer
SelfCare Footer component

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| loggedUser | Y | boolean | The logged user or false if there is not a valid session |
| onExit | N | (exitAction: () => void) => void | The function invoked when exiting from the application. As default it will just invoke the exitAction. Default exitAction => exitAction() | 

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
| handleClose | React.MouseEventHandler`<HTMLButtonElement>` | Y | The function to be invoked when clicking on exit button or selecting a value |
| title | string | Y | The popup title |
| filterModalConfig | FilterModalConfig`<any, any>` | N | See below  |
| height | string | N | The popup height |
| minHeight | string | N | The popup minHeight |

FilterModalConfig fields:
| Field | Type | Mandatory | Description |
|-------|------|-----------|-------------|
| data | Array`<T>` | Y | The list of values between to which choose |
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
| onConfirm | React.MouseEventHandler`<HTMLButtonElement>` | N | If defined, it will render a confirm button using this function as behavior |
| onConfirmEnabled | boolean | N | If the confirm button should be enabled. Default true |
| onConfirmLabel | string | N | The confirm label text |
| productEnvironments | Array`<{environment: string;url: string;}>` | N | Introduced to manage the presence of test environments in the products, if defined, it will render as many buttons as there are test environments for the product |
| handleClose | React.MouseEventHandler`<HTMLButtonElement>` | Y | The function invoked when clicking on close button or in the showed X icon |
| handleExit | React.MouseEventHandler`<HTMLButtonElement>` | N | If defined, it allow to set a different behavior when clicking on X icon |
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
| width | string | N | The toast width |
| wrapped | boolean | N | If true, it will not position itself as fixed. Default false |
| bottom | string | N | If not wrapped, the pixel from the bottom of the viewport where to place the toast. Default "64px" |
| rigth | string | N | If not wrapped, the pixel from the right side of the viewport where to place the toast. Default "64px" |

## ToastWrapper
To stack multiple Toast component. Each Toast should have the prop wrapped setted to true

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| bottom | string | N | The pixel from the bottom of the viewport where to place the toast. Default "64px" |
| rigth | string | N | The pixel from the right side of the viewport where to place the toast. Default "64px" |

## Ending Page
Selfcare's ending page

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| minHeight | '52vh' \| '100vh' | N | The minHeight of the component, can be 52vh for the pages and 100vh for the blocking page |
| icon | React.ReactElement<SvgIconProps> \| FunctionComponent<SVGProps<SVGSVGElement>> \| string | N | The ending page icon |
| title | React.ReactNode | Y | The ending page title |
| description | React.ReactNode | Y | The ending page description | 
| buttonLabel | React.ReactNode | N | The ending page button label if any |
| secondButtonLabel | React.ReactNode | N | The ending page second button label if any |
| onButtonClick | () => void | N | If defined it will show a button that will perform this action on click |
| variantTitle | 'button' \| 'caption' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'inherit' \| 'subtitle1' \| 'subtitle2' \| 'body1' \| 'body2' \| 'overline' \| undefined | N | Set the variant of the title |
| variantDescription |  'button' \| 'caption' \| 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'inherit' \| 'subtitle1' \| 'subtitle2' \| 'body1' \| 'body2' \| 'overline' \| undefined | N | Set the variant of the description |
| variantFirstButton | 'contained' \| 'outlined' \| 'text' | N | Set the variant of the first button |
| variantSecondButton | 'contained' \| 'outlined' \| 'text' | N | Set the variant of the second button |
| paragraph | React.ReactNode | N | Set the text of paragraph |
| isParagraphPresent | boolean | N | Show the paragraph |
| haveTwoButtons | boolean | N | Show the second button and the "secondButtonLabel" as text of this one |

## NavigationBar
Selfcare's navigation bar

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| paths | Array`<NavigationPath>` | Y | The array which describe the navigation structure to display |

NavigationPath's fields:
| field | Type | Mandatory | Description |
|------|------|-----------|-------------|
| description | string | Y | The text displayed |
| onClick | () => void | N | If defined, it will represent the function executed when clicking on the element. Moreover it will be displayed in bold |

## LoadingOverlayComponent
A component which render an overlay loading

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| open | boolean | Y | if show the loading overlay or not |

NavigationPath's fields:
| field | Type | Mandatory | Description |
|------|------|-----------|-------------|
| description | string | Y | The text displayed |
| onClick | () => void | N | If defined, it will represent the function executed when clicking on the element. Moreover it will be displayed in bold |

# Utilities
## api-utils
### onRedirectToLogin: (store: EnhancedStore) => void
To show an error popup to inform of the not valid session

### buildFetchApi = (timeoutMs: number = 300000) => fetch
Return the implementation of fetch configured with a timeout

### extractResponse `<R>`(response: t.Validation`<TypeofApiResponse<any>>`, successHttpStatus: number, onRedirectToLogin: () => void, notValidTokenHttpStatus: number | null = 401, notAuthorizedTokenHttpStatus: number | null = 403, emptyResponseHttpStatus: number | null = 404): Promise`<R>`
Extract the response of a @pagopa/openapi-codegen-ts generated client rest invocation having status code successHttpStatus.
If notValidTokenHttpStatus is not null and the returned status is equal to notValidTokenHttpStatus, it will call the onRedirectToLogin function and will schedule the redirect towards logout path.
If notAuthorizedTokenHttpStatus is  not null and the returned status is equal to notAuthorizedTokenHttpStatus, it will throw an Error with message "Operation not allowed".
If emptyResponseHttpStatus is  not null and the returned status is equal to emptyResponseHttpStatus, it will return a promise that resolve to null value.
Other statuses will return will throw a generic error.

## constants
### roleLabels: { [key in UserRole]: { shortLabel: string; longLabel: string } }
The short and long labels used for the roles of selfcare's projects

## routes-utils
### resolvePathVariables: (path: string, pathVariables: { [key: string]: string }): string
It will resolve the path variables in path using the provided map

## storage-utils
### storageDelete: (key: string, local?: boolean) => void
It will delete a key from the session storage.
If local is true, it will use the local session storage instead.

### storageWrite: (key: string, value: StorageValue, type: StorageValueType, local?: boolean) => void
It will store a key/value pair in the session storage.
If local is true, it will use the local session storage instead.

### storageRead: (key: string, type: StorageValueType, local?: boolean) => void
It will read a key from the session storage.
If local is true, it will use the local session storage instead.

### storageOpsBuilder(key: string, type: StorageValueType, local: boolean): StorageOps
It will build an object containing a complete set of operation to perform on the same key.

## utils
### formatDateAsLongString: (date: Date) => string
It will return a string representing the provided date in the italian format gg mmm aaaa

## fixSwagger20ArraySchemaDef.js
An utility script to use when generating the stub through @pagopa/openapi-codegen-ts in order to handle the REST api whose operations returns an array of objects

## storage
### storageTokenOps
An object containing a complete set of operation on the storage regarding the key used to store in the storage the loggedUser token in selfcare projects.

### storageUserOps
An object containing a complete set of operation on the storage regarding the key used to store in the storage the loggedUser in selfcare projects.

## parseJwt
Decode and then convert the jwt into a JWTUser object

## isExpiredToken
Determines whether the token has expired

# Decorators
## withLogin
This feature is based on react-redux library and require to register the reducer build in userSlice into the application's redux store.
This decorator has to be applied to components whose acces require an active session.
Accessing to the components decorated with it without a session will brought to the login page.
It's possible to modify the login path changing the value in [CONFIG.URL_FE.LOGIN](#Configuration) inside the index.tsx file

## withRetrievedValue
Decorator to retrieve a value and serve it once ready to the decorated component, moreover it will provide the decorated component a function to re-execute the retrieve method.

Using it together with [useReduxCachedValue](#usereduxcachedvalue) will allow to build a component which will use centralized and cached data (the reload function in this case will call again the function that will retrieve cached data).

See withRetrievedValue.test.tsx file for an example.

Given the following type parameters:
* ENTITY_TYPE extends Record`<string, any>`,
* PROP_NAME extends string,
* PROPS extends Record`<PROP_NAME, ENTITY_TYPE>`

The arguments to provide to the decorator are the following:

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| propEntityName | PROP_NAME | Y | The name of the prop to which serve the value when available |
| getRetrieverService | () => () => Promise`<ENTITY_TYPE>` | Y | A function that will return an other function to retrieve the expected value. This for allow the use of custom hook  |
| WrappedComponent | React.ComponentType`<PROPS>` | Y | The component to decore |
| onError | (appError: AppError) => void | N | What to do in case of error. As default, it will use the feature ErrorBoundary |
| onLoading | ReactNode | N | A component to show while waiting for the value |

# Custom Hooks
## useFakePagination
Custom hook used to simulate paginated resources when the external service doesn't implement it, caching values when filter doesn't change and serving them a page at time.
Cached values are stored using useRef, so they are local to the component using this hook.
The sorting actually is applied using string representation

## useReduxCachedValue
See [useReduxCachedValueParametricRetrieverTranscoded](#usereduxcachedvaluetranscoded) when there is not RETRIEVER_ARGS and RETRIEVED_VALUE === RETRIEVER_ARGS

## useReduxCachedValueParametricRetriever
See [useReduxCachedValueParametricRetrieverTranscoded](#usereduxcachedvaluetranscoded) when RETRIEVED_VALUE === RETRIEVER_ARGS

## useReduxCachedValueTranscoded
See [useReduxCachedValueParametricRetrieverTranscoded](#usereduxcachedvaluetranscoded) when there is not RETRIEVER_ARGS

## useReduxCachedValueParametricRetrieverTranscoded
It will return a method that will call the retrieverService only when there are not storing values, or a condition on them is not more verified.
See useReduxCachedValue.test.tsx file for an example.

Given the following type parametes:
* RETRIEVED_VALUE the type desired
* STORED_VALUE the type stored

The arguments to provide to the custom hook are the following:

| Prop | Type | Mandatory | Description |
|------|------|-----------|-------------|
| entity | string | Y | The name of the entity, used just for logging purpose |
| retrieverService | (retrieverServiceArgs: RETRIEVER_ARGS) => Promise`<RETRIEVED_VALUE>` | Y | The service that will retrieve the value |
| reduxSelector | (state: any) => STORED_VALUE | undefined | Y | The selector to read the value from redux |
| reduxSetterAction | (value: RETRIEVED_VALUE, retrieverServiceArgs: RETRIEVER_ARGS) => PayloadAction`<STORED_VALUE>` | Y | The action to store the value |
| selectedValue2RetrievedValue | (value: STORED_VALUE, args: RETRIEVER_ARGS) => RETRIEVED_VALUE | Y | A function called to transform STORED_VALUE into RETRIEVED_VALUE and called when hitting the cache |
| selectedValuePredicate2Retrieve | (value: STORED_VALUE, retrieverServiceArgs: RETRIEVER_ARGS) => boolean | N | An optional predicate evaluated when reduxSelector returned some value in order to compare it against the retrieverServiceArgs and evaluate if retrieverService should be called again |
| alwaysRetrieve | boolean | N | If true, it will always retrieve and store the new value |

# Features
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
| displayableDescription | React.ReactNode | N | A text to show as body of the popup when a not blocking error occurs |
| onRetry | () => void | N | If defined, in case of not blocking error, it will render a retry button which will execute this function |
| onClose | () => void | N | If defined, in case of not blocking error, it will be executed when closing the popup |
| toNotify | boolean | Y | If true, it will notify the error |
| component | string | N | Can render a SessionModal or Toast component |
| autoclosable | string | N | If component === 'Toast'. The notify will be autoclosed using this configuration, as default timer. If none, it will not be closed automatically. If timer, it will be closed after autocloseMilliseconds milliseconds |
| autocloseMilliseconds | boolean | N | If component === 'Toast' and autoclosable === 'timer'. The millisecond after which close the notify. As default 2000 |
| width | string | N | The SessionModal or Toast width |

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
| autoclosable | string | N | If component === 'Toast'. The notify will be autoclosed using this configuration, as default timer. If none, it will not be closed automatically. If timer, it will be closed after autocloseMilliseconds milliseconds |
| autocloseMilliseconds | boolean | N | If component === 'Toast' and autoclosable === 'timer'. The millisecond after which close the notify. As default 10000 |
| width | string | N | The SessionModal or Toast width |

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
| PROPERTY_BLACKLIST | Array`<string>` | If the ip should be sent | ["$current_url", "$initial_referrer", "$referrer"] |
| ADDITIONAL_PROPERTIES | {[key: string]: string} | An object containing a fixed set of properties to send every time, overridden if the actual event will report the same properties | {} |
| ADDITIONAL_PROPERTIES_IMPORTANT | {[key: string]: string} | As ADDITIONAL_PROPERTIES, but these properties will take the precedence overriding events conflicting properties | {} |

In order track an event (once the initAnalytics method has been invoked) you have to call the trackEvent(event_name: string, properties?: any, callback?: () => void)=> void method where:
* event_name: the name of the event
* properties: the additional payload sent with the event
* callback: an action taken when the track has completed (If the action taken immediately after the track is an exit action from the application, it's better to use this callback to perform the exit, in order to give to mixPanel the time to send the event)

## Consent management
This feature allows the automatic enabling of the [analytics feature](#analytics) only when the user accept to send that data.

The tool used is [OneTrust](#https://www.onetrust.it/), and in order to be able to use it, you have:
1. to put the [script](#https://about.gitlab.com/handbook/marketing/inbound-marketing/digital-experience/onetrust-cookie-consent/#implementation) tag obtained when registering to the service inside the head section of your index.html file.
2. import the consentManagementConfigure.ts script inside your index.ts file (after the configuration of the common library)

| Key | Type | Description | DefaultValue |
|-----|------|-------------|--------------|
| COOKIE_GROUP_ANALYTICS | string | The cookie group configured for the analytics tool. MixPanel's cookies are configured as default by OneTrust with C0004 group, or as Targeting Cookies | C0004 |
