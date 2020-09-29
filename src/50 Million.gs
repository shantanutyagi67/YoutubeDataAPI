const updateYouTubeVideo = (e = null) => {
  // Any channel Id
  const id = "MrBeast6000";
  // which subscriber do you want to be
  // For Mr Beast put 50000000
  const subs = 50000000;
  
  // The cron job is created only when the script is run manually
  if (e === null) {
    const triggerName = "updateYouTubeVideo";
    const triggers = ScriptApp.getProjectTriggers().filter((trigger) => {
      return trigger.getHandlerFunction() === triggerName;
    });
    // If time based trigger doesn't exist, create one that runs every 1 minute
    if (triggers.length === 0) {
      ScriptApp.newTrigger(triggerName).timeBased().everyMinutes(1).create();
    }
  }
  
  // Get the subscription statistics of the video
  const { items: [video = {}] = [] } = YouTube.Channels.list(
    "statistics",
    {
      id
    }
  );
      
  // Now we parse video to get desired subscriber count
  const {
    statistics: { subscriberCount:subscriberCount } = {}
  } = video;
  
  if ( subscriberCount == subs-1 ){
    Logger.log("i will subscribe now!");
    YouTube.Subscriptions.insert(
      {
        "snippet": {
          "resourceId": {
            "kind": "youtube#channel",
            "channelId": "MrBeast6000"
          }
        }
      },
      "snippet"
    );
  };
};