const validateTheParams = (param,minLength,maxLength) => {
    return !param || param.length<minLength || param.length>maxLength;
}

export default validateTheParams