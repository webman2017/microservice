import CryptoJS from 'crypto-js';

function decodeObjectBase64Values(obj: any, dataType?: any) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'string') {
                try {
                    const decodedValue = CryptoJS.enc.Base64.parse(
                        value,
                    ).toString(CryptoJS.enc.Utf8);
                    if (dataType && dataType[key]) {
                        const fieldType = dataType[key].toLowerCase();
                        switch (fieldType) {
                            case 'float':
                                obj[key] = parseFloat(decodedValue);
                                break;
                            default:
                                obj[key] = decodedValue;
                                break;
                        }
                    } else {
                        obj[key] = decodedValue;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

const decodeDataFromBase64 = (response: any): any => {
    const decodedResponse: any = { ...response };

    if (decodedResponse.data && Array.isArray(decodedResponse.data)) {
        decodedResponse.data.forEach((item: any) => {
            decodeObjectBase64Values(item, decodedResponse.dataType);
        });
    } else if (
        decodedResponse.data &&
        typeof decodedResponse.data === 'object'
    ) {
        decodeObjectBase64Values(
            decodedResponse.data,
            decodedResponse.dataType,
        );
    } else if (
        decodedResponse.data &&
        typeof decodedResponse.data === 'string'
    ) {
        try {
            decodedResponse.data = CryptoJS.enc.Base64.parse(
                decodedResponse.data,
            ).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.log(error);
        }
    }

    return decodedResponse;
};

// const encodeDataBodyToBase64 = (data: any): any => {
//     const myData: any = { ...data.data };

//     Object.keys(myData).forEach((key) => {
//         myData[key] = CryptoJS.enc.Base64.stringify(
//             CryptoJS.enc.Utf8.parse(myData[key]),
//         );
//     });

//     return { ...data, data: myData };
//     // return { data: JSON.stringify(myData), dataType: data.dataType };
// };

const encodeDataBodyToBase64 = (data: any): any => {
    const myData = { ...data.data };

    Object.keys(myData).forEach((key) => {
        if (Array.isArray(myData[key])) {
            myData[key] = myData[key].map((obj: any) => {
                const encodedObj: { [key: string]: string } = {};

                Object.keys(obj).forEach((objKey) => {
                    encodedObj[objKey] = CryptoJS.enc.Base64.stringify(
                        CryptoJS.enc.Utf8.parse(obj[objKey]),
                    );
                });

                return encodedObj;
            });
        } else {
            myData[key] = CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(myData[key]),
            );
        }
    });

    return { ...data, data: myData };
};

export { decodeDataFromBase64, encodeDataBodyToBase64 };
