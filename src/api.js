export const request = async (searchWord) => {
    try {
        const res = await fetch(`https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=${searchWord}`)

        if (!res.ok) {
            throw new Error(`error: ${response}`)
        }

        return await res.json()
    } catch (e) {
        throw new Error(`error: ${e.message}`)
    }
}