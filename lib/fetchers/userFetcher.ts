import isEmail from "@/lib/isEmail";

export default async function userFetcher(method: HTTP, data: (User & Partial<CartState>) | NewInfo, patchData?: User): Promise<ToastParams> {
    // Check for email validity
    if (!isEmail(data.email)) {
        return {
            message: "Please enter a valid email",
            type: 'warn',
        }
    }

    // For PATCH
    // Check to have at least one parameter to change
    if ((patchData?.email || patchData?.password || patchData?.username) && method === 'PATCH') {
        // Check for email validity if existent
        if (patchData.email && !isEmail(patchData.email)) {
            return {
                message: "Please enter a valid email if updating the current one",
                type: 'warn',
            }
        }

        // Pack up the data all together
        data = {
            ...data,
            newEmail: patchData.email,
            newUsername: patchData.username,
            newPassword: patchData.password,
        }
    }

    try {
        const res = await fetch('api/user', {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            return {
                message: await res.text(),
                type: 'error',
            }
        }

        return {
            message: "Task Complete",
            type: 'success',
        }

    } catch (error) {
        const err = error as Error
        return {
            message: err.message,
            type: 'error'
        }
    }
}