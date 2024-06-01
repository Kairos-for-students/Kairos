const API_BASE_URL = 'http://localhost:3001';

export const register = async (formdata) => {
    // console.log("Calling register function with formdata:", formdata);
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            body: formdata,
        });

        const responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message);
        }
}

export const login = async (formdata) => { 
    // console.log(JSON.stringify(formdata))
    const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:  JSON.stringify(formdata),
        }
    ); 



    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody
}