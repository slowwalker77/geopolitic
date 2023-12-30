import steem from 'steem';

export function getDiscussionsByBlog(query) {
  return new Promise((resolve, reject) => {
    steem.api.getDiscussionsByBlog(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      resolve(result);
    });
  });
}
