const BASE_URL = 'http://127.0.0.1:5000';
const RESOURSE_URL = `${BASE_URL}/shoes`;

const baseREQUEST = async ({urlPath = '', method = 'GET', body = null}) => {
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json"
            },
        };

        if(body) {
            reqParams.body = JSON.stringify(body)
        };

        return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
    } catch (error) {
        console.error("FAIL", error); 
    }
};

export const getAllShoes = async () => {
    const rawRes = await baseREQUEST({method: "GET"});

    return rawRes.json();
};

export const postShoes = (body) => baseREQUEST ({method: 'POST', body});

export const editShoes = (id, body) => baseREQUEST({urlPath:`/${id}`, method: 'PUT', body});

export const deleteShoes = (id) => baseREQUEST({urlPath:`/${id}`, method: 'DELETE'});