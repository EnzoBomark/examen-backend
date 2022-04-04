const parsable = (data: string) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};

export default parsable;
