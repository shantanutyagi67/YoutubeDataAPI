const updateYouTubeVideo = (e = null) => {
  const id = "IOecG3lUv8A";
  const template = "This video has VIEWCOUNT views, LIKECOUNT likes and COMMENTCOUNT comments";
  const description = ". This video shows how many views, likes and comments it has in the title. The title is updated every few minutes and not instantly so in case it does not work, refresh the page or check again after 1-5 minutes.";
  
  // The cron job is created only when the script is run manually
  if (e === null) {
    const triggerName = "updateYouTubeVideo";
    const triggers = ScriptApp.getProjectTriggers().filter((trigger) => {
      return trigger.getHandlerFunction() === triggerName;
    });

    // If time based trigger doesn't exist, create one that runs every 1 minute
    if (triggers.length === 0) {
      ScriptApp.newTrigger(triggerName).timeBased().everyMinutes(10).create();
    }
  }

  // Get the watch statistics of the video
  const { items: [video = {}] = [] } = YouTube.Videos.list(
    "snippet,statistics",
    {
      id
    }
  );

  // Parse the YouTube API response to get views and comment count
  const {
    snippet: { title: oldTitle, categoryId } = {},
    statistics: { viewCount, commentCount, likeCount } = {}
  } = video;

  if (viewCount && commentCount) {
    const newTitle = template
      .replace("VIEWCOUNT", viewCount)
      //.replace("LIKECOUNT", likeCount)
      .replace("COMMENTCOUNT", commentCount)
      .replace("LIKECOUNT", likeCount);

    // If the video title has not changed, skip this step
    if (oldTitle !== newTitle) {
      YouTube.Videos.update(
                 { id: id, snippet: { title: newTitle, categoryId, description: newTitle + description } },
        "snippet"
      );
    }
  }
};
