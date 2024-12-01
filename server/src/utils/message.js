
export default function formatMessage (username, text){
  return {
    username,
    text,
    time: new Date().toISOString()
};

}