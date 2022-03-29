# structure

## interfaces structure

1. ### `{name of interface}Model` like `UserModel`
this kind of interfaces is indicating the exact responce coming from backend, name and content of this interfaces have to be exactly same as the coresponding backend Model

2. ### `{name of component}Props` like `ProductComponentProps`
this kind of interfaces indicate the props type of a component
every component hase a props that acts as input for that component. we indicate their type by creating a interface for them. those interfaces will always end with `props` postfix.

3. ### `I{name of interface}` like `IUser`
every interface that is not belonge to the type 1 and 2, take place here. just reqular interfaces


### notes
1. don't use type 1 any where other than `apiSevice` and `adaptorServie`, they only used for reciving the data and have to change to a type 3 interface to be able to used inside the project.
