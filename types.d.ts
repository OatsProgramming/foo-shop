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

type Item = {
    id: string,
    title: string,
    description: string,
    price: number,
    category: string,
    colors: {
        id: string,
        name: string,
        url: string,
        itemsId: string,
    } 
}