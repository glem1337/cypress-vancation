const getLength = (camper) => {
  const length = parseInt(camper?.specificationDetail?.length, 10);

    if (Number.isNaN(length)) {
      return '';
    }

    return `${length}`;
};

export default getLength;
