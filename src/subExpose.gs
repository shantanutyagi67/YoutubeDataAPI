const subExpose = (e = null) => {
  // Any channel Id
  const id = "UCCZ_m9lTc2GrSINxnQxHxqA";
  
  
  // Get the subscription statistics of the video
  const { items: [video = {}] = [] } = YouTube.Subscriptions.list(
    "subscriberSnippet",
    {
      mySubscribers:true
    }
  );
  const {
    subscriberSnippet: { title:title } = {}
  } = video;
  Logger.log(title);
};
