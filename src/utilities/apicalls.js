require('dotenv').config();

export const postDreams = async (date, dream) => {
  try {
    const url = process.env.REACT_APP_DATABASE_API_URL + `/api/v1/dreams`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: date,
        dream: dream
      })
    });
    const newDream = await response.json();
    return await newDream;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDreams = async () => {
  try {
    const url = process.env.REACT_APP_DATABASE_API_URL + `/api/v1/dreams`;
    const response = await fetch(url);
    const data = await response.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
};
