export const encodeGlobalID = (
  typename: string,
  id: string | number | bigint,
) => `${typename}:${id}`;
export const decodeGlobalID = (globalID: string) => {
  const [typename, id] = globalID.split(":");
  return { typename, id };
};
