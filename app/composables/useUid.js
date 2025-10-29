export const useUid = () => {
  const route = useRoute();
  const uids = route.params.uid;
  const uid = ref("");

  if (!Array.isArray(uids)) {
    uid.value = uids;
  } else {
    const lastIndex = uids.length - 1;
    uid.value = uids[lastIndex] !== "" ? uids[lastIndex] : uids[lastIndex - 1];
  }

  return { uid };
};
