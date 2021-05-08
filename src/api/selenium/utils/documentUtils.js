export const ft = (doc) => {
    const defaultLang = doc.language.code.toLowerCase();
    const translationtLang = doc.transLanguage.code.toLowerCase();

    return `${doc.product.compoundName}_${doc.product.brandName}_${doc.country.code}_${doc.labelType.value}_In-Draft_${doc.date}_${defaultLang}_to_${translationtLang}_${doc.version}`;
};


export const bt = (doc) => {
    const defaultLang = doc.language.code.toLowerCase();
    const translationtLang = doc.transLanguage.code.toLowerCase();

    return `${doc.product.compoundName}_${doc.product.brandName}_${doc.country.code}_${doc.labelType.value}_In-Draft_${doc.date}_${translationtLang}_to_${defaultLang}_${doc.version}`;
};


export const main = (doc) => {
    const defaultLang = doc.language.code.toLowerCase();

    return `${doc.product.compoundName}_${doc.product.brandName}_${doc.country.code}_${doc.labelType.value}_In-Draft_${doc.date}_${defaultLang}_${doc.version}`;
};
