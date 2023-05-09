type Brand<K, T> = K & { __brand: T }

type Email = Brand<string, 'email'>

type UserProp = 'email' | 'username' | 'password'

type User = Record<UserProp, | string> & {
    email: Email
}

type UserPartial = Partial<User>

type NewInfo = User & {
    newEmail: Email,
    newUsername: string,
    newPassword: string,
}

type TextFieldProp = {
    onChange: (args: UserPartial) => void,
    value: User,
    label: string,
    id: UserProp,
    type: 'text' | 'password',
    required?: boolean
}

type HTTP = 'POST' | 'DELETE' | 'PATCH' | 'GET'

type Category = 'Headwear' | 'Pets' | 'Hoodies' | 'Shirts' | 'Accessories'

type Item = {
    id: string,
    title: string,
    description: string,
    price: number,
    category: Category,
    colors: {
        [key: string]: string
    }
}

type ToastType = 'info' | 'success' | 'warn' | 'error' | ''

type ToastParams = {
    message: string,
    type: ToastType
}

type CartState = {
    cart: string[]
}
type CartAction =  {
    addToCart: (itemId: string) => void,
    removeFromCart: (itemId: string) => void,
    resetCart: () => void,
    setInitial: (itemIds: string[]) => void
}

type SessionData = {
    user: {
        name: string,
        email: Email,
        id: string,
        itemIds: string[]
    }
}
